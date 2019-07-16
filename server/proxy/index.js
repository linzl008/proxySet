const fs = require('fs')
var proxy = require('express-http-proxy');
// var proxy = require('http-proxy-middleware');

async function startTask(app){
    // 反向代理（这里把需要进行反代的路径配置到这里即可）
    let opts = {
        preserveHostHdr: true,
        reqAsBuffer: true,
        //转发之前触发该方法
        proxyReqPathResolver: function(req, res) {
            //这个代理会把匹配到的url（下面的 ‘/api’等）去掉，转发过去直接404，这里手动加回来，
            req.url = req.baseUrl+req.url;
            return require('url').parse(req.url).path;
        },
    }

    let proxyList = await readProxyFile();
    for (let i = 0; i < proxyList.length; i++) {
        const proxyElement = proxyList[i];
        if(proxyElement.changeOrigin){
            console.log(`[Proxy]: ${proxyElement.src}  -->  ${proxyElement.target}`);
            app.use(proxyElement.src,proxy(proxyElement.target,opts));
        }
    }

}

/**
 * http-proxy-middleware  因为 bodyParser 导致的代理转发带有 body 数据的 post 请求会失败
 * @param app
 */
async function httpMiddleProxy(app) {
    var restream = function(proxyReq, req, res, options) {
        if (req.body) {
            let bodyData = JSON.stringify(req.body);
            // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
            proxyReq.setHeader('Content-Type','application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            // stream the content
            proxyReq.write(bodyData);
        }
    }
    let proxyList = await readProxyFile();
    for (let i = 0; i < proxyList.length; i++) {
        const proxyElement = proxyList[i];
        if(proxyElement.changeOrigin){
            console.log(`[Proxy]: ${proxyElement.src}  -->  ${proxyElement.target}`);
            app.use(proxy(proxyElement.src,  {
                target: proxyElement.target,
                secure: false,
                changeOrigin: true,
                onProxyReq: restream
            }));
        }
    }
}

/**
 * 读取配置文件
 */
function readProxyFile(){
    return new Promise((resolve,reject)=>{
        fs.open('./proxy.json', 'a+', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('proxy.json 不存在');
                    return [];
                }
            }
            let data = fs.readFileSync(fd,'utf8') || '[]';
            fs.close(fd,(err) => {
                if (err) throw err;
            })
            resolve(JSON.parse(data));
        });
    } )

}

/**
 * 写入配置文件
 */
function writeProxyFile(data){
    try{
        fs.writeFileSync('./proxy.json', JSON.stringify(data));
        return {}
    }catch (e) {
        return {err: e}
    }
}

module.exports = {
    startTask,
    readProxyFile,
    writeProxyFile
}
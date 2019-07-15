const fs = require('fs')
var proxy = require('express-http-proxy');


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
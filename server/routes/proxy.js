var express = require('express');
var router = express.Router();
const Proxy = require('../proxy/index');
const process = require('child_process');
// const Server = require('../bin/www');
/* GET users listing. */
router.get('/getList', async function(req, res, next) {
  let data = await Proxy.readProxyFile();
  res.send({
    code:200,
    message:"获取列表成功",
    data
  });
});

router.post('/updateList', function(req, res, next) {
  let data = Proxy.writeProxyFile(req.body.lists);
  if(data.err){
    res.send({
      code:500,
      message:data.err,
    });
  }else{
    res.send({
      code:200,
      message:"修改列表成功",
    });
  }
});
router.get('/reset', function(req, res, next) {
  /*try{
    process.exec('netstat -ano | findstr "0.0.0.0:3003"', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行的错误: ${error}`);
        throw error;
      }
      let list = stdout.split("TCP");
      // console.log({list});
      let pid = null;
      for (let i = 0; i < list.length; i++) {
        list[i] = list[i].split(/[\s]+/);
        console.log(i,list[i]);
        if(list[i][1].indexOf('3003')>=0 ){
          pid = list[i][4]
        }
      }
      console.log(pid);
      if(pid){
        console.log(__dirname);
        console.log('taskkill /pid ' + pid + ' /T /F  && node ../bin/www ');
        // process.exec('taskkill /pid ' + pid + ' /T /F && set PORT=3003 && node ../bin/www ', (error, stdout, stderr) => {
        process.exec('taskkill /pid ' + pid + ' /T /F', (error, stdout, stderr) => {
          if (error) {
            console.error(`执行的错误: ${error}`);
            throw error;
          }
          res.send({
            code:200,
            message:"重启成功",
          });
        });
      }
    });
  }catch (e) {
    res.send({
      code:500,
      message:"重启失败",
    });
  }*/
  res.send({
    code:200,
    message:"开始重启,请稍后刷新",
  });
  var Server = require('../bin/www')
  Server.stopServer().then(()=>{
    console.log('end start');
    Server.startServer();
  })
});

module.exports = router;

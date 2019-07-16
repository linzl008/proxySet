# Node服务器可配置化代理

1. proxy.json 代理配置文件 

@[TOC](Node代理，http-proxy-middleware，POST请求失败)
# http-proxy-middleware，POST请求失败
因为 bodyParser 导致的代理转发带有 body 数据的 post 请求会失败

```
var express = require('express');
var cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
```

## 解决方案1：
代理中加上把解析后的 body 数据再转回来即可
```
const proxy = require('http-proxy-middleware');
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
var apiProxy = proxy('/api',  {
   target: 'https://xxx.xxx.xxx.xxx',
   secure: false,
   changeOrigin: true,
   onProxyReq: restream
});
app.use(apiProxy);
```
## 解决方案2
使用express-http-proxy插件：

```
const proxy = require('express-http-proxy');
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

  app.use('/api',proxy('https://xxx.xxx.xxx.xxx',opts));
 
 
```


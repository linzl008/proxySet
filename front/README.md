# iot 管理平台

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 设计规则
```
comment.scss  全局样式文件
```
1. el-table样式 统一样式
2. 页面主题内容统一样式设置
3. 弹框 .el-dialog  统一样式限定
4. 标题头 页面名称栏 .headerName  统一样式限定
5. 分页样式 统一样式限定
6. 按键群组 button 统一样式限定
7. 滑动条 .scrollbarStyle 统一样式限定
8. 必须填写 .redRequired

```
$style.scss 固定样式类名的固定
```
```
store通用使用规则
```
1. 取数据，如果为空，则请求接口。
2. 取数据，如果 force: true，则强制刷新缓存。



### 打包命令
- npm run serve
<br>开发环境
<br>对应的环境变量配置文件是 .env.development
<br>对于本地开发环境，可使用 .env.development.local 来覆盖环境变量

- npm run buildtest
<br>测试环境打包
<br>对应的环境变量配置文件是 .env.staging

- npm run build
<br>正式环境打包
<br>对应的环境变量配置文件是 .env.production

### 分支说明
- master
<br> 开发分支也是主分支



    



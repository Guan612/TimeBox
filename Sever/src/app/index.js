const path = require('path');
const Koa = require('koa');
const {koaBody} = require('koa-body');
const cors = require('@koa/cors');
const parameter = require('koa-parameter');
const static = require('koa-static')

const router = require('../router/index');
const errHandler = require('./errHandler');

const app = new Koa();

app.use(parameter(app));
app.use(
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 2000*1024*1024,   // 设置上传文件大小最大限制，默认20M
            uploadDir: path.join(__dirname, '../uploads/img'),  // 设置文件上传目录
            keepExtensions: true    // 保持文件的后缀
        },
        parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    })
)

app.use(static(path.join( __dirname,'../uploads/')));

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

//错误处理中间件
app.on('error', errHandler);
module.exports = app;
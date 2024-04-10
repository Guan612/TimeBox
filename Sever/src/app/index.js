const Koa = require('koa');
const {koaBody} = require('koa-body');
const cors = require('@koa/cors');
const parameter = require('koa-parameter');

const router = require('../router/index');
const errHandler = require('./errHandler');

const app = new Koa();

app.use(parameter(app));
app.use(koaBody());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

//错误处理中间件
app.on('error', errHandler);
module.exports = app;
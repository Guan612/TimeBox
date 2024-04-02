const {APP_PORT} = require('./config/config')
const app = require('./app/index')


app.listen(APP_PORT,()=>{
    console.log(`server is running at http://127.0.0.1:${APP_PORT}`)
})

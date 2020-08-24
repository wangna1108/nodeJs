//创建web服务使用http模块
const {createServer}=require('http')
const serve=createServer()
//监听响应事件
serve.on('request',(req,res)=>{
    res.end('hello world')
})



serve.listen(8088,()=>{
    console.log('服务连接成功')
})
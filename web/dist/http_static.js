//搭建静态服务器
const http=require('http')
const {readFile,readFileSync}=require('fs')
const {join}=require('path')
const url=require('url')
// 定义404页面
const notpage =join(__dirname,'404.html')

//定义网站根目录
const webRoot=join(__dirname)
//创建服务
let serve=http.createServer((req,res)=>{
//当前请求的uri地址
let uri=req.url;
//使用url解析
let {pathname}=url.parse(uri,true)
pathname=pathname==='/'?'/index.html':pathname
//排除一个/favicon.ico
if('favicon.ico'!=pathname){
    //请求文件地址
    let filepath=join(webRoot,pathname)
    //读取文件
    readFile(filepath,(err,data)=>{
        if(err){
            res.end(readFileSync(notpage))
        }else{
            res.end(data)
        }
    })
}
})

//监听端口
serve.listen(8086,()=>{
    console.log('服务连接成功')
})
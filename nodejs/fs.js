const fs= require('fs')
const path=require('path')
//获取到当前文件 之后读出内容
const filepath=path.join(__dirname,'db','user.txt')
console.log(filepath)
// fs.readFile(filepath,'utf8',(err,data)=>{
//     if(err){
//         console.log('文件读取失败')
//     }else{
//         console.log(data)
//     }
// })
// let html='<h1>123</h1>'
// fs.writeFile(filepath,html,err=>{
//     if(err){
//         console.log('文件写入失败')
//     }else{
//         console.log('文件写入成功')
//     }
// })
//判断文件是否存在 existsSync
const index=path.join(__dirname,'db','index.html')
console.log(fs.existsSync(index))
//读取文件的属性信息 fs.stat
// fs.stat(index,(err,stats)=>{
//     console.log(err)
//     // console.log(stats)
//     console.log(stats.size)  //文件大小
//     console.log(stats.isDirectory())  //是否是目录
//     console.log(stats.isFile()) // 是否是文件
//     console.log(stats.mtime)    //文件修改时间
// })
//删除文件 fs.unlink
fs.unlink(index,(err)=>{
    if(!err){ //删除成功检测文件是否存在
        console.log(fs.existsSync(index))
    }
})
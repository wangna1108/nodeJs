//使用promise 封装fs模块的读写
const fs=require('fs')
const path=require('path')
//读文件
// let filepath=path.join(__dirname,'db','user.txt')
// function readFile(filepath){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(filepath,'utf8',(err,data)=>{
//             if(err){
//                 reject(err)
//             }else{
//                 resolve(data)
//             }
//         })
//     })
// }
// readFile(filepath).then(data=>{
//     console.log(data)
// },err=>{
//     console.log(err)
// })
//写入文件
let filepath1=path.join(__dirname,'db','1.txt')
let html="hello world"
function writeFile(filepath1){
    return new Promise((resolve,reject)=>{
        fs.writeFile(filepath1,html,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
writeFile(filepath1).then(data=>{
    console.log('文件写入成功')
},err=>{
    console.log(err)
})

//node 内置模块os  查看cup信息
const os =require('os')
console.log(os.cpus().length)  //查看cup信息
console.log(os.totalmem())  //查看总内存信息
console.log(os.freemem())  //查看剩余内存信息
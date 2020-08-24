//path  可处理文件及目录
const path =require('path')
const pathfile='c:a/b/c/d.html'
//获取文件中最后一级的目录
console.log(path.basename(pathfile))
//获取当前路径/最后一级会被忽略
console.log(path.dirname(pathfile))
//获取扩展名称
console.log(path.extname(pathfile))
//连接
console.log(path.join('/www','a','b'))
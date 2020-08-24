//url  可以解析url地址
const url= require('url')
const href='https://www.baidu.com/a/b/c/d/a.html?id=100&name=yuanyuan#hash'
let path=url.parse(href,true)
console.log(path)
//pathname 获取文件路径  query 可以获取传递的数据
let {pathname,query}=path
console.log(pathname,query.id,query.name)
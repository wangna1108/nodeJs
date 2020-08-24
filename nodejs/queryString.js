//querystring  解析字符串转成对象 和对象转成字符串
const querystring =require('querystring')
console.log(querystring.parse('foo=bar&abc=xyz'))
let obj= { foo: 'bar', abc: 'xyz' }
console.log(querystring.stringify(obj))
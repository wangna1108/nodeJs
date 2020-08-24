# 分页器插件

## 使用

1. 引入相关文件
  + `pagination.css`
  + `pagination.js`

2. 页面结构
  + `<div class="pagi"></div>`

3. 使用
  + `new Pagination('.pagi', {})`
  + 配置项参数内容
    + first 首页文字内容
    + prev 上一页文字内容
    + next 下一页文字内容
    + last 末页文字内容
    + total 数据总数
    + pagesize 一页多少条
    + change 回调函数

/*
  1. 获取范围元素
  2. 制作一些默认值
  3. 通过已知的 total 和 pagesize 计算一下多少页
    + 写一个方法，去进行计算
  4. 渲染上一页下一页之类的按钮
    + 首页 div
    + 上一页 div
    + 列表内容 ul
    + 下一页 div
    + 末页 div
  5. 渲染列表按钮
    + ul 里面应该渲染多少个 li
    + 根据一共有多少页，渲染多少个 li 放在 ul 里面
  6. 绑定事件，各种点击事件
    + 因为我们所有的标签都是动态渲染
    + 事件委托，委托给 this.ele
    + 判断条件
      + 首页 类名是 first && current !== 1
      + 上一页 类名是 prev && current !== 1
      + 下一页 类名是 next && current !== totalpage
      + 末页 类名是 last && current !== totalpage
      + 列表页 不能有 active 类名 && 标签名得是 li
  7. 取消选中能力
    + 需要选中只要绑定再 this。ele 身上就可以了
*/

/*
  列表组按钮渲染（自己定好多少个以上出现 省略号）
    + 小于等于 9 个的时候，有多少渲染多少
    + 大于 9 个的时候，出现省略号(假设一个 20 页)
      + 当前页是第一页 1 2 3 4 5 ... 19 20
      + 当前页是第五页 1 2 3 4 5 6 7 ... 19 20
      + 当前页是 第六页 ~ 第 14 页  1 2 ... 8 9 10 11 12 ... 19 20
      + 当前是第 16 页 1 2 ... 14 15 16 17 18 19 20
      + 当前是 17 页以后 1 2 ... 16 17 18 19 20
*/

class Pagination {
  constructor (id, options) {
    // 1. 获取范围元素
    this.ele = document.querySelector(id)

    // 2. 设置默认值
    this.default = {
      textInfo: {
        first: options.first || 'first',
        prev: options.prev || 'prev',
        list: 'list',
        next: options.next || 'next',
        last: options.last || 'last'
      },
      pageInfo: {
        pagesize: options.pagesize || 10,
        total: options.total || 90,
        totalpage: 9,
        current: 1,
      },
      change: options.change || function () {}
    }

    // 因为 ul 是动态创建的，我们需要跨函数使用
    // 提前准备一个变量用于保存 ul 标签
    this.list = null

    this.init()
  }

  init () {
    this.calcTotalpage()
    this.setButtons()
    this.setListBtn()
    this.bindChange()
    this.disSelect()
  }

  // 3. 计算 totalpage
  calcTotalpage () {
    let { pagesize, total } = this.default.pageInfo
    let res = Math.ceil(total / pagesize)
    this.default.pageInfo.totalpage = res
  }

  // 4. 渲染上一页下一页之类的按钮
  setButtons () {
    let { textInfo } = this.default
    let frg = document.createDocumentFragment()
    for (let key in textInfo) {
      if (key === 'list') { // 渲染 ul
        let ul = document.createElement('ul')
        ul.className = key
        this.list = ul
        frg.appendChild(ul)
      } else { // 渲染 div
        let div = document.createElement('div')
        div.innerHTML = textInfo[key]
        div.className = key
        frg.appendChild(div)
      }
    }
    this.ele.appendChild(frg)
  }

  // 5. 渲染列表按钮
  setListBtn () {
    let { totalpage, current } = this.default.pageInfo
    let frg = document.createDocumentFragment()

    // 按照 totalpage 的数量来渲染
    if (totalpage <= 9) {
      // 有多少渲染多少
      for (let i = 1; i <= totalpage; i++) {
        let li = document.createElement('li')
        li.innerHTML = i
        if (i === current) li.className = 'active'
        frg.appendChild(li)
      }
    } else {
      // 大于 9 个出现省略号形式的渲染
      // console.log('我要出现省略号形式的渲染')
      // 分成五种情况来渲染
      // 如果当前页 < 5
      if (current < 5) {
        // 把 列表组渲染成  1 2 3 4 5 ... 19 20
        for (let i = 1; i <= 5; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          if (i === current) li.className = 'active'
          frg.appendChild(li)
        }

        let span = document.createElement('span')
        span.innerHTML = '···'
        frg.appendChild(span)

        // 渲染后两个
        for (let i = totalpage - 1; i <= totalpage; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          frg.appendChild(li)
        }
      }

      // 如果当前页 === 5
      if (current === 5) {
        // 列表组渲染成 1 2 3 4 5 6 7 ··· 19 20
        for (let i = 1; i <= 7; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          if (i === current) li.className = 'active'
          frg.appendChild(li)
        }

        let span = document.createElement('span')
        span.innerHTML = '···'
        frg.appendChild(span)

        for (let i = totalpage - 1; i <= totalpage; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          frg.appendChild(li)
        }
      }

      // 如果当前页 > 正数第五页 并且 当前页 < 倒数第五页
      // totalpage 最后一页
      // totalpage - 1 倒数第二页
      // totalpage - 2 倒数第三页
      // totalpage - 3 倒数第四页
      // totalpage - 4 倒数第五页
      if (current > 5 && current < totalpage - 4) {
        // 列表组渲染成 前面两个 ... 中间五个 ... 后面两个
        for (let i = 1; i <= 2; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          frg.appendChild(li)
        }

        let span = document.createElement('span')
        span.innerHTML = '···'
        frg.appendChild(span)

        // 渲染当前页的 前两个 到 当前页的后两个
        for (let i = current - 2; i <= current + 2; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          if (i === current) li.className = 'active'
          frg.appendChild(li)
        }

        // 要出现第二个 span
        let span2 = document.createElement('span')
        span2.innerHTML = '···'
        frg.appendChild(span2)

        for (let i = totalpage - 1; i <= totalpage; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          frg.appendChild(li)
        }
      }

      // 如果当前页 === 倒数第五页的时候
      if (current === totalpage - 4) {
        // 列表组渲染成 1 2 ... 后面七个
        for (let i = 1; i <= 2; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          frg.appendChild(li)
        }

        let span = document.createElement('span')
        span.innerHTML = '···'
        frg.appendChild(span)

        for (let i = totalpage - 6; i <= totalpage; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          if (i === current) li.className = 'active'
          frg.appendChild(li)
        }
      }

      // 如果当前页 > 倒数第四页
      if (current > totalpage - 4) {
        // 列表组渲染成 1 2 ... 倒数五页
        for (let i = 1; i <= 2; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          frg.appendChild(li)
        }

        let span = document.createElement('span')
        span.innerHTML = '···'
        frg.appendChild(span)

        for (let i = totalpage - 4; i <= totalpage; i++) {
          let li = document.createElement('li')
          li.innerHTML = i
          if (i === current) li.className = 'active'
          frg.appendChild(li)
        }
      }
    }

    this.list.innerHTML = ''
    this.list.appendChild(frg)
    this.default.change(current)
  }

  // 6. 绑定事件
  bindChange () {
    this.ele.addEventListener('click', e => {
      e = e || window.event
      let target = e.target || e.srcElement
      let { current, totalpage } = this.default.pageInfo
      if (target.className === 'first' && current !== 1) {
        this.default.pageInfo.current = 1
        this.setListBtn()
      }
      if (target.className === 'prev' && current !== 1) {
        this.default.pageInfo.current--
        this.setListBtn()
      }
      if (target.className === 'next' && current !== totalpage) {
        this.default.pageInfo.current++
        this.setListBtn()
      }
      if (target.className === 'last' && current !== totalpage) {
        this.default.pageInfo.current = totalpage
        this.setListBtn()
      }
      if (target.nodeName === 'LI' && target.className !== 'active') {
        this.default.pageInfo.current = target.innerHTML - 0
        this.setListBtn()
      }
    })
  }

  // 7. 阻止选中
  disSelect () {
    this.ele.addEventListener('selectstart', e => {
      e = e || window.event
      e.preventDefault()
    })
  }
}

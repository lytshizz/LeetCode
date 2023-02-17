// 32 实现模板字符串解析功能
// 题目描述:
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
};
let a = render(template, data); // 我是姓名，年龄18，性别undefined
console.log(a);
// 实现代码如下:
function render(template, data) {
  let computed = template.replace(/\{\{(\w+)\}\}/g, function (match, key) {
    return data[key];
  });
  return computed;
}

// 作者：前端鲨鱼哥
// 链接：https://juejin.cn/post/6968713283884974088
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 将 object 对象中的 key 的书写形式 下划线 改为 驼峰式

// 通过正则匹配方式，直接转换
function toCaseByExp(obj) {
  // 正则匹配:之前的_，并替换其后第一位为大写
  const reg = /_(\w)(.*?:)/g; // 当前正则可以精确匹配到key
  function toUpperCase(str) {
    return str.replace(reg, (match, p1, p2) => {
      // console.log(match, '匹配子串', p1);
      return p1 && p1.toUpperCase() + p2;
    });
  }

  // 方式二正则，统统匹配，不精确
  // const reg2 = /_(\w)/g; // 当前正则会将value中的下划线也匹配到熬
  // function toUpperCase2(str) {
  //   return str.replace(reg2, (match, p1) => {
  //     console.log(match, '匹配子串2', p1);
  //     return p1 && p1.toUpperCase();
  //   });
  // }

  const newObj = JSON.parse(toUpperCase(JSON.stringify(obj)));
  console.log(newObj);
  return newObj;
}

// 常规解法，将对象的key取出来，通过split分割转换后，加入对象，删除原有key，或定义一个新对象直接新增
function toCase(obj) {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyArr = key.split('_');
      // 如果有深层嵌套对象的，需要递归调用
      let newKey = keyArr.length > 1 ? keyArr[0] + keyArr[1][0].toUpperCase() + keyArr[1].substr(1) : key;
      newObj[newKey] = isObject(obj[key]) ? toCase(obj[key]) : obj[key];
    }
  }

  console.log(newObj);
  return newObj;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

const obj = {
  user_id: 2342411,
  user_name: '网_红',
  age: 23,
  user_area: { addrees_area: '陕西省', address_strict: '啥街道', dd_aa: 'djj_dff_ggg' }
};
// toCase(obj);
toCaseByExp(obj);

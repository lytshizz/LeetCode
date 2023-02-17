/**
 * 数组去重
 *
 * @example
 * [1,'1',1]                            -> [1,'1']
 * [{a: 1}, {b: 1}, {a: 1}]             -> [{a: 1}, {b: 1}]
 * [{a: 1, b: 2}, {b: 1}, {b: 2, a: 1}] -> [{a: 1, b: 2}, {b: 1}]
 * [[1, {a: 1}], [2], [3], [1, {a: 1}]] -> [[1, {a: 1}], [2], [3]]
 */
// 多维数组去重
function unique(arr) {
  // 因对象特别，分出数组中的对象单独去重
  let objArr = arr.filter((item) => {
    return Object.prototype.toString.call(item) === '[object Object]';
  });
  let otherTypeArr = arr.filter((item) => {
    return Object.prototype.toString.call(item) !== '[object Object]';
  });
  // 数组及简单类型处理
  let obj = {};
  otherTypeArr = otherTypeArr.filter((item, index) => {
    let newItem = item + JSON.stringify(item);
    return obj.hasOwnProperty(newItem) ? false : (obj[newItem] = true);
  });
  // 对象类型处理
  if (objArr.length !== 0) {
    // 将数组对象转成数组字符串
    var objToStrArr = [];
    var keyArr = [];
    var key = '';
    var currentObj = {};
    var currentStr = '';
    objArr.forEach((item) => {
      // 对象属性排序
      keyArr = [];
      for (key in item) {
        keyArr.push(key);
      }
      keyArr.sort(); // 降序
      currentObj = {};
      keyArr.forEach((ele) => {
        currentObj[ele] = item[ele];
      });
      currentStr = JSON.stringify(currentObj);
      // 去除空格及\t空白字符
      currentStr = currentStr.replace(/(\s|[\\t])/g, '');
      objToStrArr.push(currentStr);
    });
    objToStrArr.sort();
    var tmepArr = [];
    // 数组去重
    objToStrArr.forEach((item, i) => {
      if (item !== tmepArr[tmepArr.length - 1]) {
        tmepArr.push(item);
      }
    });
    var resultArr = [];
    // 新数组字符串转成数组对象
    tmepArr.forEach((item) => {
      resultArr.push(JSON.parse(item));
    });
    objArr = resultArr;
  }
  return [...otherTypeArr, ...objArr];
}

console.log(unique([1, '1', 1]));
console.log(unique([{ a: 1 }, { b: 1 }, { a: 1 }]));
console.log(unique([{ a: 1, b: 2 }, { b: 1 }, { b: 2, a: 1 }]));
console.log(unique([[1, { a: 1 }], [2], [3], [1, { a: 1 }]]));

//  只适用于简单数组，不含嵌套对象的情况
function arrUnique(arr) {
  const set = new Set(arr);
  const newArr = Array.from(set);
  console.log(newArr);
}

// 需要兼容复杂嵌套情况....未完待续
function arrDeWeightDeep(arr) {
  // 通过set存储已有值
  arr.forEach((item) => {
    if (item instanceof Object) {
    }
  });
  const set = new Set(arr);
  const newArr = Array.from(set);
  console.log(newArr);
}

// arrDeWeight([1, '1', 1]);
// arrDeWeight([{ a: 1 }, { b: 1 }, { a: 1 }]);
// arrDeWeight([{ a: 1, b: 2 }, { b: 1 }, { b: 2, a: 1 }]);
// arrDeWeight([[1, { a: 1 }], [2], [3], [1, { a: 1 }]]);

/* 
题目一：合并表记录，集合框架，map做二维数组
概要：数据表记录包含表索引和数值（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照key值升序进行输出。

输入要求：先输入键值对的个数，然后输入成对的index和value值，以空格隔开

因为输入涉及的index和value，所以必须用到map存储起来

输出要求：输出合并后的键值对（多行）

输入示例：
4
0 1
0 2
1 2
3 4
输出示例：
0 3
1 2
3 4 
*/

function mergeRecord(count, arr) {
  const map = new Map();
  map.set(2, 6);
  map.set(3, 5);
  for (let i = 0; i < count; i++) {
    let item = arr[i];
    if (!map.has(item[0])) {
      map.set(item[0], item[1]);
    } else {
      map.set(item[0], map.get(item[0]) + item[1]);
    }
  }
  console.log(map, '===map');

  // map.forEach((value, key) => {
  //   console.log(key, value);
  // });

  // 按照key值升序输出
  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }

  // 如果key在输入过程中非升序需要先进行排序后再输出
  const tmpArr = [...map.keys()];

  // 此排序过程可以进行优化，目前复杂度O(n2)
  tmpArr.sort((a1, a2) => a1 - a2);
  console.log(tmpArr, '===tmpArr');

  // 输出排序后结果
  for (let key of tmpArr) {
    console.log(key, map.get(key), '排序后输出');
  }
}

mergeRecord(4, [
  [0, 1],
  [0, 2],
  [1, 2],
  [3, 4]
]);

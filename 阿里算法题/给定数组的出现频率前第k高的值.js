// 347. 前 K 个高频元素
// https://leetcode.cn/problems/top-k-frequent-elements/
// 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

// 最小堆方式，复杂度 O()
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 交互两个值
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  // 根据当前节点索引，获取父节点索引
  getParentIndex(i) {
    return (i - 1) >> 1; // 相当于Math.floor((i - 1) / 2)
  }
  // 获取左子树索引
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  // 获取右子树索引
  getRightIndex(i) {
    return i * 2 + 2;
  }
  // 向上转移，最小堆时，如果父节点的值大于当前节点时，需要上移交互
  // 此处如果是map的话，需要比较的是value值
  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex]?.value > this.heap[index]?.value) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex); // 交互后递归比对，维护好最终的最小堆形态
    }
  }
  // 用于出堆情况，向下转移。进行比对当前节点与左右子树的大小并交换，直至最后节点找到合适位置
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex]?.value < this.heap[index]?.value) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex]?.value < this.heap[index]?.value) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // 插入节点，需要先插入到最后，然后再向下比对替换
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 弹出堆顶，即删除堆顶，然后将最后一个赋值给堆顶，再向下比较
  pop() {
    // 如果当前长度为1，则赋空数组
    if (this.size() === 1) return this.heap.pop();
    this.heap[0] = this.heap.pop(); // 将最后一位pop并且赋值给堆顶
    this.shiftDown(0);
  }
  // 探出-获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆当前长度
  size() {
    return this.heap.length;
  }
}

var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });

  // 实际存储数组对象
  const h = new MinHeap();
  // for (let item of map) {
  //   // 判断当前堆是否满堆，满堆先比较再pop，后insert , 如果当前出现频次大于最小堆顶，则替换
  //   // 堆应该存储频次，最后返回频次对应的val。
  //   if (h.size() >= k && item[1] > h.peek().value) {
  //     h.pop();
  //     h.insert({ key: item[0], value: item[1] });
  //   } else if (h.size() < k) {
  //     h.insert({ key: item[0], value: item[1] });
  //   }
  // }

  // 优化此处逻辑
  map.forEach((value, key) => {
    // 如果已经达到k，pop一位
    if (h.size() === k && value > h.peek().value) {
      h.pop();
      h.insert({ value, key });
    } else if (h.size() < k) {
      h.insert({ value, key });
    }
  });
  return h.heap.map((a) => a.key);
};

console.log(topKFrequent([3, 0, 1, 0], 1));

// 实现简化
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent1 = function (nums, k) {
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  const list = Array.from(map).sort((a, b) => b[1] - a[1]);
  return list.slice(0, k).map((n) => n[0]);
};

// 普通实现 输出前k元素出现的值
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent2 = function (nums, k) {
  // 最小堆解法
  const obj = {};
  const tmpObj = {}; // 存在value的值，对应包含的num数组
  for (let item of nums) {
    obj[item] = obj[item] ? obj[item] + 1 : 1;
  }

  for (let key in obj) {
    if (!tmpObj[obj[key]]) {
      tmpObj[obj[key]] = [key];
    } else {
      tmpObj[obj[key]].push(key);
    }
  }

  // 对出现次数进行排序，复杂度有所减少

  // 对value进行排序，从大到小排序
  let valueArr = Object.keys(tmpObj).sort((a, b) => b - a);

  // 两者取最小值
  const newNums = [];
  let minLen = Math.min(valueArr.length, k);
  for (let j = 0; j < minLen; j++) {
    //  取出需要展示的值即可
    let len = newNums.length + valueArr[j].length;
    if (len < k) {
      newNums.push(...tmpObj[valueArr[j]]);
    } else if (len === k) {
      newNums.push(...tmpObj[valueArr[j]]);
      break;
    } else {
      // 截取返回
      newNums.push(...tmpObj[valueArr[j]].splice(0, len - k - 1));
    }
  }

  return newNums;
};

// 优化方式，最小堆解法
// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
// console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2));
// console.log(topKFrequent1([4, 1, -1, 2, -1, 2, 3], 2));
// console.log(topKFrequent1([3, 0, 1, 0], 1));
// console.log(topKFrequent([-1, -1], 1));

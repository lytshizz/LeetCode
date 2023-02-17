// 最大堆最小堆，数组表示，含图解 https://www.51cto.com/article/717968.html
// 堆其实是一个完全二叉树，叶子节点层级差最大为1，且从左到右按序添加
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
  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex); // 交互后递归比对，维护好最终的最小堆形态
    }
  }
  // 用于出堆情况，向下转移。进行比对当前节点与左右子树的大小并交换，直至最后节点找到合适位置
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
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

const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(6);
h.insert(5);
h.insert(1);

console.log(h);
h.pop();
console.log(h.peek());
console.log(h.size());
console.log(h);

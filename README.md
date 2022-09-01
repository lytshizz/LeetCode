# 算法题解合集

[TOC]

## 二叉树类

### 1. [二叉树的最大深度 - maximum-depth-of-binary-tree](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

```js
		/**
     * 给定一个二叉树，找出其最大深度。、
     * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
     * 说明: 叶子节点是指没有子节点的节点。

     * 示例：
     * 给定二叉树 [3,9,20,null,null,15,7]，回它的最大深度 3 。
     */

    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */

    /**
     * 方法一：动态规划思路
     * 执行用时：68 ms, 在所有 JavaScript 提交中击败了61.36%的用户
     * 内存消耗：43.6 MB, 在所有 JavaScript 提交中击败了76.52%的用户
     * @param {TreeNode} root
     * @return {number}
     */
    const maxDepth = function (root) {
      // 求二叉树最大深度，即需要得知左子树和右子树的最大深度，当前深度+1即可？ 后序遍历
      if (root === null) {
        return 0;
      }
      let maxLeft = maxDepth(root.left);
      let maxRight = maxDepth(root.right);

      return Math.max(maxLeft, maxRight) + 1;
    };

    console.log(maxDepth([3, 9, 20, null, null, 15, 7]));

    function TreeNode(val, left, right) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
    }

    /**
     * 方法二：遍历思路-回溯算法思路
     * 执行用时：68 ms, 在所有 JavaScript 提交中击败了61.36%的用户
     * 内存消耗：43.9 MB, 在所有 JavaScript 提交中击败了32.31%的用户
     * @param {TreeNode} root
     * @return {number}
     */
    let res = 0;
    let depth = 0;
    const maxDepthBack1 = function (root) {
      res = 0;
      depth = 0;

      traverse(root);
      return res;
    };

    const traverse = function (root) {
      if (root === null) {
        return;
      }

      depth++;
      // 如果到了叶子节点则更新最大深度
      if (root.left === null && root.right === null) {
        res = Math.max(res, depth);
      }
      traverse(root.left);
      traverse(root.right);
      depth--;
    };

    /**
     * 方法三：遍历思路-回溯算法思路
     * 执行用时：64 ms, 在所有 JavaScript 提交中击败了80.08%的用户
     * 内存消耗：44.2 MB, 在所有 JavaScript 提交中击败了10.96%的用户
     * @param {TreeNode} root
     * @return {number}
     */
    const maxDepthBack2 = function (root) {
      let res = 0;
      let depth = 0;

      const traverse = function (root) {
        if (root === null) {
          return;
        }

        depth++;
        // 如果到了叶子节点则更新最大深度
        if (root.left === null && root.right === null) {
          res = Math.max(res, depth);
        }
        traverse(root.left);
        traverse(root.right);
        depth--;
      };

      traverse(root);
      return res;
    };
```

类似问题：[https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/](https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/)



### 2. [二叉树的前序遍历 - binary-tree-preorder-traversal](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

```js
		/**
     * 二叉树的前序遍历
     * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

     * 示例1：
     * 输入：root = [1,null,2,3]
     * 输出：[1,2,3]

     * 示例2：
     * 输入：root = []
     * 输出：[]

     * 示例3:
     * 输入：root = [1]
     * 输出：[1]

     * 示例4：
     * 输入：root = [1,2]
     * 输出：[1,2]

     * 示例5：
     * 输入：root = [1,null,2]
     * 输出：[1,2]
     */

    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */

    /**
     * 方法一：回溯算法思路  ***** 更优解
     * 执行用时：48 ms, 在所有 JavaScript 提交中击败了99.01%的用户
     * 内存消耗：40.9 MB, 在所有 JavaScript 提交中击败了92.72%的用户
     * @param {TreeNode} root
     * @return {number[]}
     */
    var preorderTraversal = function (root) {
      const arr = [];
      // 递归前序遍历

      const traverse = function (root) {
        if (root === null) return;

        arr.push(root.val);
        traverse(root.left);
        traverse(root.right);
      };

      traverse(root);

      return arr;
    };

    /**
     * 方法二：动态规划思路 - 前序遍历
     * 执行用时：52 ms, 在所有 JavaScript 提交中击败了95.92%的用户
     * 内存消耗：41.7 MB, 在所有 JavaScript 提交中击败了5.07%的用户
     * @param {TreeNode} root
     * @return {number[]}
     */
    var preorderTraversal = function (root) {
      // 递归前序遍历
      const res = [];
      if (root === null) return [];

      res.push(root.val);
      res.push(...preorderTraversal(root.left));
      res.push(...preorderTraversal(root.right));

      return res;
    };
```

### [3. 二叉树的直径 - diameter-of-binary-tree ](https://leetcode.cn/problems/diameter-of-binary-tree/)

```js
    /**
     * 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

     * 示例 :
     * 给定二叉树

           1
          / \
         2   3
        / \     
       4   5    
     * 返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
     *  注意：两结点之间的路径长度是以它们之间边的数目表示。
     */

    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */

    /**
     * 方案一：递归方法，后序遍历。每次递归当前根节点的左子树和右子树的最大深度
     * 遇到子树问题，首先想到的是给函数设置返回值，然后在后序位置做文章。
     * @param {TreeNode} root
     * @return {number}
     * 执行用时：60 ms, 在所有 JavaScript 提交中击败了94.50%的用户
     * 内存消耗：44.4 MB, 在所有 JavaScript 提交中击败了50.71%的用户
     */
    var diameterOfBinaryTree = function (root) {
      let res = 0;

      var traverse = function (root) {
        if (root === null) return 0;

        let leftMaxLen = traverse(root.left);
        let rightMaxLen = traverse(root.right);
        // 后续遍历计算最大直径，即离开当前节点时再计算最大深度
        res = Math.max(res, leftMaxLen + rightMaxLen);
        return 1 + Math.max(leftMaxLen, rightMaxLen); // 返回当前节点最长路径
      };

      traverse(root);
      return res;
    };
```

### 4. [二叉树展开为链表 - flatten-binary-tree-to-linked-list](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

```js
    /**
     * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
     * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 
     * 展开后的单链表应该与二叉树 先序遍历 顺序相同。

     * 示例 1：
     * 输入：root = [1,2,5,3,4,null,6]
     * 输出：[1,null,2,null,3,null,4,null,5,null,6]

     * 示例 2：
     * 输入：root = []
     * 输出：[]
    
     * 示例 3：
     * 输入：root = [0]
     * 输出：[0]
     */

    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */

    /**
     * 思路一：递归思路，将左子树及右子树都改为链表形式，最后将右子树拼到左子树之后，用左子树覆盖到root右侧
     * @param {TreeNode} root
     * @return {void} Do not return anything, modify root in-place instead.
     * 执行用时：52 ms, 在所有 JavaScript 提交中击败了99.79%的用户
     * 内存消耗：42.9 MB, 在所有 JavaScript 提交中击败了93.51%的用户
     */
    var flatten = function (root) {
      if (root === null) return;

      flatten(root.left);
      flatten(root.right);

      const left = root.left;
      const right = root.right;

      // 将右子树拼到左子树之后，如果左子树是null,则无需处理
      if (left !== null) {
        let endLeftNode = left;
        while (endLeftNode.right !== null) {
          endLeftNode = endLeftNode.right;
        }
        endLeftNode.right = right;

        // 将整个左子树加到root右侧
        root.left = null;
        root.right = left;
      } else {
        root.left = null;
      }
    };

    /**
     * 思路二：递归思路，将左子树及右子树都改为链表形式，最后将左子树拼到根节点之后，再找到叶子右节点，将右子树拼接其后
     * @param {TreeNode} root
     * @return {void} Do not return anything, modify root in-place instead.
     * 性能略低于上面
     */
    var flatten2 = function (root) {
      if (root === null) return;

      flatten(root.left);
      flatten(root.right);

      const left = root.left;
      const right = root.right;

      // 将整个左子树加到root右侧
      root.left = null;
      root.right = left;

      // 将右子树拼接到root最后右节点上
      let endRight = root;
      while (endRight.right !== null) {
        endRight = endRight.right;
      }
      endRight.right = right;
    };
```

### 5. [填充每个节点的下一个右侧节点指针 - populating-next-right-pointers-in-each-node](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)

```js
    /**
     * 填充每个节点的下一个右侧节点指针
     * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
     * struct Node {
     *   int val;
     *   Node *left;
     *   Node *right;
     *   Node *next;
     * }
     * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
     * 初始状态下，所有 next 指针都被设置为 NULL。

     * 示例 1：
     * 输入：root = [1,2,3,4,5,6,7]
     * 输出：[1,#,2,3,#,4,5,6,7,#]
     * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。

     * 示例 2:
     * 输入：root = []
     * 输出：[]
     */

    /**
     * // Definition for a Node.
     * function Node(val, left, right, next) {
     *    this.val = val === undefined ? null : val;
     *    this.left = left === undefined ? null : left;
     *    this.right = right === undefined ? null : right;
     *    this.next = next === undefined ? null : next;
     * };
     */

    /**
     * 方案一：通过遍历思路，当前节点的右节点的next指向当前节点next的兄弟节点的左节点即可 , 最优方案
     * @param {Node} root
     * @return {Node}
     * 执行用时：64 ms, 在所有 JavaScript 提交中击败了98.86%的用户
     * 内存消耗：47 MB, 在所有 JavaScript 提交中击败了88.25%的用户
     */
    var connect = function (root) {
      if (root === null || root.left === null) return root;

      function traverse(root) {
        // 如果当前节点为空或为叶子节点，则直接返回
        if (root === null || root.left === null) return;

        // left节点不空，则完美二叉树的right节点也一定存在。 遍历后更改next指向；此处一定要前序遍历，要先赋值next节点。
        root.left.next = root.right;
        if (root.next !== null) {
          root.right.next = root.next.left;
        }

        // 遍历左右子节点
        traverse(root.left);
        traverse(root.right);
      }

      traverse(root);
      return root;
    };

    /**
     * 方案二：通过递归思路，当前节点的右节点的next指向当前节点next的兄弟节点的左节点即可
     * @param {Node} root
     * @return {Node}
     * 执行用时：112 ms, 在所有 JavaScript 提交中击败了5.46%的用户
     * 内存消耗：47.6 MB, 在所有 JavaScript 提交中击败了28.42%的用户
     */
    var connect1 = function (root) {
      if (root == null) return null;

      function traverse(leftNode, rightNode) {
        // 如果当前节点为叶子节点
        if (leftNode === null || rightNode === null) return;

        // 遍历左右子节点
        leftNode.next = rightNode;
        traverse(leftNode.left, leftNode.right);
        traverse(rightNode.left, rightNode.right);

        // 拼接交界处
        traverse(leftNode.right, rightNode.left);
      }

      traverse(root.left, root.right);
      return root;
    };
```

### 6. [翻转二叉树 - invert-binary-tree](https://leetcode.cn/problems/invert-binary-tree/)

```js
    /**
     * 翻转二叉树
     * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

     * 示例 1：
     * 输入：root = [4,2,7,1,3,6,9]
     * 输出：[4,7,2,9,6,3,1]

     * 示例 2：
     * 输入：root = [2,1,3]
     * 输出：[2,3,1]

     * 示例 3：
     * 输入：root = []
     * 输出：[]
     */

    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */

    /**
     * 翻转二叉树
     * 思路一：递归思路，将左右子树互换位置，前序遍历
     * @param {TreeNode} root
     * @return {TreeNode}
     * https://leetcode.cn/problems/invert-binary-tree/
     * 执行用时：76 ms, 在所有 JavaScript 提交中击败了5.45%的用户
     * 内存消耗：41.5 MB, 在所有 JavaScript 提交中击败了33.66%的用户
     * https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/submissions/
     * 执行用时：56 ms, 在所有 JavaScript 提交中击败了88.18%的用户
     * 内存消耗：41.3 MB, 在所有 JavaScript 提交中击败了57.62%的用户
     */
    var invertTree = function (root) {
      if (root === null) return root;

      function traverse(root) {
        if (root === null) return;

        // 假设此二叉树是完美二叉树
        const leftNode = root.left;
        const rightNode = root.right;
        root.left = null;
        root.right = null;
        if (leftNode !== null) {
          root.right = leftNode;
        }
        if (rightNode !== null) {
          root.left = rightNode;
        }

        traverse(root.left);
        traverse(root.right);
      }

      traverse(root);
      return root;
    };
```

类似问题：[二叉树的镜像](https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/)

### 7. [从前序与中序遍历序列构造二叉树 - construct-binary-tree-from-preorder-and-inorder-traversal ](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```js
// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

      // 示例 1:
      // 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
      // 输出: [3,9,20,null,null,15,7]
      // 示例 2:
      // 输入: preorder = [-1], inorder = [-1]
      // 输出: [-1]

      /**
       * Definition for a binary tree node.
       * function TreeNode(val, left, right) {
       *     this.val = (val===undefined ? 0 : val)
       *     this.left = (left===undefined ? null : left)
       *     this.right = (right===undefined ? null : right)
       * }
       */

      /**
       * 方法一：更优解
       * @param {number[]} preorder
       * @param {number[]} inorder
       * @return {TreeNode}
       *
       * 执行用时： 76 ms , 在所有 JavaScript 提交中击败了 90.50% 的用户
       * 内存消耗： 43.4 MB , 在所有 JavaScript 提交中击败了 95.27% 的用户
       */

      function TreeNode(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
      }

      var buildTree1 = function (preorder, inorder) {
        // 根据前序得到根节点再根据中序划分左右。若无左右子树用null填充

        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);

        function build(preorder, preStart, perEnd, inorder, inStart, inEnd) {
          if (preStart > perEnd) return null;

          // 获取根节点
          const rootVal = preorder[preStart];

          // 找到中序遍历中根节点位置，划分左右子树
          let index = 0;
          for (let i = inStart; i <= inEnd; i++) {
            const ele = inorder[i];
            if (rootVal === ele) {
              index = i;
              break;
            }
          }

          const root = new TreeNode(rootVal);

          // 构造左右子树
          let leftSize = index - inStart;
          root.left = build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
          root.right = build(preorder, preStart + leftSize + 1, perEnd, inorder, index + 1, inEnd);

          return root;
        }
      };

      /**
       * 方法二，循环优化，用时无优化，可忽略，方法一更优
       * @param {number[]} preorder
       * @param {number[]} inorder
       * @return {TreeNode}
       *
       * 执行用时： 76 ms , 在所有 JavaScript 提交中击败了 90.50% 的用户
       * 内存消耗： 44 MB , 在所有 JavaScript 提交中击败了 81.14%
       */
      const valToIndex = {};
      var buildTree = function (preorder, inorder) {
        // 根据前序得到根节点再根据中序划分左右。若无左右子树用null填充
        for (let i = 0; i < inorder.length; i++) {
          valToIndex[inorder[i]] = i;
        }

        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);

        function build(preorder, preStart, perEnd, inorder, inStart, inEnd) {
          if (preStart > perEnd) return null;

          // 获取根节点
          const rootVal = preorder[preStart];

          // 找到中序遍历中根节点位置，划分左右子树
          // 构造左右子树
          const root = new TreeNode(rootVal);
          const index = valToIndex[rootVal];
          const leftSize = index - inStart;

          root.left = build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
          root.right = build(preorder, preStart + leftSize + 1, perEnd, inorder, index + 1, inEnd);

          return root;
        }
      };
      let preorder = [1, 2, 3],
        inorder = [3, 2, 1];
      console.log(buildTree(preorder, inorder));
```



## 相关文档

https://labuladong.github.io/algo/2/

https://leetcode.cn/



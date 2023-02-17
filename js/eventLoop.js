/* node v11.0以前 先执行完所有的宏任务队列，再执行微任务队列。
如下输出：
start
end
children1
Promise1
children2
children3
setTimeout1
setTimeout2
children2-1
children3-1
Promise2
*/

/* node v11.0及以后 执行一个宏任务，就会执行微任务队列中所有微任务。 就与浏览器保持一致了。
输出结果如下：
start
end
children1
Promise1
children2
children2-1
children3
children3-1
setTimeout1
Promise2
setTimeout2
*/

function test() {
  console.log('start');
  setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
      console.log('children2-1');
    });
  }, 0);
  setTimeout(() => {
    console.log('children3');
    Promise.resolve().then(() => {
      console.log('children3-1');
    });
  }, 0);
  Promise.resolve().then(() => {
    console.log('children1');
  });
  console.log('end');
}

test();

Promise.resolve().then(() => {
  console.log('Promise1');
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);
});
setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => {
    console.log('Promise2');
  });
}, 0);

// 笔试题
setTimeout(() => {
  console.log(1);
}, 0);

new Promise(function (resolve) {
  console.log(2);
  for (let i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }

  console.log(3);
}).then((resolve) => {
  console.log(4);
});

console.log(5);

// 输出结果 2,3,5,4,1

// 笔试闭包
var name = 'zhangsan';
(function fn() {
  if (typeof name === 'undefined') {
    console.log('goodBye', name);
    let name = 'wangwu';
  } else {
    console.log('hello', name);
  }
})();

// 闭包题
// for (var i = 0; i < 5; i++) {
//   (function () {
//     setTimeout(() => {
//       console.log('i1=', i);
//     }, i * 1000);
//   })();
// }

// for (var i = 0; i < 5; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log('i2=', i);
//     }, i * 1000);
//   })(i);
// }

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log('i3=', i);
//   }, i * 1000);
// }

// setTimeout中函数时，异步执行结果5 5 5 5 5
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log('i4=', i);
  }, 0);
}

// setTimeout中闭包时，同步执行结果0 1 2 3 4
for (var i = 0; i < 5; i++) {
  setTimeout(
    (function () {
      console.log('i5=', i);
    })(i),
    0
  );
}

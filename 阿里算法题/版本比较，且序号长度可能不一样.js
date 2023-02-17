// Leetcode 165. 比较版本号
// 版本比较 version1 > version2，返回1，version1 < version2，返回-1，version1 == version2，返回0，

function compareVersion(version1, version2) {
  const v1 = version1.split('.');
  const v2 = version2.split('.');

  let maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    let num1 = v1[i] ? parseInt(v1[i]) : 0;
    let num2 = v2[i] ? parseInt(v2[i]) : 0;

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

console.log(compareVersion('0.01.20.2', '0.1.20.2') === 0);
console.log(compareVersion('1.01.20.2', '0.1.20.2') === 1);
console.log(compareVersion('0.01.20', '0.1.20.2') === -1);
console.log(compareVersion('0.1.20.0', '0.1.20') === 0);
console.log(compareVersion('0.1.120.2', '0.1.20.2') === 1);
console.log(compareVersion('0.01.20.2', '0.1.20.2') === 0);
console.log(compareVersion('0.010.20.2', '0.1.20.2') === 1);

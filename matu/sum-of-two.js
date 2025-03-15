const rl = require('readline').createInterface({
  input: process.stdin,
});

var iter = rl[Symbol.asyncIterator]();

const readline = async () => (await iter.next()).value;

void (async function () {
  const arr = (await readline()).split(' ').map(Number);
  const n = arr[0];
  const target = arr[arr.length - 1];
  const nums = arr.slice(1, arr.length - 1);
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      console.log(`${left + 1},${right + 1}`);
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  console.log('No solution found')
  return 0;
})();

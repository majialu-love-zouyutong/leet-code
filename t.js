// 防抖高阶函数

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    // 使用剩余参数
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(this, args); // 使用显式参数
    }, delay);
  };
}

// 节流高阶函数

function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const nowTime = Date.now();
    if (lastTime === 0 || nowTime - lastTime >= delay) {
      lastTime = nowTime;
      return fn.apply(this, args);
    }
  };
}

const hello = () => {
  console.log('hello')
}

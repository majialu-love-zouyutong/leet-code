const {quickSort} = require('./t.js');

describe('quickSort', () => {
  test('应按升序对数字数组进行排序', () => {
    const arr = [3, 6, 8, 10, 1, 2, 1];
    const sortedArr = [1, 1, 2, 3, 6, 8, 10];
    quickSort(arr);
    expect(arr).toEqual(sortedArr);
  });

  test('应处理空数组', () => {
    const arr = [];
    const sortedArr = [];
    quickSort(arr);
    expect(arr).toEqual(sortedArr);
  });

  test('应处理只有一个元素的数组', () => {
    const arr = [5];
    const sortedArr = [5];
    quickSort(arr);
    expect(arr).toEqual(sortedArr);
  });

  test('应处理所有元素相同的数组', () => {
    const arr = [7, 7, 7, 7];
    const sortedArr = [7, 7, 7, 7];
    quickSort(arr);
    expect(arr).toEqual(sortedArr);
  });

  test('应处理包含负数的数组', () => {
    const arr = [-3, -1, -4, -2];
    const sortedArr = [-4, -3, -2, -1];
    quickSort(arr);
    expect(arr).toEqual(sortedArr);
  });
});
// 调整以i为根的子树为大根堆

function heapify(arr, n, i) {
  while (true) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // 如果左孩子存在且更大
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // 如果右孩子更大
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // 如果根节点最大,直接跳出(因为没有交换节点,也无需再调整子树)
    if (i === largest) {
      break;
    }
    // 交换
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // 如果交换了节点,则需要重新调整子树
    i = largest;
  }
}

// 建立大根堆

function buildMaxHeap(arr) {
  const n = arr.length;
  // 从第一个非叶子结点开始向上遍历
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  return arr;
}

// 堆排序

function heapSort(arr) {
  buildMaxHeap(arr);
  // 把堆顶元素和堆尾元素互换,重新调整
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // 将剩余部分重新调整为大根堆
    heapify(arr, i, 0);
  }
  return arr;
}

const arr = [1, 4, 2, 3, 5];
console.time();
heapSort(arr);
console.timeEnd();
console.log(arr);

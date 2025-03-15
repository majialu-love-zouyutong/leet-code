#include <stdio.h>

void insertSort(int arr[]) {
    // 利用末尾哨兵0来计算数组长度
    int length = 0;
    while (arr[length] != 0) {
        length++;
    }
    for (int i = 1; i < length; i++) {
        // 保留当前元素防止被覆盖
        int current = arr[i];
        int j = i - 1;
        // 从前一位开始比较，如果前一位大于当前元素，则将前一位后移一位
        // 边界条件：j >= 0
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        // 将当前元素插入到正确位置
        arr[j + 1] = current;
    }
}
int main(void) {

    // 测试
    int arr[] = {5, 3, 1, 4, 2,0};
    insertSort(arr);
    // 输出arr
    int i = 0;
    while (arr[i] != 0) {
        printf("%d ", arr[i]);
        i++;
    }
    return 0;
}

#include <stdio.h>
int partition(int arr[], int left, int right)
{
  // 保存枢轴元素
  int pivot = arr[left];

  while (left < right)
  {
    // 移动右指针
    while (left < right && arr[right] >= pivot)
    {
      right--;
    }
    // 放置
    arr[left] = arr[right];
    // 移动左指针
    while (left < right && arr[left] <= pivot)
    {
      left++;
    }
    // 放置
    arr[right] = arr[left];
  }
  // 左右指针重合,所指位置就是枢轴元素的最终位置
  arr[left] = pivot;
  return left;
}

void quickSort(int arr[], int left, int right)
{
  if (left < right)
  {
    int pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
}

int main()
{
  int arr[3] = {3, 3, 3};
  quickSort(arr, 0, 2);
  for (int i = 0; i < 3; i++)
  {
    printf("%d", arr[i]);
  }
  return 0;
}
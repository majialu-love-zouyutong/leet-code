#include <stdio.h>

/*
 * 在有序数组中查找两个数，使其和等于目标值。
 * 使用双指针法，时间复杂度为 O(n)。
 */
void findTwoSum(int numbers[], int length, int target)
{
  int left = 0, right = length - 1; // 左指针指向数组起始，右指针指向数组末尾
  while (left < right)
  {                                           // 当左指针小于右指针时循环
    int sum = numbers[left] + numbers[right]; // 计算当前两个指针对应元素的和
    if (sum == target)
    {                                         // 如果和等于目标值
      printf("%d,%d\n", left + 1, right + 1); // 输出结果（索引从 1 开始）
      return;                                 // 直接返回，结束查找
    }
    else if (sum < target)
    {         // 如果当前和小于目标值
      left++; // 左指针右移，使和增大
    }
    else
    {          // 如果当前和大于目标值
      right--; // 右指针左移，使和减小
    }
  }
  printf("No solution found.\n"); // 若未找到合适的组合，则输出无解信息
}

int main()
{
  int length, target, i;
  int numbers[20]; // 定义数组，最大长度为 20

  /* 读取输入 */
  if (scanf("%d", &length) != 1 || length <= 0 || length > 20)
  {                             // 读取数组长度，并检查范围
    printf("Invalid input.\n"); // 输入无效时输出错误信息
    return 1;                   // 终止程序
  }
  for (i = 0; i < length; i++)
  { // 读取数组元素
    if (scanf("%d", &numbers[i]) != 1)
    {                             // 检查输入是否有效
      printf("Invalid input.\n"); // 输入无效时输出错误信息
      return 1;                   // 终止程序
    }
  }
  if (scanf("%d", &target) != 1)
  {                             // 读取目标值，并检查输入是否有效
    printf("Invalid input.\n"); // 输入无效时输出错误信息
    return 1;                   // 终止程序
  }

  /* 查找并输出结果 */
  findTwoSum(numbers, length, target); // 调用函数查找满足条件的两个数

  return 0; // 程序正常结束
}

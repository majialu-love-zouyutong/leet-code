#include <stdio.h>

int main () 
{
  int nums[20];
  int length;
  scanf("%d", &length);
  for (int i = 0; i < length; i++) {
    scanf("%d", &nums[i]);
  }
  int slow = 1;
  for (int fast = 1; fast < length; fast++) {
    if (nums[fast] != nums[fast - 1]) 
    {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  printf("%d ", slow);
  for (int i = 0; i < slow; i++) {
    printf("%d ", nums[i]);
  }
  return 0;
}
#include <stdio.h>
#include <stdlib.h>
/**
 * 定义学生结构体
 */

typedef struct
{
  char name[21];
  int gender;         // 性别(1=男,2=女)
  int birthday;       // 生日(YYYYMMDD)
  float height;       // 身高(m)
  int c_score;        // C语言成绩
  int calculus_score; // 微积分成绩
} Student;

/**
 * 计算平均分,最高分,最低分,并输出最高分学生的信息
 */

void analyze_scores(Student student[], int n)
{
  int c_total = 0, c_max = -1, c_min = 101;
  int calculus_total = 0, calculus_max = -1, calculus_min = 101;

  // 遍历学生数组,计算总分,最高分和最低分
  for (int i = 0; i < n; i++)
  {
    c_total += student[i].c_score;
    calculus_total += student[i].calculus_score;

    if (student[i].c_score > c_max)
    {
      c_max = student[i].c_score;
    }
    if (student[i].c_score < c_min)
    {
      c_min = student[i].c_score;
    }

    if (student[i].calculus_score > calculus_max)
    {
      calculus_max = student[i].calculus_score;
    }
    if (student[i].calculus_score < calculus_min)
    {
      calculus_min = student[i].calculus_score;
    }
  }
  // 输出C语言成绩分析
  printf("C_average:%d\n", c_total / n);
  printf("C_max:%d\n", c_max);
  for (int i = 0; i < n; i++)
  {
    if (student[i].c_score == c_max)
    {
      printf("%s %d %d %.2f %d %d\n", student[i].name, student[i].gender, student[i].birthday, student[i].height, student[i].c_score, student[i].calculus_score);
    }
  }
  printf("C_min:%d\n", c_min);

  // 输出微积分成绩分析
  printf("Calculus_average:%d\n", calculus_total / n);
  printf("Calculus_max:%d\n", calculus_max);
  for (int i = 0; i < n; i++)
  {
    if (student[i].calculus_score == calculus_max)
    {
      printf("%s %d %d %.2f %d %d\n", student[i].name, student[i].gender, student[i].birthday, student[i].height, student[i].c_score, student[i].calculus_score);
    }
  }
  printf("Calculus_min:%d\n", calculus_min);
}

int main()
{
  int n;
  scanf("%d", &n);
  Student *student = (Student *)malloc(sizeof(Student) * n);
  if (!student)
  {
    printf("error\n");
    return 1;
  }
  for (int i = 0; i < n; i++)
  {
    scanf("%s %d %d %f %d %d", student[i].name, &student[i].gender, &student[i].birthday, &student[i].height, &student[i].c_score, &student[i].calculus_score);
  }
  analyze_scores(student, n);
  return 0;
}
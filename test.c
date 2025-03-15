#include <stdio.h>

/**
 * 定义单链表的节点结构
 */

struct node
{
  int data;
  struct node *next;
};

/**
 * 创建带头结点的单链表
 * 输入参数:data是一个长度为n的数组,存储建立链表的数据
 * 返回值: 返回带头结点的单链表的首地址
 */

struct node *createList(int data[], int n)
{
  struct node *head, *tail, *newNode;
  head = (struct node *)malloc(sizeof(struct node));
  if (!head) 
  {
    printf("error");
    return NULL;
  }
  head->next = NULL;
  tail = head;

  for (int i = 0; i < n; i++) 
  {
    newNode = (struct node *)malloc(sizeof(struct node));
    if (!newNode) 
    {
      printf("error");
      return NULL;
    }
    newNode->data = data[i];
    newNode->next = NULL;
    tail->next = newNode;
    tail = newNode;
  }
  return head;
}
#include <stdio.h>
#include <stdlib.h>

/*
 * 定义单链表节点结构
 */
struct node
{
  int data;          // 存储数据
  struct node *next; // 指向下一个节点的指针
};

/*
 * 创建带头结点的单链表
 * 输入参数：data 是一个长度为 n 的数组，存储建立链表的数据。
 * 返回值：返回带头结点的单链表的首地址。
 */
struct node *createList(int data[], int n)
{
  struct node *head, *tail, *newNode;
  head = (struct node *)malloc(sizeof(struct node)); // 创建头结点
  if (!head)
  {
    printf("error\n");
    return NULL;
  }
  head->next = NULL; // 头结点指针初始化为空
  tail = head;       // 初始时尾指针指向头结点

  for (int i = 0; i < n; i++)
  {
    newNode = (struct node *)malloc(sizeof(struct node)); // 创建新节点
    if (!newNode)
    {
      printf("error\n");
      return NULL;
    }
    newNode->data = data[i]; // 赋值数据
    newNode->next = NULL;
    tail->next = newNode; // 让当前尾节点指向新节点
    tail = newNode;       // 更新尾节点指针
  }
  return head; // 返回带头结点的链表
}

/*
 * 释放单链表内存
 */
void freelst(struct node *h)
{
  struct node *p = h->next;
  while (p)
  {
    h->next = p->next;
    free(p);
    p = h->next;
  }
  free(h);
}

/*
 * 打印单链表中的数据
 */
void printlst(struct node *h)
{
  struct node *p = h->next;
  while (p)
  {
    printf("%d ", p->data);
    p = p->next;
  }
  printf("\n");
}

int main()
{
  struct node *header = NULL, *p;
  int *data, n, i;

  scanf("%d", &n);
  data = (int *)malloc(n * sizeof(int));
  if (!data)
    return 0;

  for (i = 0; i < n; ++i)
    scanf("%d", data + i);

  header = createList(data, n);
  if (!header)
  {
    free(data);
    return 0;
  }

  printlst(header);
  freelst(header);
  free(data);

  return 0;
}
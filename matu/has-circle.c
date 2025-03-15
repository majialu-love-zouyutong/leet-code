#include <stdio.h>
#include <stdlib.h>

/*
 * 定义单链表节点结构
 */
struct Node {
    int data;          // 存储数据
    struct Node *next; // 指向下一个节点的指针
};

/*
 * 头插法创建带头结点的单链表
 * 用户输入数据，-1 结束输入（-1 不存入链表）
 * 返回值：单链表头结点地址
 */
struct Node* CreatList() {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node)); // 创建头结点
    if (!head) {
        printf("error\n");
        return NULL;
    }
    head->next = NULL;
    int value;
    while (scanf("%d", &value) == 1 && value != -1) { // 读取输入，遇到 -1 结束
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        if (!newNode) {
            printf("error\n");
            return NULL;
        }
        newNode->data = value;
        newNode->next = head->next; // 头插法，插入到头结点后面
        head->next = newNode;
    }
    return head;
}

/*
 * 判断单链表是否存在环
 * 采用快慢指针法（Floyd 判圈法）
 */
void IsCir(struct Node* first) {
    struct Node *slow = first, *fast = first; // 初始化快慢指针
    while (fast && fast->next) { // 快指针每次移动两步，慢指针每次移动一步
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) { // 如果快慢指针相遇，则存在环
            printf("true\n");
            return;
        }
    }
    printf("false\n"); // 若循环结束，说明无环
}

/*
 * 合并两个带头结点的递增有序单链表
 * 返回合并后的链表头结点地址
 */
struct Node* merge_sorted_lists(struct Node* head1, struct Node* head2) {
    struct Node* mergedHead = (struct Node*)malloc(sizeof(struct Node)); // 创建新头结点
    if (!mergedHead) {
        printf("error\n");
        return NULL;
    }
    mergedHead->next = NULL;
    struct Node* tail = mergedHead;
    struct Node* p1 = head1->next;
    struct Node* p2 = head2->next;
    
    while (p1 && p2) {
        if (p1->data <= p2->data) {
            tail->next = p1;
            p1 = p1->next;
        } else {
            tail->next = p2;
            p2 = p2->next;
        }
        tail = tail->next;
    }
    tail->next = p1 ? p1 : p2; // 连接剩余部分
    return mergedHead;
}

/*
 * 对带头结点的单链表进行简单选择排序
 */
void List_sort(struct Node* head) {
    struct Node* i, *j, *min;
    for (i = head->next; i && i->next; i = i->next) {
        min = i;
        for (j = i->next; j; j = j->next) {
            if (j->data < min->data) {
                min = j;
            }
        }
        if (min != i) { // 交换数据
            int temp = i->data;
            i->data = min->data;
            min->data = temp;
        }
    }
}

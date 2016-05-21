---
layout: post        
tags: [Data Structure, Python]    
title: Priority Queue——Binary heap
---

实现**优先队列(priority queue)**的一种经典的方式是使用一个叫**二叉堆(binary heap)**的数据结构。二叉堆实际上是一棵**完全二叉树**，且满足堆的性质。它对于插入和查找操作的时间复杂度都是**O(logn)**。

二叉堆画出来像树，但实际上内部实现起来只需要使用**数组**。二叉堆有两种常见形式：**最小堆(min heap)**——对于堆中每个节点（除根节点）, 其父结点的值小于其值；**最大堆(max heap)**——对于堆中每个节点（除根节点）, 其父结点的值小于其值。



### Binary Heap Operation
+ `BinaryHeap()` creates a new,empty,binary heap
+ `insert(k)` adds a new item to the heap
+ `findMin()` returns the item with the minimum key value, leaving item in the heap
+ `delMin()` returns the item with the minimum key value, removing the item from the heap
+ `isEmpty()` returns true if the heap is empty, false otherwise
+ `size()` returns the number of items in the heap
+ `buildHeap(list)` builds a new heap from a list of keys

### Implementation

    class BinHeap:
        def __init__(self):
            self.heapList = [0]
            self.currentSize = 0

        def percUp(self, i):
            while i // 2 > 0:
                if self.headList[i] < self.headList[i // 2]:
                    self.heapList[i//2], self.heapList[i] = self.heapList[i], self.heapList[i//2]
                i = i // 2

        def insert(self, k):
            self.headList.append(k)
            self.currentSize = self.currentSize + 1
            self.percUp(self.currentSize)

        def percDown(self, i):
            while (i * 2) <= self.currentSize:
                mc = self.minChild(i)
                if self.headList[i] > self.headList[mc]:
                    self.heapList[i], self.headList[mc] = self.heapList[mc], self.heapList[i]
                i = mc

        def minChild(self, i):
            if i * 2 + 1 > self.currentSize:
                return i * 2
            else:
                if self.headList[ i * 2 ] < self.headList[i * 2 + 1]:
                    return i * 2
                else: 
                    return i * 2 + 1

         def delMin(self):
             retval = self.headList[1]
             self.headList[1] = self.headList[self.currentSize]
             self.currentSize = self.currentSize - 1
             self.heapList.pop()
             self.percDown(1)
             return retval

         def buildHeap(self, alist):
             i = len(alist) // 2
             self.currentSize = len(alist)
             self.headList = [0] + alist[:]
             while ( i > 0 ):
                 self.percDown(i)
                 i = i - 1

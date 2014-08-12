---
layout: post
tags: [Data Structure, Python]
---

The classic way to implement a **priority queue** is using a data structure called a **binary heap**. A binary heap will allow us both enqueue and dequeue items in **O(logn)**.

The binary heap is interesting to study because when we diagram the heap it looks a lot like a tree, but when we implement it we use only a single list as an internal representation. The binary heap has two common variations: the **min heap**, in which the smallest key is always at the front, and the **max heap**, in which the largest key value is always at the front.

二叉堆实际上是一棵完全二叉树，且满足堆的性质。对于插入和查找操作的时间复杂度度都是O(logn)。

### Binary Heap Operation
+ BinaryHeap() creates a new,empty,,binary heap
+ insert(k) adds a new item to the heap
+ findMin() returns the item with the minimum key value, leaving item in the heap
+ delMin() returns the item with the minimum key value, removing the item from the heap
+ isEmpty() returns true if the heap is empty, false otherwise
+ size() returns the number of items in the heap
+ buildHeap(list) builds a new heap from a list of keys

### Implementation

	class BinHeap:
		def __init__(self):
			self.heapList = [0]
			self.currentSize = 0

		def percUp(self, i):
			while i // 2 > 0:
				if self.headList[i] < self.headList[i // 2]:
					tmp = self.headList[i // 2]
					self.headList[i // 2] = self.headList[i]
					self.headList[i] = tmp
				i = i // 2

		def insert(self, k):
			self.headList.append(k)
			self.currentSize = self.currentSize + 1
			self.percUp(self.currentSize)

		def percDown(self, i):
			while (i * 2) <= self.currentSize:
				mc = self.minChild(i)
				if self.headList[i] > self.headList[mc]
					tmp = self.headList[i]
					self.headList[i] = self.headList[mc]
					self.headList[mc] = tmp
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


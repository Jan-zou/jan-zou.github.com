---
title: 程序员调代码访谈：Brent Simmons       
tags: [Translation]     
layout: post
---

*本文由[@Jan_zou](http://blog.jobbole.com/author/janzou/)翻译，原文出处：[Karim Hamidou](http://debuggers.co/obj-c/mac/2014/05/01/Brent-Simmons.html)*


##你是谁？
我是一个软件开发者。我住在西雅图——美国西北部太平洋沿岸。

我和我的同事Dave Wiskus和John Gruber写了一个iPhone上的笔记应用Vesper。以前，我写过的应用有NetNewsWire, MarsEdit和Glassboard。

我的博客在[inessential.com](http://inessential.com/)，我和我的朋友Chris Parrish在[therecord.co](http://therecord.co/)上发布了一个播客。


##你解决了什么有趣的bug?

对于某些版本的OS X - 可能是OS X10.5 - 苹果改变了如何将崩溃日志存储在磁盘上。之前是每个应用一个文件，但后来苹果改变成每个崩溃日志一个文件。

当时，我的应用NetNewsWire有崩溃日志捕获器来向我推送崩溃日志，所以我可以找出哪里出了问题并解决它。

我更新了崩溃日志捕获代码来处理新的格式，应用进行beta测试，最终代码以它的方式进入了下一个版本。

让我出乎意料的是，当下一版本发放时，一大堆人在他们第一次启动这个应用时遇到了应用崩溃的情况！

我知道这一点是因为他们告诉了我，也因为应用程序向我发送了他们的崩溃日志。

有趣的一点是，应用程序崩溃在崩溃日志捕获器本身。当没有崩溃日志时，我忘了测试崩溃日志捕获器。

因此当没有崩溃日志时，它崩溃了。

只有至少创建一个崩溃日志，应用程序才不会再次崩溃。这个bug是自愈的！

当然，我在下一版本中修复了这个。（这是一个很小的错误，我只修改了一行。）我应该已经赶上了我自己，因为当有东西为零时，进行测试总是好的做法。

但是，这并不奇怪。开发者总有崩溃日志，同时我的beta测试者们也是。（因为他们使用的是应用程序的未发行版本。）

我应该有自动化测试，但我没有。从中我得到了教训。我很幸运，在这一种情况下，崩溃可能永远只能在每台计算机上发生一次。
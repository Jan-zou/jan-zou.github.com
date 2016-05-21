---
layout: post
tags: [Python, Translation]
title: Python进阶之“属性(property)”详解
---

*本文由[@Jan_zou](http://blog.jobbole.com/author/janzou/)翻译，原文出处：[www.blog.pythonlibrary.org](http://www.blog.pythonlibrary.org/2014/01/20/python-201-properties/)*

Python中有一个被称为**属性函数(property)**的小概念，它可以做一些有用的事情。在这篇文章中，我们将看到如何能做以下几点：

+ 将类方法转换为只读属性
+ 重新实现一个属性的setter和getter方法

在本文中，您将学习如何以几种不同的方式来使用内置的**属性**函数。希望读到文章的末尾时，你能看到它是多么有用。


##开始

使用属性函数的最简单的方法之一是将它作为一个方法的装饰器来使用。这可以让你将一个类方法转变成一个类属性。当我需要做某些值的合并时，我发现这很有用。其他想要获取它作为方法使用的人，发现在写转换函数时它很有用。让我们来看一个简单的例子：

```python
class Person(object):
    def __init__(self, first_name, last_name):
        """Constructor"""
        self.first_name = first_name
        self.last_name = last_name

    @property
    def full_name(self):
        """
        Return the full name
        """
        return "%s %s" % (self.first_name, self.last_name)
```

在上面的代码中，我们创建了两个类属性：**self.first_name**和**self.last_name**。接下来，我们创建了一个**full_name**方法，它有一个**@property**装饰器。这使我们能够在Python解释器会话中有如下的交互：

```
>>> person = Person("Mike", "Driscoll")
>>> person.full_name
'Mike Driscoll'
>>> person.first_name
'Mike'
>>> person.full_name = "Jackalope"
Traceback (most recent call last):
  File "<string>", line 1, in <fragment>
AttributeError: can't set attribute
```

正如你所看到的，因为我们将方法变成了属性，我们可以使用正常的点符号访问它。但是，如果我们试图将该属性设为其他值，我们会引发一个**AttributeError**错误。改变**full_name**属性的唯一方法是间接这样做：

```
>>> person.first_name = "Dan"
>>> person.full_name
'Dan Driscoll'
```

这是一种限制，因此让我们来看看另一个例子，其中我们可以创建一个允许设置的属性。


##使用Python property更换setter和getter方法

让我们假设我们有一些遗留代码，它们是由一些对Python理解得不够好的人写的。如果你像我一样，你之前已经看到过这类的代码：

```python
from decimal import Decimal

class Fees(object):
    def __init__(self):
        """Constructor"""
        self._fee = None

    def get_fee(self):
        """
        Return the current fee
        """
        return self._fee

    def set_fee(self, value):
        """
        Set the fee
        """
        if isinstance(value, str):
            self._fee = Decimal(value)
        elif isinstance(value, Decimal):
            self._fee = value
```

要使用这个类，我们必须要使用定义的getter和setter方法​​：

```
>>> f = Fees()
>>> f.set_fee("1")
>>> f.get_fee()
Decimal('1')
```

如果你想添加可以使用正常点符号访问的属性，而不破坏所有依赖于这段代码的应用程序，你可以通过添加一个属性函数非常简单地改变它：

```python
from decimal import Decimal

class Fees(object):
    def __init__(self):
        """Constructor"""
        self._fee = None

    def get_fee(self):
        """
        Return the current fee
        """
        return self._fee

    def set_fee(self, value):
        """
        Set the fee
        """
        if isinstance(value, str):
            self._fee = Decimal(value)
        elif isinstance(value, Decimal):
            self._fee = value

    fee = property(get_fee, set_fee)
```

我们在这段代码的末尾添加了一行。现在我们可以这样做：

```
>>> f = Fees()
>>> f.set_fee("1")
>>> f.fee
Decimal('1')
>>> f.fee = "2"
>>> f.get_fee()
Decimal('2')
```

正如你所看到的，当我们以这种方式使用**属性函数**时，它允许fee属性设置并获取值本身而不破坏原有代码。让我们使用属性装饰器来重写这段代码，看看我们是否能得到一个允许设置的属性值。

```python
from decimal import Decimal

class Fees(object):
    def __init__(self):
        """Constructor"""
        self._fee = None

    @property
    def fee(self):
        """
        The fee property - the getter
        """
        return self._fee

    @fee.setter
    def fee(self, value):
        """
        The setter of the fee property
        """
        if isinstance(value, str):
            self._fee = Decimal(value)
        elif isinstance(value, Decimal):
            self._fee = value

if __name__ == "__main__":
    f = Fees()
```

上面的代码演示了如何为**fee**属性创建一个setter方法。你可以用一个名为**@fee.setter**的装饰器装饰第二个方法名也为fee的方法来实现这个。当你如下所做时，setter被调用：

```
>>> f = Fees()
>>> f.fee = "1"
```

如果你看**属性函数**的说明，它有fget, fset, fdel和doc几个参数。如果你想对属性使用**del**命令，你可以使用**@fee.deleter**创建另一个装饰器来装饰相同名字的函数从而实现删除的同样效果。


##结束语

现在你知道如何在你的类中使用Python的属性函数。希望你能找到更有用的方式，在你的代码中使用它们。


##补充阅读：

+ [Python中的getter和setter方法](http://eli.thegreenplace.net/2009/02/06/getters-and-setters-in-python/)
+ 官方Python[文档中对property的介绍](http://docs.python.org/release/2.6/library/functions.html#property)
+ [StackOverflow](https://stackoverflow.com/questions/16025462/what-is-the-right-way-to-put-a-docstring-on-python-property)中对给Python属性函数增加文档字符串的一个讨论

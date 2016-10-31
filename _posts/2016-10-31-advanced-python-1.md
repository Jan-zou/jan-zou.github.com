---
layout: post
tags: [Python]
title: Python进阶知识（1）
---

## 1. `__init__.py文件`

包导入语句的路径中的每个目录内都必须有`__init__.py`文件，否则导入包会失败。

`__init__.py`可以包含Python程序代码，也可以完全是空的。
更通常的情况下，`__init__.py`文件扮演包初始化的钩子、替目录产生模块命名空间以及使用目录导入时实现`from ... import *`行为的角色。

+ 包的初始化    
首次导入某个目录时，会自动执行该目录下`__init__.py`文件中的所有程序代码。因此，这类文件自然就是放置包内文件所需要初始化的代码的场所。如，包可以使用其初始化文件，来创建所需要的数据文件、连接数据库等。
+ 模块命名空间的初始化    
在包导入的模型中，脚本内的目录路径在导入后会变成真实的嵌套对象路径。这类文件为目录所创建的模块对象提供了命名空间。
+ `from*`语句的行为    
可以在`__init__.py`文件内使用`__all__`列表来定义目录以`from*`语句形式导入时需要导出什么。`__all__`列表是指当包名称使用`from*`的时候应该导入的子模块的名称清单。如果没有设定`__all__`，`from*`语句不会自动加载嵌套于该目录内的子模块，而只加载该目录`__init__.py`文件中赋值语句定义的变量名，包括该文件中程序代码明确导入的任何子模块。

> 在python中， module(也即python的模块)是一个单独的文件来实现的，要么是py文件，或者pyc文件，甚至是C扩展的dll文件。而对于package, Python使用了文件夹来实现它，可以说，一个文件夹就是一个package,里面容纳了一些py、pyc或dll文件，这种方式就是把module聚合成一个package的具体实现。 ———— 陈儒《Python源码剖析》

只有在文件夹下建立一个init.py文件，python虚拟机才会认为该文件夹是一个合法的package，才能import其中的模块。在引入package的过程中，init.py会运行；因此如果某些比那里或方法要常驻内存可以将他们写入inin.py文件中。


## 2. `__all__`

`__all__`定义了使用`from <module> import *`导入某个模块的时候能导出的符号（如变量，函数，类等），若没有定义该变量则导出module中所有不以下划线开头（私有）的成员。需要注意的是`__all__`只影响`from <module> import *`这种导入方式，对于`from <module> import <member>`导入方式并没有影响，仍然可以从外部导入。


## 3. `*args`和`**kwargs`

`*args`是可变的positional arguments列表，`**kwargs`是可变的keyword arguments列表。使用顺序是`*args`必须位于`**kwargs`之前。

```python
some_func(fargs, *args, **kwargs)
```


## 4. 迭代器

+ *iterable* is any object which can provide us with an iterator, which has an `__iter__` or a `__getitem__` method.
+ An *iterator* is any object in Python which has a `next` or `__next__` method defined.
+ When we use a loop to loop over something it is called *iteration*.
+ *Generators* are iterators, but you can only iterate over them once. It's because they do not store all the values in memory, they generate the values on the fly. They do not `return` a value, the `yield` it.


## 5. `__slots__` 
 
默认情况下， Python使用字典来存储对象实例的属性，这可以方便在运行时添加任意的新属性。字典存储浪费内存，Python不能在对象创建时直接分配一个固定量的内存来保存所有的属性。在class中定义`__slots__`变量，可以让Python不使用字典，而只给一个固定集合的属性分配空间。

`__slots__`变量限制class能添加的属性。`__slots__`定义的属性仅对当前类起作用，对继承的子类是不起作用的；除非在子类中也定义`__slots__`，这样子类允许定义的属性就是自身的`__slots__`加上父类的`__slots__`。

```python
class MyClass(object):    __slots__ = ['name', 'identifier'] 
    def __init__(self, name, identifier):        self.name = name        self.identifier = identifier
        self.set_up()
```


## 6. collections模块使用

### defaultdict

```python
from collections import defaultdict
tree = lambda: defaultdict(tree) 
some_dict = tree() 
some_dict[ colours ][ favourite ] = "yellow" 
# Works fineimport jsonprint(json.dumps(some_dict))# Output: {"colours": {"favourite": "yellow"}}
```

### namedtuple

```python
from collections import namedtuple
Animal = namedtuple('Animal', 'name age type')
perry = Animal(name="perry", age=31, type="cat") 

print(perry)
# Output: Animal(name='perry', age=31, type='cat')print(perry.name) 
# Output:  perry 
```


## 7. Object introspection

+ `dir(object)`: 查看对象内的所有属性和方法; `dir()`没有参数时则返回当前范围内的所有变量、方法。
+ `type(object)`: 返回一个对象的类型。
+ *inspect* module: provides several useful functions to get information about live objects.


## 8. One-Liner commands

+ Simple Web Server: `python -m SimpleHTTPServer`
+ Pretty Printing

```python
from pprint import pprint
	
my_dict = {'name': 'Yasoob', 'age': 'undefined', 'personality': 'awesome'}pprint(my_dict)
```

Moreover, if you want to pretty print json quickly from a file then you can simply do: `cat file.json | python -m json.tool`

+ Profiling a scipt: `python -m cProfile my_script.py`
+ CSV to json: `python -c "import csv,json;print json.dumps(list(csv.reader(open('csv_file.csv'))))"`
+ List Flattening

```python
import itertools
	
a_list = [[1, 2], [3, 4], [5, 6]]
print(list(itertools.chain.from_iterable(a_list))) 
# Output: [1, 2, 3, 4, 5, 6]# orprint(list(itertools.chain(*a_list))) 
# Output: [1, 2, 3, 4, 5, 6]
```


## 9. Function caching

函数缓存允许我们将一个函数对于给定参数的返回值缓存起来。当一个I/O密集的函数被频繁使用相同的参数调用的时候，函数缓存可以节约时间。

在Python 3.2版本以前我们只有写一个自定义的实现。在Python 3.2以后版本，有个`lru_cache`的装饰器，允许我们将一个函数的返回值快速地缓存或取消缓存。


## Reference

[1] [《Intermediate Python》](http://book.pythontips.com/en/latest/index.html)    
[2] [Python进阶必读汇总](http://www.dongwm.com/archives/pythonjin-jie-bi-du-hui-zong/)    
[3] [Powerful Python One-Liners](https://wiki.python.org/moin/Powerful%20Python%20One-Liners)




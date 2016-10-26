---
layout: post
tags: [Tools]
title: Git Workflow
---

Git Workflow Model
![workflow](/assets/blog/20150829_git_workflow.png)

> 任何时候，master分支都处于可部署状态


## 主分支
集中式的版本库有两个永久存在的主分支：

+ master branch
+ develop branch

当develop分支上的代码达到了一个稳定状态，并且准备发布时，所有的代码变更都应该合并到master分支，然后打上发布版本号的tag。


## 辅助性分支
紧邻master和develop分支，开发模型采用了另外一种辅助性的分支，以帮助团队成员间的并行开发，特性的简单跟踪，产品的发布准备事宜，以及快速的解决线上问题。不同于主分支，这些辅助性分支往往只要有限的生命周期，因为它们最终会被删除。

使用的不同类型分支包括:

+ feature branches
+ hotfixes branches
+ release branches

**feature分支从develop分支拉取建立，最终必须合并于develop分支。** feature分支只存在开发者本地版本库，不在远程版本库。

    $ git checkout -b myfeature develop
    $ git checkout develop
    $ git merge --no-ff myfeature
    # --no-ff参数的作用是在合并的时候，会新增一个commit提交对象，这避免丢失feature分支的历史记录信息以及提交记录信息。
    # 没有--no-ff参数，则执行“快进式合并”(fast-farward merge)，不保留feature分支的开发记录
    $ git branch -d myfeature
    $ git push origin develop

**release分支从develop分支建立，必须合并到develop分支和master分支。** release分支名可以这样起名:release-*。
release分支用于支持一个新版本的发布。他们允许在最后时刻进行一些小修小改。甚至允许进行一些小bug的修改，为新版本的发布准要一些元数据(版本号，构建时间等)。通过在release分支完成这些工作，develop分支将会合并这些特性以备下一个大版本的发布。

**hotfix分支从master分支建立，必须合并回develop分支和master分支。** hotfix分支可以这样起名:hotfix-*。
hotfix分支在某种程度上非常像release分支，他们都意味着为某个新版本发布做准备，并且都是预先不可知的。hotfix分支是基于当前生产环境的产品的一个bug急需解决而必须创建的。当某个版本的产品有一个严重bug需要立即解决，hotfix分支需要从master分支上该版本对应的tag上进行建立，因为这个tag标记了产品版本。

> 当一个release分支存在时，hotfix分支需要合并到release分支，而不是develop分支。


## commit 规范
清晰的commit信息能让别人迅速地明白**你做了什么，以及为什么这样做**。小改动，一句commit信息说明；大改动，新建issue说明情况、方案、变化等。

     add-新增需求
     fix-修复bug
     update-更新代码
     change-修改代码


## 提交粒度
代码的提交以完成一个独立的功能单元为粒度。切忌粒度过大或过小。粒度的关键在于提交的代码为独立的功能单元，以便今后通过提交信息快速定位，进行回滚或合并分支。

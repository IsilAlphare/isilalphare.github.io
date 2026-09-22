---
title: "博客搭建（一） 初始化"
date: 2025-09-14
category: "技术札记"
tags:
  - "tech"
  - "兴趣"
  - "博客"
sourceDoc: "https://bytedance.larkoffice.com/docx/I86VdspHxoBmrNxhbg3czbRdnDd"
slug: blog-building-1
---

> 最近收到了阿里云的域名续费通知，发现这个心血来潮网站也快一年了。本意是想分享一些生活和技术相关的东西，但并未勤快地更新（特别是技术相关）。  
> 那么，就先从本博客的搭建开始说起吧\~

## 域名

在阿里云的万网上买的，有一个第一年1元的活动。不同的域名价格不一样，比如com,cn这些会很贵，cc, top这种就会便宜一点。

比如我选择的域名：starrydome.top

关于网站搭建的博客，可以参考这篇：

## 初步搭建

我选择的是新手小白都喜欢用的简单且花里胡哨的框架hexo,并配合butterfly进行主题化。因为是中文母语开发者的原因，社区和文档也非常易懂。

- 购买域名，部署博客托管在githubPages站点，然后再解析到个人域名，可以参考这一篇：
- [从零开始搭建个人博客（超详细）- 知乎](https://zhuanlan.zhihu.com/p/102592286)

[零基础使用hexo搭建butterfly主题的博客- 知乎](https://zhuanlan.zhihu.com/p/404320856)

- 我使用的主题样式 – butterfly官方的gitee项目页：

[hexo-theme-butterfly:🦋 A Hexo Theme: Butterfly (gitee.com)](https://gitee.com/immyw/hexo-theme-butterfly)

- 使用方法在官方文档里事无巨细，比如主题配置相关：

[Butterfly 文檔(二)主題頁面 | Butterfly](https://butterfly.js.org/posts/dc584b87/)

- 在非管理员模式下执行脚本的方法可参考这篇：（其他的也适用）  
`https://blog.csdn.net/JONE_WUQINGJIANG/article/details/103044919`

 另，文中gitee的下载镜像已经失效。github的命令为：

```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

### 可能的问题

网站打不开可能是没有认证完全的原因  
查看域名信息，看看是否认证完了（实名制 邮箱等）

## 🌟网页更新和部署

怎么写文章呢？hello-world.md里面其实就说了  
Create a new post

```bash
hexo new "My New Post"
```

更新完一个页面后，三条命令

```bash
hexo g # 生成静态页面
hexo s # 在4000端口查看当前页面
hexo d # 将当前更改部署到网页上
```

### 可能的问题

#### hexo明明安装了却无法使用命令的问题

在确保node.js安装正常的情况下，在所有hexo命令前加上nxp即可

```bash
nmx hexo g
```

#### 图片保存问题

在本地保存的图片要想挂到网上会显示不了

第一种办法是在source下面创建一个文件夹用相对路径。但是有的可以显示有的又不行，很烦

尽量不要使用相对路径/本地路径

最好还是尽量采用 **全外链** 的方式

[Image Upload - SM.MS - Simple Free ImageHosting](https://sm.ms/)

sm.ms是个图床上传网站，相当于个人的云图库。上传之后会自动生成外链，还有md格式，cv就好了

#### 本地部署和线上不一致的问题

1. 需要先`hexo clean`，删除 **public文件夹（即hexo的缓存）**
2. 然后重新`hexo ghexo d`
3. 打开域名网站后，记得`shft + f5`强制再刷新一次

注意：图片什么的别放`public`里，这是缓存

想固定存放应该放`source/img`里这样就不会每次清缓存都丢失

source/img中的图片都是可以直接在文章中以/img/…来引用的

---

原文存档：[博客 原文](<https://starrydome.top/2025/09/14/博客搭建/>)

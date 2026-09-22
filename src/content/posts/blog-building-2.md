---
title: "博客搭建（二） 草稿和多设备管理"
date: 2025-09-14
category: "技术札记"
tags:
  - "tech"
  - "兴趣"
  - "博客"
sourceDoc: "https://bytedance.larkoffice.com/docx/FpO2dPhxroA1R9xrfdFc197EnyV"
slug: blog-building-2
---

## 草稿功能

在写博客时，我们经常会有多篇文章同时在创作，但只想发布已经完成的。

直接用 `git` 来选择推送哪个文件是行不通的，因为 Hexo的工作流程是：`hexo generate` 命令会处理 `source`目录下的 **所有** 符合条件的文件，生成整个网站，然后`hexo deploy`会将这个 **完整的网站** 推送到服务器。

因此，我们的目标不是选择推送哪个文件，而是 **控制`hexo generate` 命令处理哪些文章** 。

下面介绍两种常用方式，都是基于hexo的原生功能，即草稿（draft）和未来发布

### 方法一：使用 Hexo的草稿（Draft）功能（官方推荐）

这是 Hexo 专门为此设计的标准工作流程，也是最清晰的方法。

#### 工作原理

Hexo 有一个特殊的文件夹`source/_drafts`。放在这个文件夹里的任何 Markdown文件都不会在默认的 `hexo generate` 中被处理成公开的文章。

#### 操作步骤

1. **创建一篇草稿** ：

   ```bash
   hexo new draft "我还没写好的文章"
   ```
2. **在本地预览草稿** ：默认情况下，`hexo server`是看不到草稿的。如果想在本地预览，需要加上 `--drafts`参数：

   ```bash
   hexo server --drafts
   ```
3. **发布草稿** ： 当您的文章写完，准备发布时，使用`publish` 命令。

   ```bash
   hexo publish post "我还没写好的文章"
   ```

   - 将 `我还没写好的文章.md` 文件从`source/_drafts` **移动到** `source/_posts` 文件夹。
   - 自动为文件的 Front-matter 里的 `date`字段填上当前的发布日期。

现在，这篇文章就在 `_posts` 文件夹里了，下次您运行`hexo generate` 和 `hexo deploy`时，它就会被正常发布。

### 方法二：利用Front-matter 设置文章为“草稿”或“隐藏”

如果不想移动文件，希望所有文章都留在 `_posts`文件夹里统一管理，可以通过修改文章头部的 Front-matter 来实现。

#### 工作原理

在文章的 Front-matter 中添加一个 `published: false` 或者`draft: true` 的字段，然后在 Hexo 的主配置文件中告诉 Hexo忽略带有这些字段的文章。

**不过，更简单且无需修改配置的方法是利用 `date`字段。**  Hexo 默认不会生成发布日期在未来的文章。

#### 操作步骤

1. **设置一个未来的日期** ：对于不想发布的文章，只需将其 Front-matter 中的 `date`设置为一个未来的时间。

   ```markdown
   ---
   title: 一篇暂时不想发布的文章
   date: 2099-12-31 23:59:59 # 设置一个非常遥远的未来日期
   tags:
   ---
   
   这里是文章内容...
   ```
2. **正常生成和部署** ： 现在，当您运行`hexo generate` 时，Hexo会自动跳过这篇日期在未来的文章。您可以放心地`hexo deploy`，它不会出现在您的线上博客里。
3. **在本地预览未来文章** ：如果您想在本地预览这些设置了未来日期的文章，可以使用`--future` 参数：

   ```bash
   hexo server --future
   ```
4. **准备发布** ： 当想发布这篇文章时，只需将`date`修改为当前的日期和时间，然后重新生成和部署即可。

## 多设备管理

有的时候我们会出现在多台设备上管理博客的情况，比如我用工作电脑摸鱼的时候，也想搞搞博客。这个时候，只将github.io结尾的那个项目clone下来是不够的–会丢失大量信息。应该用的方法是：

### 为源文件建立一个独立的Git 仓库

将博客 **源文件** （即 `my-blog-source`整个文件夹）也用 Git 管理起来，并推送到一个 **新的、独立的** GitHub 仓库（例如，创建一个私有仓库叫 `blog-source`）。

1. 在 GitHub 上创建一个新的仓库（比如`blog-source`）。
2. 在 `my-blog-source` 文件夹下，执行：

   ```bash
   git init
   git add .
   git commit -m "Initial commit of my blog source"
   git branch -M main
   git remote add origin https://github.com/your-username/blog-source.git
   git push -u origin main
   ```

这样，就拥有了两个仓库啦：

- `blog-source`：这个是存放 Markdown文章、配置文件、主题等 **源文件** 的，用于博客管理的全套信息。
- `your-username.github.io`：存放由`hexo deploy` 推送的 **已发布的网站文件** 。

以后换任何电脑，只需要 `git clone` 你的`blog-source` 仓库，运行`npm install`，就可以立刻恢复完整的写作环境啦。

---

原文存档：[博客 原文](<https://starrydome.top/2025/09/14/博客搭建(2)/>)

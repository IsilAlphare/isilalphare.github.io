# 写一篇原创文章

在 `src/content/posts/` 新建 Markdown 文件，例如 `my-new-post.md`：

```markdown
---
title: 我的新文章
date: 2026-09-22
category: 生活切片
tags:
  - 随笔
slug: my-new-post
---

这里写正文。

## 一个小标题

继续写下去。

![图片说明](/article-media/my-new-post/photo.jpg)
```

- 分类任选：`技术札记`、`生活切片`、`拾光摘录`。
- `slug` 必须唯一，建议小写英文加短横线。发布后地址是 `/posts/my-new-post/`，尽量不再改动。
- 原创文章无需填写 `sourceDoc`；搬运自己旧文时可选填原文的完整 URL。
- 图片放进 `public/article-media/my-new-post/`，正文引用路径不要带 `public`。
- 保存后，本地开发预览会更新，首页与文章目录会自动收录；评论区自动按文章地址区分。
- 目前没有草稿开关：该目录内的 Markdown 都会参与发布。未准备好的稿子先放在目录外，例如 `docs/drafts/`。
- 发布前执行 `pnpm run build`。提交并推送到 master 才会触发线上发布。

也可以直接把正文、标题和图片交给 Agent 整理。发布前核对排版与措辞，再明确授权提交、推送。

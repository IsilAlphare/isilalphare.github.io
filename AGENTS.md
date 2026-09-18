# Starry Dome 维护交接说明

> 目标读者：接手维护 `Starry Dome 星空穹庐` 的 Agent 或开发者。先读完本文件，再改代码。  
> 当前状态：Astro 静态站点已替换旧 Hexo 博客，线上域名为 `https://starrydome.top/`。

## 1. 项目定位

- 项目名：`starry-dome`
- 线上站点：`https://starrydome.top/`
- GitHub 仓库：`https://github.com/IsilAlphare/isilalphare.github.io.git`
- 默认分支：`master`
- 技术栈：Astro 7 + pnpm + GitHub Pages Actions
- 发布方式：推送到 `master` 后由 `.github/workflows/deploy.yml` 自动构建并发布
- 自定义域名：`public/CNAME`，内容必须保持为 `starrydome.top`
- 旧站备份分支：`backup/old-hexo-20260918-173513`

## 2. 本地路径与环境

用户本机已拉取到：

```bash
/Users/bytedance/Projects/starry-dome
```

本机 Node 已通过 nvm 设置为：

```bash
node v24.21.0
pnpm 11.25.0
```

如果新终端仍显示旧 Node，先执行：

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24
```

## 3. 常用命令

在项目根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run build
pnpm run preview
```

含义：

- `pnpm run dev`：本地开发预览，Astro 会监听 `0.0.0.0`
- `pnpm run build`：生产构建，输出到 `dist/`
- `pnpm run preview`：本地预览生产构建结果

提交前至少跑：

```bash
pnpm run build
```

成功构建时应看到约 26 个页面生成，且 `dist/CNAME` 存在。

## 4. 目录结构

```text
.github/workflows/deploy.yml        GitHub Pages 自动发布工作流
astro.config.mjs                    Astro 配置，site 固定为 https://starrydome.top
public/CNAME                        GitHub Pages 自定义域名
public/starfall/                    逐星记和照片墙图片
public/article-media/               文章内图片资源
src/content/posts/                  Markdown 文章正文
src/content.config.ts               Astro Content Collection schema
src/data/site.ts                    站点标题、导航、slogan
src/data/starfallLog.ts             逐星记时间线数据
src/data/photos.ts                  照片墙数据
src/data/collections.ts             收藏馆数据
src/layouts/BaseLayout.astro        全站基础布局
src/pages/                          页面路由
src/styles/global.css               全局视觉样式
```

## 5. 内容模型

### 5.1 文章

文章 Markdown 放在：

```text
src/content/posts/
```

每篇文章必须有 frontmatter：

```yaml
---
title: 文章标题
date: 2026-01-01
category: 技术札记
tags:
  - tag1
sourceDoc: https://example.com
slug: article-slug
---
```

约束来自 `src/content.config.ts`：

- `category` 只能是 `技术札记`、`生活切片`、`拾光摘录`
- `sourceDoc` 必须是合法 URL
- `slug` 决定最终访问路径：`/posts/<slug>/`

新增文章步骤：

1. 在 `src/content/posts/` 新增 Markdown。
2. frontmatter 填完整，尤其是 `slug`。
3. 如果文章有图片，把图片放到 `public/article-media/<slug>/`。
4. Markdown 中用绝对路径引用图片，例如：`/article-media/<slug>/image-1.png`。
5. 执行 `pnpm run build`，确认文章页与 `/posts/` 正常生成。

### 5.2 逐星记

时间线数据在：

```text
src/data/starfallLog.ts
```

每个节点可配置：

- `year`：显示在时间线上的年份或事件标题
- `theme`：`winter`、`summer`、`steel`、`dark`
- `photos`：图片路径数组，通常来自 `/starfall/`
- `title` / `subtitle` / `whisper` / `footnote`：页面文案
- `articleUrl`：可选，关联到文章页

如果新增图片，放到：

```text
public/starfall/
```

### 5.3 收藏馆与照片墙

- 收藏馆：`src/data/collections.ts`
- 照片墙：`src/data/photos.ts`

这两个页面目前是静态数据，不接数据库或外部 API。新增条目只需要改对应 TS 数据文件。

## 6. 页面与路由

当前主要路由：

| 路由 | 文件 | 说明 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 首页 |
| `/about/` | `src/pages/about.astro` | 关于页 |
| `/starfall-log/` | `src/pages/starfall-log.astro` | 逐星记 |
| `/posts/` | `src/pages/posts/index.astro` | 文章列表 |
| `/posts/<slug>/` | `src/pages/posts/[slug].astro` | Markdown 文章详情 |
| `/collections/` | `src/pages/collections.astro` | 收藏馆 |
| `/photos/` | `src/pages/photos.astro` | 照片墙 |

另外有两个手写 Astro 文章页：

- `src/pages/posts/2015-xichong-five-planets.astro`
- `src/pages/posts/2016-chaozhou-phoenix-mountain-perseids.astro`

不要误删这两个文件，它们不是由 Markdown collection 自动生成的。

## 7. 发布流程

发布由 GitHub Actions 完成：

```text
.github/workflows/deploy.yml
```

工作流规则：

- 触发条件：push 到 `master` 或手动 `workflow_dispatch`
- 构建工具：`withastro/action@v3`
- Node 版本：`24`
- 发布动作：`actions/deploy-pages@v4`

标准发布步骤：

```bash
git status
pnpm run build
git add <changed-files>
git commit -m "简短中文提交信息"
git push origin master
```

推送后检查：

```bash
gh run list --repo IsilAlphare/isilalphare.github.io --limit 5
gh api repos/IsilAlphare/isilalphare.github.io/pages --jq '.status, .cname, .html_url, .build_type, .https_enforced'
```

期望值：

- `status` 为 `built`
- `cname` 为 `starrydome.top`
- `html_url` 为 `https://starrydome.top/`
- `build_type` 为 `workflow`
- `https_enforced` 为 `true`

## 8. 回滚方案

旧 Hexo 站已备份在远端分支：

```bash
backup/old-hexo-20260918-173513
```

如果必须回滚到旧站：

```bash
git fetch origin backup/old-hexo-20260918-173513
git checkout master
git reset --hard origin/backup/old-hexo-20260918-173513
git push origin master --force-with-lease
```

这是高风险操作。执行前必须确认用户真的要把线上站点回滚到旧 Hexo 版本。

如果只是回滚最近一次普通改动，优先使用：

```bash
git revert <commit-sha>
git push origin master
```

## 9. 维护注意事项

- 不要删除 `public/CNAME`，否则自定义域名可能失效。
- 不要把 `dist/`、`node_modules/`、`.astro/` 提交到仓库。
- 不要把旧 Hexo 路由当成当前路由；新站文章统一走 `/posts/<slug>/`。
- 如果需要兼容旧链接，应新增重定向方案，而不是恢复旧目录结构。
- 新增文章后，优先验证 `/posts/` 列表与文章详情页。
- 图片引用尽量使用从站点根开始的绝对路径，如 `/article-media/...`。
- 修改全局视觉时重点看 `BaseLayout.astro` 和 `global.css`，避免只改单页导致风格不一致。
- GitHub Actions 线上构建使用 Node 24，本地也应使用 Node 24。

## 10. Agent 接手检查清单

接手后先执行：

```bash
cd /Users/bytedance/Projects/starry-dome
git status --short --branch
git pull --ff-only origin master
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24
pnpm install --frozen-lockfile
pnpm run build
```

确认：

- 工作区干净，或清楚知道未提交改动来自哪里。
- 构建通过。
- 目标改动只涉及必要文件。
- 发布前已说明是否会影响线上 `starrydome.top`。

## 11. 下一步可迭代方向

优先级较高的后续任务：

1. 为旧 Hexo 链接增加重定向，避免历史分享链接失效。
2. 把 `sourceDoc` 从必填改成可选，方便写原创本地文章。
3. 补齐更多逐星记事件的图片和详情文章。
4. 为收藏馆接入更结构化的数据源。
5. 给项目补一个面向普通访问者的 `README.md`。

# 星间来信预览 Implementation Plan

**Goal:** 全站星星、公共留言簿与详情页底部评论的本地预览。
**Architecture:** BaseLayout 统一挂载开发态组件，根据文章/游记详情路径选择留言目的地。LetterBoard 共用信笺展示和本地表单；按路径隔离数据。
**Tech Stack:** Astro、TypeScript、CSS、localStorage。

## Constraints
- 不提交、不推送、不接外部服务。示例留言与 128 颗流星明确标记为示例。
- 保留现有立体星星、拖动、短暂反馈、减少动态设置。
- 文章包括 Markdown 与两个手写页面；目录页不挂载评论。

## Steps
- [x] BaseLayout 挂载 StarlightVisit，移除首页重复实例；详情页挂载 LetterBoard。
- [x] 增加 guestbook 页面和页脚入口，设计信笺、附言和本地留言输入。
- [x] 星星根据当前页跳转到底部并聚焦，其他页面保留写信面板及留言簿链接。
- [x] 路径独立存储，安全文本渲染、存储异常反馈、公共信笺兼容旧原型留言。
- [x] 构建与浏览器验证：跨页常驻、平滑滚动及焦点、信笺保存恢复、窄屏排版。

# Waline 接入 Implementation Plan

**Goal:** Vercel + Neon 托管真实评论与全站星光，保留信纸风格。
**Architecture:** 官方客户端负责登录、分页、回复、管理；弹窗用官方 API 发布公共来信。星光使用固定路径 reaction0。PUBLIC_WALINE_SERVER_URL 有值才启用真实模式。
**Constraints:** 不发布博客；不迁移本地测试留言；不向前端暴露数据库凭据；服务条款、账号密码由用户操作。
- [x] 安装客户端/API，保持 Astro 原版本。
- [x] 实现正式评论、弹窗发信、失败反馈、成功后点亮与真实计数。
- [x] 配置独立 Vercel 服务与 Neon，验证真实列表和计数读取。
- [x] 用户建立首个管理员，后台核实 IsilAlphare 角色及管理入口。
- [x] 模拟 API 下验证路径隔离、发信/回复、计数；真实服务读取、构建及部署信息已验证。
- [x] 用户已寄出第一封真实来信并以 IsilAlphare 回复；浏览器确认回复嵌套显示，星光为 1。
- [ ] 发布后使用网站现有 logo 作为站长头像（用户已确定，暂缓处理）。

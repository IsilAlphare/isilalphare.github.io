# Waline 评论服务

## 当前状态
Vercel 团队 isil-alphare 已创建 starry-dome-comments，服务地址 https://starry-dome-comments.vercel.app。Neon Free 数据库 neon-cyan-pillar（tiny-scene-16323211）已绑定 Production/Preview，wl_comment、wl_counter、wl_users 三表已创建。部署 9AgpQpeRDoV2h9diVokDfVbAc3V6 已正常运行，jsdom 间接依赖 ERR_REQUIRE_ESM 通过固定 26.1.0 修复。带允许来源的评论列表请求 HTTP 200 / errno 0；本地浏览器真实留言区加载正常，星光读取为 0。首个账号 IsilAlphare 已由用户完成注册；已在管理用户页面核实角色为“管理员”，评论管理/用户管理/导入导出可访问。真实评论写入、回复及删除操作尚未实测（公开区保持空白）。博客尚未发布。

## 独立服务
部署目录：services/waline（不要将博客根目录作为 Waline 部署目录）。
Node 24；固定 @waline/vercel 1.41.6。不要使用评论服务部署覆盖 GitHub Pages 博客。
通过 npm overrides 固定 jsdom 26.1.0，并保留 package-lock.json，规避 Vercel 中 CommonJS 加载 ESM 依赖失败的问题。上游说明：https://github.com/jsdom/jsdom/releases/tag/27.0.1 。后续升级应重新验证运行时兼容性。
依赖审计仍报告 Waline 自带 CloudBase、LeanCloud、request 等间接依赖的漏洞；当前采用 PostgreSQL，未启用这些存储适配器。不能直接运行 npm audit fix --force（其建议会将 Waline 降至旧版本），后续随上游升级复查。
Neon 新建空数据库后，在 SQL Editor 一次性运行该目录的 waline.pgsql（官方来源 https://github.com/walinejs/waline/blob/main/assets/waline.pgsql）。
此脚本会创建表，仅用于新数据库，不在已有数据库上重复执行。

Vercel 环境变量：
- PG_HOST / PG_DB / PG_USER / PG_PASSWORD：来自 Neon，凭据仅在服务端保存。
- PG_PORT=5432
- PG_SSL=true
- SITE_NAME=Starry Dome 星空穹庐
- SITE_URL=https://starrydome.top
- DISABLE_USERAGENT=true
- DISABLE_REGION=true
- AUTHOR_EMAIL：邮件通知启用时再配置；管理员身份已通过首个注册账号建立。
- JWT_TOKEN：可选独立会话密钥，目前未额外设置；沿用 Waline PostgreSQL 默认配置。
- COMMENT_AUDIT=false：初版直接展示；可改为 true 后审核。
- 可暂设 DISABLE_AUTHOR_NOTIFY=true；SMTP 未配置时不承诺邮件通知。

服务部署成功后，由用户立即访问 <服务地址>/ui/register 注册首个管理员。密码由用户输入。完成前不发布前台。
管理入口：<服务地址>/ui。登录前台可回复，后台可编辑、标记、删除。

## 博客配置
本地 .env.local 已配置 PUBLIC_WALINE_SERVER_URL=https://starry-dome-comments.vercel.app
GitHub 仓库 Actions variable 同名 PUBLIC_WALINE_SERVER_URL 已设置为上述地址并读回确认；workflow 已引用。该配置不会触发部署。
该变量只包含公开服务 URL；任何 PG_PASSWORD、JWT_TOKEN 都不能以 PUBLIC_ 开头或放进博客构建。

配置服务地址：正式模式，真实留言、后台管理入口，无示例数据。
未配置地址：开发环境保留原型；生产不展示原型。
前端不自动上传旧 localStorage 来信；旧内容保留在浏览器。

## 数据路径
公共来信：/guestbook/。
文章与游记：规范化为带结尾 / 的 pathname，忽略 query/hash。
全站星光：/__starlight__/ 的 reaction0，表示互动次数，不是独立访客人数。
本地标记仅作同一浏览器去重，不是账号认证；清理浏览器数据或换设备可能重复。
默认 API 计数并非防刷账本，不能用于奖品或权益。

## 联调验收
1. 首个管理员已注册，确认管理页可登录。
2. 游客发信成功后才展示成功提示；失败保留输入。
3. 文章、游记、公共留言互不串页；回复出现在对应信件下。
4. 站长登录回复与后台管理验证。
5. 星光请求成功后点亮，失败可见提示；刷新不会自动新增计数。
6. 移动端与减少动画设置检查。
7. 构建通过后，博客提交/发布仍须用户另行授权。


## 已完成的本机验证
- @waline/client 3.15.2、@waline/api 1.1.2；固定 Astro 7.1.6 和 sitemap 3.7.3，避免安装依赖时附带框架升级。
- 无配置与有配置两种生产构建均通过。3 个路径、正文与计数校验测试通过。
- 使用 127.0.0.1:8790 的临时内存 API 在 4322 验证官方客户端发信、回复、印记、弹窗成功/失败、星光递增和文章焦点/路径隔离；不代表云端已连通。
- Vercel 与 Neon 读取已连通；配置真实服务后的生产构建通过（62 页），3 项校验测试通过。公开页面未写入测试来信。
- 首个管理员注册及后台访问已验证；SMTP 未配置，真实评论写入、回复及删除操作尚未实测。

## 匿名头像兼容修复（2026-09-22）
- Waline 1.41.6 默认头像模板对缺失或 null 邮箱调用 trim，引发 Nunjucks `replace` 错误；写入完成后格式化响应失败，且列表读取受影响。
- 通过 avatarUrl 官方配置回调（services/waline/avatar.cjs）兼容空邮箱，同时保留邮箱哈希与 QQ 头像行为，不要求游客提供邮箱。
- 6 项本地测试通过；直接调用 Waline avatar service 验证 undefined/null/空字符串通过。部署后 guestbook API errno 0、count 1，浏览器确认用户第一封真实来信恢复显示，真实星光计数为 1。未重复发信或删除数据。

## 后续约定
- 用户已实际发送公共来信，并以管理员账号回复；浏览器确认嵌套显示。删除操作尚未执行验证。
- 站长头像确定使用网站现有 logo；等博客发布后再准备稳定的图片直链并配置，当前暂缓。

## Gmail 通知配置进度（2026-09-22）
用户指定 shawyu2001@gmail.com。已配置 Production 环境变量 SMTP_HOST=smtp.gmail.com、SMTP_PORT=465、SMTP_SECURE=true、SMTP_USER、AUTHOR_EMAIL、SENDER_NAME。SMTP_PASS 等待用户在 Vercel 直接设置为 Secret（Gmail 应用专用密码）。DISABLE_AUTHOR_NOTIFY 仍为 true；待凭据就绪后改为 false、重新部署并验证邮件实际送达。不要把密码写进本文件或代码。

## 通知验证及日志处理（2026-09-22）
- 用户已在 Production 添加 SMTP_PASS。DISABLE_AUTHOR_NOTIFY 改为空字符串（该版本直接判断字符串真假，不能写 false）。通知服务已重新部署。
- 独立路径 /__notification_check__/ 的测试记录 id 4 触发邮件；Gmail 返回 250 2.0.0 OK，rejected 为空，用户已确认邮箱收到测试邮件。该记录不在文章或 guestbook 列表中，未删除。
- 调试日志发现 SQL 适配器会输出数据库连接串；index.cjs 将 think logger 级别设为 warn，修复部署 7Bz5NeNzyscZUUfJgGeWbYVs8BPw。旧日志曾包含凭据；用户于 17:01:12 在 Vercel Rotate Secrets 完成轮换，旧凭据失效。随后重新部署关闭日志输出的版本，部署 5S9rVDd5kBMZZsaxbwq1reGBMHGM 于 17:04 Ready。不要记录任何新旧密码。

- 轮换后线上 guestbook 实际验证：星光计数 2，已有 2 条留言（含回复）正常显示，未额外写入测试数据。

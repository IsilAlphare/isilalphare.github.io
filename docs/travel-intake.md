# 游记素材收集试点

2026-09-21，经用户同意建立，先试一篇旅行朋友圈。

- Base：Starry Dome · 游记素材
- Base URL：https://bytedance.larkoffice.com/base/O33zbXeRSaUzexsNmvVcUIqDnJg
- Base token：O33zbXeRSaUzexsNmvVcUIqDnJg
- 表：旅行朋友圈，tbl1Wh9It69YCSni
- 表单：收下一段旅途，vewsl49Eq1
- 填写入口：https://bytedance.larkoffice.com/share/base/form/shrcnyzFkGX9tw1jfrG3a3EZqjc

## 字段

| 字段 | ID | 类型 |
| --- | --- | --- |
| 旅行名称 | fld5tcSWEY | 文本，表单必填 |
| 旅行日期 | fld0QK7I9f | 日期 |
| 地点 | fldFF4xvfE | 文本 |
| 朋友圈原文 | fld5qNLLxY | 文本，表单必填 |
| 照片 | fldp8enhxD | 附件 |
| 补充说明 | fldVkWL9U1 | 文本 |
| 状态 | fldUtjQvt0 | 草稿 / 待整理 / 可公开，默认草稿 |

一条朋友圈一条记录；同一次旅行用相同旅行名称。照片顺序与封面可在补充说明中指定。尚未实现自动同步或发布。用户提交样本后，读取其指定的记录和附件，制作本地游记预览；未经用户授权不得提交、推送或发布。

当前机器 CLI 路径：/Users/bytedance/.nvm/versions/node/v20.20.2/bin/lark-cli。使用用户身份；系统钥匙串需要沙箱外访问，不降级钥匙串安全设置。

## 首篇试点

- 记录：rec28eayLmSoD5，2026早秋·径山古道徒步，2026-09-06。
- 本地数据：src/data/travel/jingshan.json；图片：src/assets/travel/jingshan/。
- 9 张附件按表中顺序编号，前 4 张为长拼图；第 5 张单幅照片作预览封面。
- 原文完整保留；拼图未拆分，图片仅校正方向、缩放、转 WebP，原件留在 /tmp/starry-travel-jingshan。
- 预览路由：/preview/travel/2026-jingshan/。开发模式可用；生产构建仅 TRAVEL_PREVIEW=1 时生成，默认不生成草稿路径，且不进入 sitemap，页面 noindex。
- 用户仍保留草稿状态。尚无自动同步；本次为手动读取样本制作预览。

## 第二篇试点

- 记录 rec28eaJJktlHI：2026暑期·青甘大环线，2026-07-11，七彩丹霞。
- 6 张 JPEG，宽均为 1440px，直接保留上传版本，不二次压缩；照片中的白边和文字均保留。
- 数据 src/data/travel/danxia.json；预览 /preview/travel/2026-danxia/。
- 表中状态为空，本地按草稿处理，未修改源表状态。

## 首批整理（2026-09-21）

- 本次读取全部 13 条记录，新整理 11 条，共 110 张照片/拼图附件；源表状态保持不变，全部作为本地草稿。
- 新内容包括翡翠湖、西宁、敦煌、莫卧儿艺术特展、海洋光谱号落日与告别、釜山、南京春日三篇、九寨沟。
- 目录 `/preview/travel/` 按旅行名称分为 6 组，每条朋友圈独立成篇，组内日期倒序。
- `src/data/travel.ts` 自动收集 `src/data/travel/*.json`，详情模板统一为 `src/pages/preview/travel/[slug].astro`；新增条目不再逐个修改路由。
- 新附件原样保存 JPEG，另生成缩略图用于目录与长卷列表；保留附件编号、原文件名、尺寸与原文。封面前置，单图和拼图各自保持源顺序。
- 长文按原文空行分段，长拼图点击后完整展开。未生成游记正文、未重写朋友圈。
- 普通生产构建不生成预览目录和详情；本地预览构建使用 `TRAVEL_PREVIEW=1 pnpm run build`。
- 后续继续使用 PC 端收集表单，一条朋友圈一条记录；用户告知一批上传完成后再手动同步，不自动发布。


## 转为正式内容（2026-09-21）

用户已确认将当前 13 篇转为正式内容，替换原照片墙，包括顶部导航和首页入口。

- 正式目录 `/travel/`，详情 `/travel/<slug>/`；普通构建直接生成，移除草稿标识与 noindex，加入 sitemap。
- 已确认的 13 条本地记录状态为 `published`；`src/data/travel.ts` 仅导出已发布记录，后续未确认的新记录仍应使用 `draft`。源表状态未修改，本地确认结果以 JSON 为准。
- 旧 `/photos/`、`/preview/travel/` 和已有详情预览地址重定向到正式路径。静态托管通过 Astro 生成的跳转页面实现。
- 首页使用四组旅行的最新一篇作为入口，替换占位照片。旧 `src/data/photos.ts` 保留但已无页面引用。
- 本节取代前述草稿构建说明。尚无自动同步，亦未执行 Git 提交、推送或线上部署。

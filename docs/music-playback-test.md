# 夜航歌单播放核验

核验日期：2026-09-22。当前播放器为本地改动，尚未发布。

## 结果

现有 87 首不同曲目：32 首开放站内播放，53 首没有获得匿名完整音源，2 首录音版本未确认。不能播放或未确认的歌曲均为普通文字，没有按钮或外跳链接。

曲目决策保存在 `src/data/musicPlayback.json`，按歌名与完整艺人署名匹配。`music.ts` 继续管理策展内容。以后新增曲目默认不可点击，完成核验后再加入可播放清单。

## 核验方法与边界

1. 使用网易云公开搜索返回的信息核对歌名、合作艺人、专辑和歌曲 ID；没有用用户账号或 Cookie。
2. 匿名音源接口必须提供完整时长、没有试听区间，并允许公开播放。fee=8 表示此检查中仍可匿名收听，不能仅凭该字段当成会员限制。
3. 两次读取公开外链解析入口、一次读取 HTTPS 音源；要求成功状态和 audio MIME，只请求字节范围 0-0，不保存音频。
4. 32 首均通过本地页面中的真实按钮启动，浏览器收到 playing、无媒体错误，时长与记录一致；并非逐首完整听完。
5. 已验证暂停、切换、关闭、重复曲目状态同步，以及 390px、320px 窄屏布局。尚未做手机真机与上线 HTTPS 页的实播验收。

这是当日当前网络下的可用性，不是网易云的稳定性承诺。音源可能随版权、地区、网络或接口规则变化。播放失败会提示并停用当前会话里的对应按钮；页面不会每次加载都探测 87 首，以免拖慢访问和触发限流。

播放器使用浏览器原生 audio 控件，仅点击后读取外部音频。播放地址使用 `https://music.163.com/song/media/outer/url?id=<ID>.mp3`，不保存有时效的 CDN URL，不代理会员歌曲，不转存音乐。站内链接切换通过 Astro ClientRouter 保留同一个播放器，播放进度与暂停状态持续；刷新、新标签页及手动关闭后不自动恢复。页面脚本使用 pageLifecycle 在每次切换时释放监听与观察器并重新初始化，评论区按新页面路径挂载。

官方 outchain 页面此前被浏览器安全策略阻止，没有嵌入或继续使用该方案。

## 版本处理

- `Le Temps Des Cathedrales` 的 Gringoire 是角色名，对应 Bruno Pelletier 原版录音。
- `Color Your Night` 匹配原声带的日文 ATLUS 署名，当前不可播放。
- `逃离派对` 的 LeeyOn李昂 对应 李昂LeeOn，与 Kc 合作版本已通过检查。
- `Judas (Album Version)` 匹配 Born This Way 专辑中的 Judas，当前不可播放。
- `Судно (Борис Рижий)` 未找到符合 Molchat Doma 署名的录音，不以翻唱替代。
- `桃克希克的爱part2` 搜索结果合作艺人为帕特龙，与现有收藏记录中的月蚀不一致，暂不替换。

## 可播放曲目

| 曲目 | 收藏署名 | 网易云 ID |
| --- | --- | --- |
| House Of Balloons / Glass Table Girls | The Weeknd | 25888679 |
| ワンダー | r-906 / 初音ミク | 3406178212 |
| 天涯 | 洛天依Official / 雄之助 | 3430462843 |
| あなぐらぐらし | きくお / 初音ミク | 1408586589 |
| ニューダーリン | MARETU / 初音ミク | 1924765417 |
| 1/6 -out of the gravity- | ぼーかりおどP / 初音ミク | 28382729 |
| 窓のないアトリエにて | ユリイ・カノン / GUMI | 1335373477 |
| ももいろの鍵 | いよわ / 初音ミク | 2129098351 |
| Tatoue-Moi | Mikelangelo Loconte | 5041146 |
| Le bien qui fait mal | Melissa Mars / Solal / Maéva Méline / Florent Mothe / Mikelangelo Loconte | 5041381 |
| Le Temps Des Cathedrales | Gringoire (Bruno Pelletier) | 5055024 |
| Wenn ich tanzen will | Pia Douwes / Uwe Kröger | 5053637 |
| Die Schatten werden laenger | Uwe Kröger / Jesper Tydén | 5053641 |
| Katarsis | She Past Away | 33408643 |
| DATURA [paroxysm] | Crywolf | 1990931605 |
| Departures ~あなたにおくるアイの歌~ | EGOIST | 31649312 |
| Theme of Laura | 山岡晃 | 18861460 |
| 镜花水月 | 法老 / 龙崎 / Lil Jet / 泠风 | 1969845257 |
| Free-Out 2019 cypher | Free-Out / 高天佐Trouble.Z / Round_2 / BigYear大年 / Lil Howcy / Ice Paper / Mc光光 / Kc / BustaZun | 1408761974 |
| 幻想即兴曲 | Frédéric François Chopin | 25830133 |
| 月光奏鸣曲 | Ludwig van Beethoven | 5276808 |
| The Sun Also Rises | 久石譲 | 441722 |
| 宗教 | 椎名林檎 | 28718958 |
| マインドブランド | MARETU / 初音ミク | 407485173 |
| うみなおし | MARETU / 初音ミク | 1408587103 |
| あいしていたのに | MARETU / 初音ミク | 2069361759 |
| だれかの心臓になれたなら | ユリイ・カノン / GUMI | 1335373478 |
| スーサイドパレヱド | ユリイ・カノン / GUMI | 1335362744 |
| おどりゃんせ | ユリイ・カノン / GUMI / 初音ミク | 1335373476 |
| 逃离派对 | LeeyOn李昂 / Kc | 1848273131 |
| 雨季 | 法老 / 张尕怂 | 1969845255 |
| 无名之辈 | 法老 / 泠风 | 1965646815 |

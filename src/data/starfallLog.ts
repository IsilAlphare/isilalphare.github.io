export type StarfallTheme = 'winter' | 'summer' | 'steel' | 'dark';

export interface StarfallNode {
  year: string;
  theme: StarfallTheme;
  photos: string[];
  illustration: 'planets' | 'dandelions' | 'galaxy' | 'meteor' | 'window' | 'dam' | 'forest' | 'road' | 'sea';
  title: string;
  subtitle?: string;
  whisper?: string;
  footnote?: string;
  articleTitle?: string;
  articleUrl?: string;
}

export const starfallNodes: StarfallNode[] = [
  {
    year: '2015 深圳西涌 · 五星连珠',
    theme: 'winter',
    photos: ['/starfall/starry-dome-painting.png'],
    illustration: 'planets',
    title: '2015 深圳西涌 · 五星连珠',
    subtitle: '2015 的元旦,一群孩子在大陆的最南边烧起紫色的火——这就是我的第一次出野。',
    articleUrl: '/posts/2015-xichong-five-planets/',
    whisper: '黎明时,水星伴着太阳从海上升起;许多人一生未曾见它,而我十三岁就见了。',
  },
  {
    year: '2016 太原 · 奥赛之夜与三朵蒲公英',
    theme: 'winter',
    photos: ['/starfall/snow-mountain-milky-way.png'],
    illustration: 'dandelions',
    title: '2016 太原 · 奥赛之夜与三朵蒲公英',
    subtitle: '第一次也是最后一次天奥决赛,我见到了那个把星空领进我少年时代的人。',
    whisper: '一群少年彻夜畅谈,又各奔东西——草坪上的三朵蒲公英,被命运吹向了不可知的四方。',
  },
  {
    year: '2016 云南 · 云汉初见',
    theme: 'summer',
    photos: ['/starfall/summer-milky-way-arc.png'],
    illustration: 'galaxy',
    title: '2016 云南 · 云汉初见',
    subtitle: '从昆明的 1 米镜,到高美古 3500m 的星台,天文科研并非想象中浪漫。',
    whisper: '泸沽湖停电的夜晚,我在高烧的朦胧中第一次看见银河——那一刻,我忽然懂了古人为何称它「云汉」。',
  },
  {
    year: '2016 潮州凤凰山 · 云顶的英仙雨',
    theme: 'summer',
    photos: [],
    illustration: 'meteor',
    title: '2016 潮州凤凰山 · 云顶的英仙雨',
    subtitle: '十四岁,我在山顶数尽五十颗流星,直到猎户与天狼从黎明里升起。',
    articleUrl: '/posts/2016-chaozhou-phoenix-mountain-perseids/',
    whisper: '那夜我先睡去,又被欢呼唤醒——云雾散尽,众星如初生之火,一群微小的太阳。',
  },
  {
    year: '2019–2022 大学',
    theme: 'dark',
    photos: [],
    illustration: 'window',
    title: '2019–2022 大学',
    subtitle: '',
    whisper: '在灰白的钢筋水泥里,星空之梦被压进心底最深的玻璃罐。我做过两年天文社社长,办过几场路边天文;可头颅仍被疫情与考研捆着,再没能抬起。',
  },
  {
    year: '2023 三峡 · 灰白山脉',
    theme: 'steel',
    photos: [],
    illustration: 'dam',
    title: '2023 三峡 · 灰白山脉',
    subtitle: '那年我尚未考上研究生,前路一片未知。站在 185 米的坝顶,奔腾无情的巨兽卧成一汪平静的湖水;那一刻我懂了,什么叫「人定胜天」。',
    whisper: '巨大的人字闸门在我眼前缓缓开启,像霍比特人第一次乘船驶向西方。我颤栗着明白:这座山不是天生的,是人,一寸一寸把它筑了起来。\n*——是谁,敢这样去想。*',
  },
  {
    year: '2024 盱眙铁山寺 · 冬夜归来',
    theme: 'winter',
    photos: [],
    illustration: 'forest',
    title: '2024 盱眙铁山寺 · 冬夜归来',
    subtitle: '时隔多年的重新出野,我以另一种方式,回到了少年的梦里。',
    whisper: '我像一个缅怀往事的幽灵,裹着滑稽的银色保温毯,坐在比自己年轻许多的人中间,第一次瞻仰那片黯淡的冬季银河,听到了那些星星古老的名字。',
    footnote: '南大天文曾是我遥远的梦。我终究没能成为天文学家,只做了一个爱好者;可当我坐进它的星空下,我知道,这已是三生有幸。',
  },
  {
    year: '2025 黄山歙县 · 自己开往的星空',
    theme: 'summer',
    photos: ['/starfall/huangshan-milky-way.png'],
    illustration: 'road',
    title: '2025 黄山歙县 · 自己开往的星空',
    subtitle: '拿到驾照的第一次远行,我来到歙县的深山中看银河;从此,我能靠自己,去往任何一片想去的星空。',
    whisper: '银河像一条清浅的溪流,从天顶流泻而下;我用第一个月工资买的手机笨拙地将它留下。那一夜我很自在——原来,成为大人也没什么不好。',
  },
  {
    year: '2026 盐城东台 · 海边的最后一课',
    theme: 'summer',
    photos: [],
    illustration: 'sea',
    title: '2026 盐城东台 · 海边的最后一课',
    subtitle: '14岁,大陆最南的海边,一群孩子烧着紫火等日出;24岁,黄海之滨的滩涂,年轻人弹起吉他、喝酒畅谈,我站在一旁只是微笑。',
    whisper: '比星空更吸引 14 岁的我的,其实是相聚、是畅谈、是一起做很酷的事;十年后那份激情消退了,我庆幸自己还站在这里;时间将我的热爱冲刷,只留下最纯粹的那些。',
  },
];

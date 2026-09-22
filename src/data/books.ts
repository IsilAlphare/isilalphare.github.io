export const bookThemes = [
  { id: 'cosmos', title: '宇宙、文明与未知', description: '走向陌生的星空，也看见文明的野心、局限与好奇。' },
  { id: 'self', title: '漂泊、自由与自我', description: '在自然、艺术与远行之间，寻找与世界相处的方式。' },
  { id: 'time', title: '时间、孤独与爱', description: '平静的文字深处，时间与情感缓缓回响。' },
  { id: 'web', title: '玄幻与网络小说', description: '跟随人物走进漫长的冒险，记住那些鲜活的身影与羁绊。' },
  { id: 'myth', title: '神话与宗教', description: '从古老传说到虚构史诗，读信仰、神性与命运的交织。' },
  { id: 'society', title: '社会、历史与人的处境', description: '在历史与想象的社会中，追问权力、技术与人的自由。' },
] as const;

type Book = {
  id: string;
  title: string;
  author: string;
  theme: typeof bookThemes[number]['id'] | 'aside';
  source: string;
  series?: boolean;
  relatedSources?: string[];
  note?: { date: string; rating?: number; paragraphs?: string[]; postSlug?: string; excerpt?: string };
};

// 主题文案为阅读记录的归纳；札记保留原文。日期为记录日，不推断阅读完成日。
// 用户于 2026-09-20 确认网文及沙丘全系列已读；系列合并展示，保留原卷册来源用于核对。
export const books: Book[] = [
  { id: 'moon', title: '月亮与六便士', author: '威廉·萨默赛特·毛姆', theme: 'self', source: '/posts/moon-and-sixpence/', note: { date: '2020-05-10', postSlug: 'moon-and-sixpence', excerpt: '以上两点总结起来就是：他们都拥有不被世俗情感所控制的自我。' } },
  { id: 'foundation', title: '银河帝国6：基地边缘', author: '艾萨克·阿西莫夫', theme: 'cosmos', source: 'https://book.douban.com/review/12210993/', note: { date: '2020-02-03', postSlug: 'foundations-edge', excerpt: '这大概就是科幻所具有的宇宙感吧，但其中必须夹杂着一点文明带来的若隐若现的烟火气，这使它更加危险动人。' } },
  { id: 'peter', title: '彼得·卡门青', author: '赫尔曼·黑塞', theme: 'self', source: 'https://www.douban.com/people/202987200/status/3544945501/', note: { date: '2021-08-09', rating: 5, paragraphs: [
    '读附录，发现写这部作品时黑塞年仅26岁的时候简直不敢相信。每一次读黑塞的作品，都跟自己过了半生一样，陷入平静而暗流汹涌的沉思中。',
    '黑塞的文字是大地之歌，总带着行吟诗人一般的忧伤与深沉，带着永远在流浪的爱和无法停歇的脚步。每一次读黑塞，灵魂都会从浮华社会中沉落大地，想起那些静止之物的美好……山川，湖泊，星辰，森林，想起那些风土人情给人的安心感。人与自然的纠缠挣扎，心在山水与人群中的浮沉漂泊，无论是《流浪者之歌》，《悉达多》，还是刚刚读完的《彼得·卡门青》，甚至是毛姆的《刀锋》，《月亮与六便士》，都是如此共鸣着，引得人心颤抖，如同水中月影。',
  ] } },
  { id: 'sand', title: '沙之书', author: '豪·路·博尔赫斯', theme: 'time', source: 'https://www.douban.com/people/202987200/statuses?p=2', note: { date: '2020-10-24', rating: 5, paragraphs: ['以“沙之书”来喻博尔赫斯的短篇小说再合适不过了。阅读时，如观无波的大海，极为宁静却为那看不见而感受得到的深邃而战栗。没有一处字句是多余的：娓娓道来之中，凝结着地老天荒的时间。如果时间在更高的维度中会像晶体一样生长，我想我看到了，也触摸到了它那美妙的花纹，就在博尔赫斯寓言一般美丽平静而不晦涩的故事中。（这一点，我认为是比大多数日系的作家更打动我的特质）'] } },
  { id: 'love', title: '爱情和其他魔鬼', author: '加西亚·马尔克斯', theme: 'time', source: 'https://www.douban.com/people/202987200/statuses?p=2', note: { date: '2020-12-30', rating: 5, paragraphs: ['因为太过于悲伤而迟迟不敢回忆的书。', '上一本带给我同等悲伤的大概是《海的女儿了》。马尔克斯的文字中那种极端平淡下极端强烈的孤独与痛苦随着篇章累积，附骨蛆髓，给人以内心最深处的共振。'] } },
  { id: 'dune', title: '沙丘', series: true, relatedSources: ['https://www.douban.com/people/202987200/status/3466047466/'], author: '弗兰克·赫伯特', theme: 'myth', source: 'https://www.douban.com/people/202987200/statuses?p=2', note: { date: '2021-05-06', rating: 5, paragraphs: ['浓郁的伊斯兰风格，使其笼罩了悲剧般的宿命感和宗教感。与《光明王》的佛教哲学异味，《银河帝国》的宏伟曲折不同，是一本宗教史诗般的科幻作品，围绕那黄沙蔓延的星球所展开的宇宙，真正地从另一种环境中重塑了一个种族的生命力。'] } },
  { id: 'mysteries', title: '诡秘之主', series: true, author: '爱潜水的乌贼', theme: 'web', source: 'https://www.douban.com/people/202987200/status/3831574891/', note: { date: '2022-04-12', rating: 5, paragraphs: ['人性与神性的角逐中，身影在神秘中走向孤独。', '以后会购买全套实体书以示尊敬'] } },
  { id: 'earthlight', title: '地光', author: '阿瑟·克拉克', theme: 'cosmos', source: 'https://www.douban.com/people/202987200/status/3808840158/', note: { date: '2022-03-24', rating: 4, paragraphs: ['阿瑟克拉克的宇宙大战是我见过最摄人心魄的……看到那一段时，宇宙间的声音似乎都消失了，仿佛置身于真空，前方就是因为急速升温不断变换色彩的月球堡垒，死神在炫目的光辉中无声地降临于巨大的星舰。'] } },
  { id: 'gods', title: '神们自己', author: '艾萨克·阿西莫夫', theme: 'cosmos', source: 'https://www.douban.com/people/202987200/status/3050937616/' },
  { id: 'norse', title: '北欧众神', author: '尼尔·盖曼', theme: 'myth', source: 'https://www.douban.com/people/202987200/statuses?p=2' },
  { id: 'embers', title: '长夜余火', series: true, author: '爱潜水的乌贼', theme: 'web', source: 'https://www.douban.com/people/202987200/status/4250029359/' },
  { id: 'house', title: '我有一座冒险屋', series: true, author: '我会修空调', theme: 'web', source: 'https://www.douban.com/people/202987200/status/4250031486/' },
  { id: 'brave', title: '美妙的新世界', author: '阿道斯·赫胥黎', theme: 'society', source: 'https://www.douban.com/people/202987200/statuses?p=2' },
  { id: 'neuromancer', title: '神经漫游者', author: '威廉·吉布森', theme: 'society', source: 'https://www.douban.com/people/202987200/status/3135450606/' },
  { id: 'rome', title: '罗马人的故事3', author: '盐野七生', theme: 'society', source: 'https://www.douban.com/people/202987200/status/3139772427/' },
  { id: 'feynman', title: '别逗了，费曼先生', author: 'R·P·费曼、R·莱顿', theme: 'aside', source: 'https://www.douban.com/people/202987200/statuses?p=3' },
];

export const readingNotes = books.filter((book) => book.note).sort((a, b) => b.note!.date.localeCompare(a.note!.date));

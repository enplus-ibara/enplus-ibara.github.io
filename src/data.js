// 開催ごとに書き換える情報はこのファイルにまとめる
// tbd: true の項目は「確認中」として表示される

export const FORM_URL = 'https://forms.gle/PetGbwoC6q365rDm8'
export const INSTAGRAM_URL = 'https://www.instagram.com/enplus_ibara/'
export const DM_URL = 'https://ig.me/m/enplus_ibara'

export const events = [
  {
    label: 'NEXT EVENT',
    date: '2026.11.14',
    week: 'SAT',
    photo: 'img/s_bellcosmos.jpg',
    rows: [
      { icon: '🕢', name: '時間', value: '19:30〜21:30（受付 19:00〜）' },
      { icon: '📍', name: '会場', value: 'umozon（night cafe & bar）貸切', sub: '岡山県井原市井原町318-1 石井ビル102号' },
      { icon: '👫', name: '対象年齢', value: '男女とも20〜35歳' },
      { icon: '👥', name: '定員', value: '男性10名・女性10名' },
      { icon: '💰', name: '参加費', value: '男性6,000円／女性5,000円', sub: 'お支払いは現金のみです' },
    ],
    open: true,
  },
  {
    label: 'COMING SOON',
    date: '2026.12.12',
    week: 'SAT',
    photo: 'img/s_cork.jpg',
    rows: [{ icon: '🌿', name: '詳細', value: '近日公開します', tbd: true }],
    open: false,
  },
]

export const flow = [
  { time: '19:00', title: '受付', text: '会場に着いたら、受付でお名前を伝えてくださいね。' },
  { time: '19:30', title: 'スタート', text: '男女各10名の少人数で、ゆっくり始まります。' },
  { time: '', title: '会話の時間', text: 'スタッフが自然に話せるきっかけをつくります。', tbd: true },
  { time: '21:30', title: '終了', text: '「来てよかった」と思える夜になりますように。' },
]

export const faqs = [
  {
    q: 'ひとりで参加しても大丈夫ですか？',
    a: 'もちろんです。おひとりでのご参加、大歓迎です。スタッフがそばでサポートするので、安心してお越しくださいね。',
  },
  {
    q: '話すのが苦手なのですが…',
    a: '大丈夫です。少人数制なので、一人ひとりとゆっくり話せます。自然に話せるきっかけや雰囲気づくりは、私たちにおまかせください。',
  },
  {
    q: '井原市の外からでも参加できますか？',
    a: 'はい、市外からのご参加も歓迎しています。',
  },
  {
    q: '年齢制限はありますか？',
    a: '開催ごとに対象年齢を決めています。各回の案内をご確認ください。',
  },
  {
    q: 'どうやって申し込めばいいですか？',
    a: 'このページの「申し込む」ボタンから、フォームに入力してください。わからないことは Instagram の DM でお気軽にどうぞ。',
  },
]

// 写真はすべて人の顔が写っていない場面だけを使う
// トップで切り替わる写真
export const heroSlides = [
  { src: 'img/past_roses.jpg', alt: 'バラとキャンドルを飾ったテーブル' },
  { src: 'img/past_brulee2.jpg', alt: '炎をまとったクレームブリュレ' },
  { src: 'img/s_cosmos.jpg', alt: 'コスモスの一輪挿し' },
  { src: 'img/s_orchid.jpg', alt: '胡蝶蘭' },
  { src: 'img/past_dessert.jpg', alt: 'キャンドルの灯るデザートの卓' },
]

// スクロールに合わせて切り替わる場面
export const scenes = [
  { src: 'img/s_moon.jpg', text: '仕事と家を往復する毎日' },
  { src: 'img/past_dessert.jpg', text: '新しい出会いって なかなかない' },
  { src: 'img/past_roses2.jpg', text: 'だからこそ ゆっくり話せる夜を' },
  { src: 'img/past_brulee.jpg', text: 'その一歩が\n素敵なご縁につながりますように' },
]

// 1段目：これまでの開催（umozon 以外の会場）／2・3段目：umozon
export const gallery = [
  { src: 'img/past_roses.jpg', alt: 'バラとキャンドルを飾ったテーブル' },
  { src: 'img/past_brulee.jpg', alt: '炎をまとったクレームブリュレ' },
  { src: 'img/past_table.jpg', alt: '白いテーブルとバラの花びら' },
  { src: 'img/past_dessert.jpg', alt: 'キャンドルの灯るデザートの卓' },
  { src: 'img/past_brulee2.jpg', alt: '仕上げのクレームブリュレ' },
  { src: 'img/past_roses2.jpg', alt: 'キャンドルとバラ' },
  { src: 'img/past_brulee3.jpg', alt: '並んだクレームブリュレ' },
]

export const galleryUmozon = [
  { src: 'img/s_cosmos.jpg', alt: 'コスモスの一輪挿し' },
  { src: 'img/s_orchid.jpg', alt: '胡蝶蘭' },
  { src: 'img/s_cork.jpg', alt: 'シャンパンのコルク' },
  { src: 'img/s_bell.jpg', alt: '卓上ベル' },
  { src: 'img/s_monstera.jpg', alt: 'モンステラの卓上飾り' },
  { src: 'img/s_greenart.jpg', alt: '壁のグリーンのアート' },
  { src: 'img/s_pumpkin.jpg', alt: 'ボトルとかぼちゃ' },
  { src: 'img/s_pinecone.jpg', alt: '松ぼっくり' },
  { src: 'img/s_moon.jpg', alt: '月のようなライト' },
  { src: 'img/s_tree.jpg', alt: '店内の木' },
]

export const galleryFood = [
  { src: 'img/s_grape.jpg', alt: 'ぶどうのサンドケーキ' },
  { src: 'img/s_showcase.jpg', alt: 'ショーケースのケーキ' },
  { src: 'img/s_pasta.jpg', alt: 'トマトパスタ' },
  { src: 'img/s_beer.jpg', alt: '生ビール' },
  { src: 'img/s_canele.jpg', alt: 'カヌレとケーキ' },
  { src: 'img/cake.jpg', alt: 'ショーケースに並ぶケーキ' },
  { src: 'img/pudding.jpg', alt: 'プリン' },
  { src: 'img/toast.jpg', alt: 'ビールで乾杯' },
]

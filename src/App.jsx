import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
  animate,
} from 'motion/react'
import {
  FORM_URL, INSTAGRAM_URL, DM_URL, events, flow, faqs,
  heroSlides, scenes, gallery, galleryUmozon, galleryFood,
} from './data'

const BASE = import.meta.env.BASE_URL
const ease = [0.22, 1, 0.36, 1]

// スクロールで見えたときに、ぼかしが解けながら浮かび上がる
function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </Tag>
  )
}

function Tbd() {
  return <span className="tbd">仮</span>
}

function SectionTitle({ en, ja }) {
  return (
    <div className="section-title">
      <Reveal as="p" className="en">{en}</Reveal>
      <Reveal as="h2" delay={0.1}>{ja}</Reveal>
      <motion.span
        className="rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
      />
    </div>
  )
}

function Logo({ size = 44 }) {
  return (
    <span className="logo" style={{ width: size, height: size, fontSize: size }}>
      <span>en+</span>
    </span>
  )
}

/* ---------- 最初のロゴ演出 ---------- */
function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div
      className="intro"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <svg viewBox="0 0 120 120" width="120" height="120">
        <motion.circle
          cx="60" cy="60" r="56" fill="none" stroke="var(--cream)" strokeWidth="1"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease }}
          style={{ originX: '50%', originY: '50%' }}
        />
      </svg>
      <motion.div
        className="intro-mark"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.5, ease }}
      >
        en<span className="plus">+</span>
        <small>Ibara</small>
      </motion.div>
    </motion.div>
  )
}

/* ---------- ヘッダー ---------- */
const menuLinks = [
  ['#event', '開催情報', 'EVENT'],
  ['#about', 'en＋について', 'ABOUT'],
  ['#flow', '当日の流れ', 'FLOW'],
  ['#gallery', 'これまでの開催', 'GALLERY'],
  ['#faq', 'よくある質問', 'Q&A'],
  ['#organizer', '主催者の想い', 'MESSAGE'],
]

// スマホ用：右上の「≡」から開く、画面いっぱいのメニュー
function MobileMenu({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu"
          initial={{ clipPath: 'circle(0% at calc(100% - 40px) 34px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 40px) 34px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 40px) 34px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav>
            {menuLinks.map(([href, ja, en], i) => (
              <motion.a
                key={href} href={href} onClick={onClose}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.06, ease }}
              >
                <span>{en}</span>{ja}
              </motion.a>
            ))}
          </nav>
          <motion.div
            className="menu-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <a className="btn btn-light" href={FORM_URL} target="_blank" rel="noreferrer">イベントに申し込む</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram @enplus_ibara</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Header({ delay }) {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > window.innerHeight * 0.6))
  return (
    <>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <motion.header
        className={`header ${solid ? 'solid' : ''} ${open ? 'menu-open' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        <a href="#top" className="brand" onClick={() => setOpen(false)}><Logo size={40} /><span>en＋</span></a>
        <nav>
          {menuLinks.slice(0, 5).map(([href, ja]) => <a key={href} href={href}>{ja}</a>)}
        </nav>
        <a className="btn btn-small" href={FORM_URL} target="_blank" rel="noreferrer">申し込む</a>
        <button
          className="burger"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <motion.i animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease }} />
          <motion.i animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease }} />
        </button>
      </motion.header>
    </>
  )
}

/* ---------- トップ ---------- */
// 写真がゆっくり寄りながら、重なるように切り替わる
function HeroSlides({ ready }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!ready) return
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [ready])
  const s = heroSlides[i]
  return (
    <AnimatePresence initial={false}>
      {ready && (
        <motion.img
          key={s.src}
          className="hero-slide"
          src={`${BASE}${s.src}`}
          alt=""
          initial={{ opacity: 0, scale: 1.16 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 2.2, ease: 'easeInOut' }, scale: { duration: 8.5, ease: 'linear' } }}
        />
      )}
    </AnimatePresence>
  )
}

function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const lift = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  const copy = ['ご', '縁', 'に', '、', '＋', 'を', '。']
  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <HeroSlides ready={ready} />
      </motion.div>
      <div className="hero-shade" />

      <motion.div className="hero-inner" style={{ opacity: fade, y: lift }}>
        <motion.p
          className="hero-label"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={ready ? { opacity: 1, letterSpacing: '0.32em' } : {}}
          transition={{ duration: 1.8, delay: 0.3, ease }}
        >
          IBARA MATCHING EVENT
        </motion.p>
        <h1 className="hero-copy" aria-label="ご縁に、＋を。">
          {copy.map((c, i) => (
            <motion.span
              key={i}
              aria-hidden
              className={c === '＋' ? 'plus-char' : ''}
              initial={{ opacity: 0, y: '0.5em', filter: 'blur(10px)' }}
              animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.2, delay: 0.7 + i * 0.12, ease }}
            >
              {c}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.9, ease }}
        >
          出会いって、もっと気軽でいい。<br />
          岡山県井原市の、少人数制マッチングイベント
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 2.2, ease }}
        >
          <a className="btn btn-light" href="#event">次回の開催を見る</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 3 }}
      >
        <span>SCROLL</span>
        <motion.i
          animate={{ scaleY: [0, 1, 1], originY: [0, 0, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

/* ---------- 写真と言葉が自動で切り替わる（1画面分） ---------- */
const SCENE_MS = 4200

function Story() {
  const ref = useRef(null)
  // 画面に入っているあいだだけ切り替える
  const inView = useInView(ref, { amount: 0.5 })
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setI((n) => (n + 1) % scenes.length), SCENE_MS)
    return () => clearTimeout(t)
  }, [inView, i])
  const s = scenes[i]
  return (
    <section className="story" ref={ref}>
      <AnimatePresence initial={false}>
        <motion.div
          key={s.src}
          className="scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <motion.img
            src={`${BASE}${s.src}`} alt=""
            initial={{ scale: 1.14 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: SCENE_MS / 1000 + 1.4, ease: 'linear' }}
          />
          <motion.p
            className="scene-text"
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <span>{s.text}</span>
          </motion.p>
        </motion.div>
      </AnimatePresence>
      {/* 今どの場面かを示す点。押すとその場面に切り替わる */}
      <div className="story-dots">
        {scenes.map((sc, n) => (
          <button key={sc.src} aria-label={`場面${n + 1}`} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
            {n === i && inView && (
              <motion.i
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SCENE_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}

/* ---------- 写真の帯（ゆっくり流れる背景にひとこと） ---------- */
function PhotoBreak({ src, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  return (
    <section className="photo-break" ref={ref}>
      <motion.img src={`${BASE}${src}`} alt="" style={{ y }} />
      <div className="photo-break-shade" />
      <Reveal as="p" className="photo-break-text">{children}</Reveal>
    </section>
  )
}

/* ---------- 心の声 ---------- */
function Voices() {
  const lines = ['ひとりで参加しても大丈夫？', '初めてだから、緊張する…', '話すのが、ちょっと苦手で']
  return (
    <section className="voices">
      {lines.map((l, i) => (
        <Reveal key={l} delay={i * 0.25} className={`voice v${i}`}>「{l}」</Reveal>
      ))}
      <Reveal delay={0.9} className="voices-answer">
        <p>そんな方のために、<br className="sp-only" />en＋はあります。</p>
        <p className="small">少人数だから、一人ひとりとゆっくり話せる。<br />会話のきっかけは、<br className="sp-only" />スタッフがそっとお手伝いします🌿</p>
      </Reveal>
    </section>
  )
}

/* ---------- 開催情報 ---------- */
function EventSection() {
  return (
    <section className="section event" id="event">
      <SectionTitle en="EVENT" ja="次回のイベント" />
      <div className="event-list">
        {events.map((ev, i) => (
          <motion.article
            key={ev.date}
            className={`event-card ${ev.open ? 'open' : 'soon'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, delay: i * 0.15, ease }}
          >
            {ev.photo && (
              <div className="ev-photo">
                <motion.img
                  src={`${BASE}${ev.photo}`} alt=""
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.4, ease }}
                />
              </div>
            )}
            <p className="ev-label">{ev.label}</p>
            <p className="ev-date">{ev.date}<span>{ev.week}</span></p>
            <dl>
              {ev.rows.map((r, j) => (
                <motion.div
                  key={r.name}
                  className="ev-row"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + j * 0.08, ease }}
                >
                  <dt><span aria-hidden>{r.icon}</span>{r.name}</dt>
                  <dd>
                    {r.value}{r.tbd && <Tbd />}
                    {r.sub && <small>{r.sub}</small>}
                  </dd>
                </motion.div>
              ))}
            </dl>
            {ev.open && (
              <a className="btn" href={FORM_URL} target="_blank" rel="noreferrer">この回に申し込む</a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

/* ---------- 実績の数字 ---------- */
function Count({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className="count">{n}<small>{suffix}</small></span>
}

/* ---------- en＋について ---------- */
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const floatA = useTransform(scrollYProgress, [0, 1], [80, -80])
  const floatB = useTransform(scrollYProgress, [0, 1], [140, -140])
  const points = [
    ['少人数制', '大きなパーティーではなく、一人ひとりとちゃんと話せる人数で。'],
    ['おひとり・初めて大歓迎', 'はじめての方にも、おひとりの方にも、安心して来てほしいから。'],
    ['会話のサポート', '話すのが苦手でも大丈夫。自然に話せる雰囲気をつくります。'],
    ['市外からも歓迎', '井原市の外からのご参加も、もちろん大歓迎です。'],
  ]
  return (
    <section className="section about" id="about">
      <SectionTitle en="ABOUT" ja="en＋について" />
      <div className="about-grid" ref={ref}>
        {/* 切り抜かれた要素は画面に入ったと判定されないので、外側の枠で判定する */}
        <motion.div
          className="about-visual"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
        <motion.div
          className="about-photo"
          variants={{ hidden: { clipPath: 'inset(100% 0 0 0)' }, show: { clipPath: 'inset(0% 0 0 0)' } }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={`${BASE}img/past_roses.jpg`} alt="バラとキャンドルを飾ったテーブル"
            variants={{ hidden: { scale: 1.25 }, show: { scale: 1 } }}
            transition={{ duration: 2.2, ease }}
          />
        </motion.div>
        {/* 奥行きが出るように、小さな写真を違う速さで動かす */}
        <motion.img className="float float-a" src={`${BASE}img/s_cosmos2.jpg`} alt="" style={{ y: floatA }} />
        <motion.img className="float float-b" src={`${BASE}img/past_brulee3.jpg`} alt="" style={{ y: floatB }} />
        </motion.div>
        <div className="about-text">
          <Reveal as="p" className="lead">
            たくさんの人と出会うことより、<br />一人ひとりと、ちゃんと話せること。
          </Reveal>
          <Reveal as="p" delay={0.15}>
            en＋（エンプラス）は、岡山県井原市で開いている少人数制のマッチングイベントです。
            前身の「井原エグゼクティブマッチング」から数えて、これまでに8回開催してきました。
          </Reveal>
          <div className="stats">
            <Reveal delay={0.2}><Count to={90} suffix="名以上" /><p>累計の参加者</p></Reveal>
            <Reveal delay={0.35}><Count to={8} suffix="回" /><p>これまでの開催</p></Reveal>
          </div>
        </div>
      </div>
      <div className="points">
        {points.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.12} className="point">
            <span className="num">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- 当日の流れ ---------- */
// 写真付きのカードを横に並べる。スマホでは横にスワイプして見る
function Flow() {
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: ref })
  return (
    <section className="section flow" id="flow">
      <SectionTitle en="FLOW" ja="当日の流れ" />
      <div className="flow-track" ref={ref}>
        {flow.map((f, i) => (
          <motion.article
            key={f.title}
            className="flow-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease }}
          >
            <div className="flow-photo">
              <img src={`${BASE}${f.photo}`} alt="" loading="lazy" />
              <span className="flow-num">0{i + 1}</span>
            </div>
            <div className="flow-body">
              <p className="time">{f.time || '　'}</p>
              <h3>{f.title}{f.tbd && <Tbd />}</h3>
              <p>{f.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="flow-progress" aria-hidden><motion.i style={{ scaleX: scrollXProgress }} /></div>
      <p className="flow-hint" aria-hidden>← スワイプして見る →</p>
      <p className="note">※流れは仮の内容です。決まり次第更新します。</p>
    </section>
  )
}

/* ---------- よくある質問 ---------- */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <SectionTitle en="Q&A" ja="よくある質問" />
      <div className="faq-list">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal key={f.q} delay={i * 0.06} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
              <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="q">Q</span>
                <span className="qt">{f.q}</span>
                <motion.span className="pm" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <p><span className="a">A</span>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- 開催の様子 ---------- */
function Gallery() {
  const [active, setActive] = useState(null)
  const rows = [
    { items: gallery, label: '前身「井原エグゼクティブマッチング」の開催より', place: 'お花屋さん「プリムヴェール」2階のシェアスペース' },
    { items: galleryUmozon, label: '11/14の会場', place: 'umozon（night cafe & bar）' },
    { items: galleryFood },
  ]
  return (
    <section className="section gallery" id="gallery">
      <SectionTitle en="GALLERY" ja="これまでの開催" />
      {rows.map(({ items: row, label, place }, r) => (
        <div key={r}>
        {label && (
          <Reveal className="gallery-label">
            <span>{label}</span>
            <strong>{place}</strong>
          </Reveal>
        )}
        <div className="marquee">
          <motion.div
            className="marquee-track"
            animate={{ x: r % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 50 + r * 12, repeat: Infinity, ease: 'linear' }}
          >
            {[...row, ...row].map((g, i) => (
              <button key={i} className="shot" onClick={() => setActive(g)} aria-label={`${g.alt}を拡大`}>
                <img src={`${BASE}${g.src}`} alt={g.alt} loading="lazy" />
              </button>
            ))}
          </motion.div>
        </div>
        </div>
      ))}
      <p className="note center">※写真・映像はイメージです</p>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={`${BASE}${active.src}`} alt={active.alt}
              initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- 参加者の声 ---------- */
function Testimonials() {
  return (
    <section className="section testimonials" id="voice">
      <SectionTitle en="VOICE" ja="参加者の声" />
      <Reveal className="preparing">
        <p>ただいま準備中です</p>
        <p className="small">次回のイベントで、参加された方の感想を集めます。<br />もう少しだけお待ちくださいね☺️</p>
      </Reveal>
    </section>
  )
}

/* ---------- 主催者の想い ---------- */
function Organizer() {
  return (
    <section className="section organizer" id="organizer">
      <SectionTitle en="MESSAGE" ja="主催者の想い" />
      <div className="organizer-grid">
        <Reveal className="org-photo">
          <div className="org-placeholder"><Logo size={96} /><p>写真（準備中）</p></div>
        </Reveal>
        <div>
          <Reveal as="p" className="worry">「どうしたら、自然に話せるかな？」</Reveal>
          <Reveal as="p" className="worry" delay={0.15}>「今回は、何をしたら楽しいかな？」</Reveal>
          <Reveal as="p" delay={0.3}>
            スタッフで話し合いながら、ひとつひとつ考えています。
          </Reveal>
          <Reveal as="p" delay={0.4}>
            もちろん、新しいご縁につながってほしい。<br />
            でも、ただ出会うだけじゃなくて、<br />
            「来てよかった」と思える、あたたかい場にしたい。
          </Reveal>
          <Reveal as="p" delay={0.5}>ご縁から、次のご縁へ。</Reveal>
          <Reveal as="p" className="sign" delay={0.6}>en＋ 主催者（お名前・紹介文は準備中）<Tbd /></Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- 最後のひとこと ---------- */
function Closing() {
  return (
    <section className="closing">
      <motion.div
        className="closing-bg"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease }}
        style={{ backgroundImage: `url(${BASE}img/past_table.jpg)` }}
      />
      <div className="closing-shade" />
      <div className="closing-inner">
        <Reveal as="p" className="closing-copy">動いた人から、<br />出会いは始まる。</Reveal>
        <Reveal delay={0.3}>
          <a className="btn btn-light" href={FORM_URL} target="_blank" rel="noreferrer">イベントに申し込む</a>
        </Reveal>
        <Reveal delay={0.45} className="contact">
          <p>わからないことは、お気軽にどうぞ</p>
          <a href={DM_URL} target="_blank" rel="noreferrer">Instagram の DM で問い合わせる →</a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Logo size={56} />
      <p className="f-name">en＋（エンプラス）｜IBARA MATCHING EVENT</p>
      <p>岡山県井原市</p>
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram @enplus_ibara</a>
      <p className="copy">© en＋</p>
    </footer>
  )
}

/* ---------- スマホ用：画面下の申込ボタン ---------- */
function StickyCta() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    const nearEnd = v + window.innerHeight > document.body.scrollHeight - 500
    setShow(v > window.innerHeight * 0.8 && !nearEnd)
  })
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="sticky-cta"
          href={FORM_URL} target="_blank" rel="noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span>11/14（土）umozon</span>申し込む
        </motion.a>
      )}
    </AnimatePresence>
  )
}

// 最初のロゴ演出は、はじめて開いたときだけ見せる
const INTRO_KEY = 'enplus-intro-seen'
function introSeen() {
  try { return localStorage.getItem(INTRO_KEY) === '1' } catch { return false }
}
function markIntroSeen() {
  try { localStorage.setItem(INTRO_KEY, '1') } catch { /* 保存できなくても表示には影響しない */ }
}

export default function App() {
  const [skipIntro] = useState(introSeen)
  const [ready, setReady] = useState(skipIntro)
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!ready && <Intro key="intro" onDone={() => { markIntroSeen(); setReady(true) }} />}
      </AnimatePresence>
      <Header delay={skipIntro ? 0.4 : 2.6} />
      <main>
        <Hero ready={ready} />
        <Story />
        <EventSection />
        <Voices />
        <About />
        <PhotoBreak src="img/past_roses2.jpg">ただ出会うだけじゃなく<br />「来てよかった」と思える夜を</PhotoBreak>
        <Flow />
        <Gallery />
        <PhotoBreak src="img/s_orchid.jpg">ご縁から 次のご縁へ</PhotoBreak>
        <Faq />
        <Testimonials />
        <Organizer />
        <Closing />
      </main>
      <Footer />
      <StickyCta />
    </MotionConfig>
  )
}

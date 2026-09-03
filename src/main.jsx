import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WebThreads from './WebThreads'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', type: 'LANDSCAPE · BOARD A / UPPER', title: '生态农业展示空间 / 展板 A·上', year: '2026', image: '/assets/portfolio/eco-board-01-top.webp', tone: 'violet', fit: 'artwork board-part', masks: [['0%','9.2%'],['93.3%','6.7%']] },
  { id: '02', type: 'LANDSCAPE · BOARD B / UPPER', title: '生态农业展示空间 / 展板 B·上', year: '2026', image: '/assets/portfolio/eco-board-02-top.webp', tone: 'blue', fit: 'artwork board-part', masks: [['0%','9.2%'],['93.3%','6.7%']] },
  { id: '03', type: 'LANDSCAPE · BOARD A / LOWER', title: '生态农业展示空间 / 展板 A·下', year: '2026', image: '/assets/portfolio/eco-board-01-bottom.webp', tone: 'violet', fit: 'artwork board-part', masks: [['0%','8.8%'],['93.3%','6.7%']] },
  { id: '04', type: 'LANDSCAPE · BOARD B / LOWER', title: '生态农业展示空间 / 展板 B·下', year: '2026', image: '/assets/portfolio/eco-board-02-bottom.webp', tone: 'blue', fit: 'artwork board-part', masks: [['0%','8.8%'],['93.3%','6.7%']] },
  { id: '05', type: 'CAMPAIGN · POSTER DESIGN', title: '夏日餐饮视觉 / 甜品菜单', year: '2026.07', image: '/assets/portfolio/cafe-dessert-2026-v3.webp', tone: 'coral', fit: 'artwork', masks: [['0%','14.8%'],['93%','7%']] },
  { id: '06', type: 'CAMPAIGN · MENU SYSTEM', title: '夏日餐饮视觉 / 饮品菜单', year: '2026.07', image: '/assets/portfolio/cafe-drinks-2026-v3.webp', tone: 'blue', fit: 'artwork', masks: [['0%','21%']] },
  { id: '07', type: 'CAMPAIGN · VISUAL DETAIL', title: '夏日餐饮视觉 / 版式细节', year: '2026.07', image: '/assets/portfolio/cafe-drinks-detail-2026-v3.webp', tone: 'violet', fit: 'artwork', masks: [['0%','21%']] },
]
const strengths = [['01', '视觉叙事', '从场地调研到画面表达，建立清晰、有情绪的视觉语言。'], ['02', 'AI 创意工作流', '把生成式 AI 变成可控、可复用的创意协作者。'], ['03', '品牌系统', '不只做一张好看的图，而是搭建能持续生长的系统。'], ['04', '跨界协作', '在策略、设计、内容与技术之间保持高效沟通。']]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const cursor = useRef(null)
  const root = useRef(null)
  useEffect(() => { const move = (event) => { if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX - 8}px, ${event.clientY - 8}px, 0)` }; window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move) }, [])
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const opening = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
        opening.from('.opening-mark span', { yPercent: 130, rotate: 4, duration: 1.05 })
          .to('.opening-panel', { scaleY: 0, transformOrigin: 'top', duration: 1.35, stagger: 0.11 }, '-=.3')
          .to('.opening', { autoAlpha: 0, pointerEvents: 'none', duration: .25 })
          .from('.nav', { y: -42, autoAlpha: 0, duration: .9 }, '-=.15')
          .from('.eyebrow', { y: 28, autoAlpha: 0, duration: .75 }, '-=.7')
          .from('.title-line', { yPercent: 130, scaleX: .68, filter: 'blur(12px)', duration: 1.25, stagger: .14 }, '-=.55')
          .from('.hero-bottom, .hero-meta', { y: 34, autoAlpha: 0, duration: .9, stagger: .1 }, '-=.7')

        gsap.utils.toArray('.motion-section').forEach((section, index) => {
          const word = section.querySelector('.kinetic-word')
          const title = section.querySelector('h2')
          const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 76%', toggleActions: 'play none none reverse' } })
          if (word) timeline.from(word, { xPercent: index % 2 ? 42 : -42, scale: 1.3, autoAlpha: 0, duration: 1.35, ease: 'power4.out' })
          if (title) timeline.from(title, { y: 95, clipPath: 'inset(100% 0 0 0)', duration: 1.15, ease: 'power4.out' }, '-=.85')
        })

        gsap.from('.project-card', { y: 130, autoAlpha: 0, stagger: .16, duration: 1.25, ease: 'power3.out', scrollTrigger: { trigger: '.project-list', start: 'top 82%' } })
        gsap.utils.toArray('.project-card').forEach((card) => {
          const frame = card.querySelector('.project-image')
          const image = card.querySelector('img')
          gsap.from(frame, { clipPath: 'inset(100% 0 0 0)', duration: 1.35, ease: 'power4.inOut', scrollTrigger: { trigger: card, start: 'top 84%' } })
          gsap.fromTo(image, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.02, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.1 } })
        })
        gsap.from('.strength-card', { y: 90, autoAlpha: 0, stagger: .14, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: '.strength-grid', start: 'top 82%' } })
        gsap.from('.stats > div', { y: 52, autoAlpha: 0, stagger: .12, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 86%' } })
        gsap.to('.portrait-wrap', { yPercent: -9, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })

      })
    }, root)
    return () => context.revert()
  }, [])
  useEffect(() => {
    if (!activeProject || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo('.modal-backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: .35, ease: 'power2.out' })
    gsap.fromTo('.modal', { y: 70, scale: .94, clipPath: 'inset(100% 0 0 0)' }, { y: 0, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: .9, ease: 'power4.out' })
  }, [activeProject])
  const closeMenu = () => setMenuOpen(false)
  return <main ref={root}>
    <div className="opening" aria-hidden="true"><div className="opening-panel" /><div className="opening-panel" /><div className="opening-panel" /><div className="opening-mark"><span>YES / PORTFOLIO</span></div></div>
    <div className="cursor" ref={cursor} />
    <nav className="nav shell"><a className="logo" href="#top" onClick={closeMenu}>N<span>/</span>R</a><div className={`nav-links ${menuOpen ? 'is-open' : ''}`}><a href="#about" onClick={closeMenu}><span>01</span> 关于我</a><a href="#work" onClick={closeMenu}><span>02</span> 精选项目</a><a href="#about" onClick={closeMenu}><span>03</span> 能力</a></div><a className="nav-contact" href="https://github.com/yes-swu" target="_blank" rel="noreferrer">联系我 <ArrowUpRight size={15} /></a><button className="menu-toggle" aria-label="打开菜单" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></nav>
    <section className="hero" id="top"><video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2400&q=80"><source src="https://cdn.coverr.co/videos/coverr-a-glowing-neon-tunnel-1573/1080p.mp4" type="video/mp4" /></video><div className="hero-threads"><WebThreads color1="#5227FF" color2="#FF9FFC" color3="#FFFFFF" speed={0.2} threadCount={7} frequency={4.5} spread={0.18} taper={1.1} position={0.5} fanMode="center" glow={0.02} falloff={0.6} thickness={1.1} brightness={0.6} opacity={1} mirror shimmer={false} grain grainIntensity={0.05} mouseInteraction mouseStrength={0.3} /></div><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-content shell"><p className="eyebrow reveal">视觉设计师 <i>×</i> AI 设计师 <i>×</i> 品牌设计师</p><h1 className="hero-title reveal"><span className="title-mask"><span className="title-line">把想象</span></span><span className="title-mask"><span className="title-line"><em>变成</em> <i className="hero-script">形状。</i></span></span></h1><div className="hero-bottom reveal"><p>以视觉为语言，探索品牌、文化<br />与技术之间的新连接。</p><a className="round-link" href="#work" aria-label="查看精选项目"><ArrowDown size={21} /></a><p className="hero-index">SCROLL TO EXPLORE<br /><span>01 / 05</span></p></div></div><div className="hero-meta"><span>AVAILABLE · REMOTE</span><span>EST. 2024</span></div></section>
    <section className="intro shell section-pad motion-section" id="about"><span className="kinetic-word">PROFILE</span><div className="section-label"><span>01</span><span>PROFILE</span></div><div className="intro-layout"><div className="portrait-wrap"><div className="portrait-orbit" /><img className="portrait" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85" alt="人物肖像占位图" /><span className="portrait-note">DESIGNER<br />AT WORK <ArrowUpRight size={14} /></span></div><div className="intro-copy"><p className="kicker">你好，我是 <span>YES</span></p><h2>我在理性与<br /><em>直觉</em>之间工作。</h2><p className="body-copy">一名以风景园林为专业背景的视觉设计师 / AI 设计师 / 品牌设计师。我的工作始于问题，终于一种让人记住的感受。</p><p className="body-copy muted">从场地调研、空间叙事到图像表达，我习惯把复杂的信息整理成清晰、有情绪、能被看见的视觉语言。</p><div className="contact-line"><a href="https://github.com/yes-swu" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> GITHUB / YES-SWU</a><span>VISUAL / AI / BRAND DESIGN</span></div></div></div><div className="stats"><div><strong>02<span>+</span></strong><small>核心实践项目</small></div><div><strong>20<span>+</span></strong><small>视觉成果输出</small></div><div><strong>02<span>+</span></strong><small>年项目经验</small></div><div><strong>∞</strong><small>保持好奇</small></div></div></section>
    <section className="work shell section-pad motion-section" id="work"><span className="kinetic-word">SELECTED WORKS</span><div className="section-label"><span>02</span><span>SELECTED WORKS</span><span className="section-label-right">2023 — NOW</span></div><div className="work-heading"><h2>精选<br /><em>项目</em></h2><p>从场地与文化出发，<br />把概念转译成可感知的视觉。</p></div><div className="project-list">{projects.map((project) => <article className={`project-card ${project.tone} ${project.fit || ''}`} key={project.id} onClick={() => setActiveProject(project)}><div className="project-image"><img src={project.image} alt={project.title} /><div className="image-noise" />{project.masks?.map((mask, index) => <span className="privacy-mask" style={{ top: mask[0], height: mask[1] }} key={index} />)}</div><div className="project-info"><span>{project.id} / {project.type}</span><h3>{project.title}</h3><span>{project.year} <ArrowUpRight size={16} /></span></div></article>)}</div><button className="all-work" onClick={() => setActiveProject({ title: '更多项目正在整理中', type: 'ARCHIVE', year: 'SOON' })}>查看完整项目集 <ArrowRight size={18} /></button></section>
    <section className="strengths shell section-pad motion-section"><span className="kinetic-word">CAPABILITIES</span><div className="section-label"><span>03</span><span>WHAT I BRING</span></div><div className="strength-layout"><h2>我的<br /><em>优势</em></h2><p className="strength-lead">好的设计，需要同时拥有清晰的思考与自由的想象。</p></div><div className="strength-grid">{strengths.map(([number, title, text]) => <div className="strength-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight className="strength-arrow" size={20} /></div>)}</div></section>
    <footer className="footer motion-section"><span className="kinetic-word">CONTACT</span><div className="footer-glow" /><div className="shell footer-inner"><div className="section-label"><span>04</span><span>LET'S MAKE SOMETHING</span></div><h2>有一个想法？<br /><em>我们聊聊。</em></h2><a className="footer-email" href="https://github.com/yes-swu" target="_blank" rel="noreferrer">GITHUB.COM/YES-SWU <ArrowUpRight size={22} /></a><div className="footer-bottom"><span>© 2026 YES</span><span className="socials"><a href="#top" aria-label="Instagram">IG</a><a href="#top" aria-label="LinkedIn">IN</a><a href="#top" aria-label="Dribbble">DB</a></span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    {activeProject && <div className="modal-backdrop" onClick={() => setActiveProject(null)}><div className="modal" onClick={(e) => e.stopPropagation()}><button onClick={() => setActiveProject(null)} aria-label="关闭"><X /></button><span>{activeProject.id || 'ARCHIVE'} / {activeProject.type}</span><h2>{activeProject.title}</h2><div className="modal-artwork"><img src={activeProject.image} alt={activeProject.title} />{activeProject.masks?.map((mask, index) => <span className="privacy-mask" style={{ top: mask[0], height: mask[1] }} key={index} />)}</div><p>敏感身份信息采用持续变化的局部雾化处理，作品主体保持完整。</p><small>{activeProject.year}</small></div></div>}
  </main>
}
createRoot(document.getElementById('root')).render(<App />)

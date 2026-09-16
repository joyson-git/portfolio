import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone, autoAdvance = true }) {
  const [secondsLeft, setSecondsLeft] = useState(5)
  const [done, setDone] = useState(false)

  const handleFinish = () => {
    if(done) return
    setDone(true)
    setTimeout(onDone, 650)
  }

  useEffect(() => {
    if (!autoAdvance) return
    const startTime = Date.now()
    const totalDuration = 5000 // 5 seconds wait time to view the broadsheet news & images

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remainingMs = Math.max(0, totalDuration - elapsed)
      const sec = Math.max(1, Math.ceil(remainingMs / 1000))
      setSecondsLeft(sec)

      if(elapsed >= totalDuration) {
        clearInterval(timer)
        setDone(true)
        setTimeout(onDone, 650)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [onDone, autoAdvance])

  return (
    <AnimatePresence>
      <motion.div
        key="np-loader-page"
        className="np-loader"
        initial={{ opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Paper texture overlay */}
        <div className="np-loader-paper" />

        {/* Ink roller sweep on exit */}
        {done && (
          <motion.div
            className="np-loader-roller"
            initial={{ x: '-100%' }}
            animate={{ x: '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* ── STICKY TOP PAGE-TURN CONTROL BAR ── */}
        <div className="np-loader-top-bar">
          <div className="np-loader-top-left">
            <span>📰 PAGE 1 · SPECIAL REPORT SUPPLEMENT · GENZ TIMES</span>
            <span style={{ opacity: 0.5 }}>|</span>
            {autoAdvance ? (
              <span style={{ color: 'var(--np-ink)', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <span className="np-pulse-dot" />
                Auto-advancing to Page 2 (Portfolio) in <strong style={{ color: 'var(--np-red)', minWidth: '1.2rem' }}>{secondsLeft}s</strong>
              </span>
            ) : (
              <span style={{ color: 'var(--np-ink)', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <span className="np-pulse-dot" />
                Reading Edition · Turn page when ready
              </span>
            )}
          </div>

          <div className="np-loader-top-right">
            <button
              type="button"
              className="np-loader-turn-btn"
              onClick={handleFinish}
            >
              <span>Turn to Page 2: From Zero to One ➔</span>
            </button>
          </div>
        </div>

        {/* ── FULL BROADSHEET NEWSPAPER COVER ── */}
        <div className="np-broadsheet-wrapper" style={{ position: 'relative', zIndex: 2 }}>

          {/* Top Ears & Masthead Row */}
          <div className="np-ears-row">

            {/* Left Ear */}
            <div className="np-ear-box">
              <div className="np-ear-box__header font-headline">MARKET DISPATCH</div>
              <div className="np-ear-box__content">
                <div style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--np-ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  background: 'var(--np-paper)',
                  flexShrink: 0
                }}>
                  📉
                </div>
                <div className="np-ear-box__text">
                  <strong>~680,000+ REDUNDANCIES</strong>
                  <div style={{ fontSize: '0.65rem', color: 'var(--np-ink-muted)', marginTop: '2px' }}>
                    Five-year global tech correction re-aligns corporate margins.
                  </div>
                </div>
              </div>
            </div>

            {/* Center Masthead */}
            <div className="np-masthead-center">
              <div className="np-masthead-main-title font-masthead">
                GENZ Times
              </div>
              <div className="np-masthead-subtitle font-mono">
                EST. 1890 · SPECIAL MARKET EDITION · LATE CITY WIRE
              </div>
            </div>

            {/* Right Ear */}
            <div className="np-ear-box">
              <div className="np-ear-box__header font-headline">AI EXPANSION</div>
              <div className="np-ear-box__content">
                <div style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--np-ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  background: 'var(--np-paper)',
                  flexShrink: 0
                }}>
                  🤖
                </div>
                <div className="np-ear-box__text">
                  <strong>MASSIVE CAPEX RACE</strong>
                  <div style={{ fontSize: '0.65rem', color: 'var(--np-ink-muted)', marginTop: '2px' }}>
                    Trillions funneled into clusters; scrutiny rises on genuine ROI.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Dateline Bar with Double Rules */}
          <hr className="np-rule-double" />
          <div className="np-dateline-bar font-mono">
            <span>VOL. I NO. 142 · PAGE 1</span>
            <span>BANGALORE, MONDAY, SEPTEMBER 14 · SPECIAL FIVE-YEAR WIRE DOSSIER</span>
            <span>ESTABLISHED 1890 · LATE CITY EDITION</span>
            <span>PRICE: TWO PENCE</span>
          </div>
          <hr className="np-rule-double" />

          {/* Giant Screaming Lead Headline */}
          <h2
            className="np-screaming-headline font-headline"
            style={{ margin: '0.6rem 0 0.8rem', fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)' }}
          >
            THE GREAT TECH RESET SWEEPS GLOBAL JOB MARKET
          </h2>

          <p
            className="font-serif"
            style={{
              textAlign: 'center',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
              fontStyle: 'italic',
              color: 'var(--np-ink-body)',
              margin: '0 auto 0.8rem',
              maxWidth: '900px'
            }}
          >
            An exhaustive broadsheet retrospective on post-COVID over-hiring, corporate margin corrections, geopolitical shocks, and the artificial intelligence labor shift.
          </p>

          {/* 1890 Wire Ribbon */}
          <div className="np-1890-wire-bar font-mono" style={{ margin: '0.4rem 0 1rem' }}>
            <span className="np-1890-badge">1890 WIRE ARCHIVE</span>
            <span className="np-1890-text">
              <strong>TELEGRAPHIC BULLETIN:</strong> “From early punch-card tabulation apparatus to deep neural models: while technological cycles swing, resilient backend foundations and test automation endure.”
            </span>
            <span className="np-1890-tag">DISPATCH № 2026</span>
          </div>

          <hr className="np-rule-single" />

          {/* ── 3-COLUMN BROADSHEET LAYOUT ── */}
          <div className="np-broadsheet-grid" style={{ marginTop: '1rem' }}>

            {/* Column 1: Chronological Breakdown 2022-2024 */}
            <div className="np-col">
              <h3 className="np-article-headline font-serif" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                The Great Correction: 2022 to 2024
              </h3>
              <div className="np-article-byline font-mono" style={{ marginBottom: '0.5rem' }}>
                BY SPECIAL FINANCIAL CORRESPONDENT
              </div>

              <figure className="np-wire-figure">
                <img
                  src="/market_crash.webp"
                  alt="Panic on Wall Street and tech market correction"
                  loading="lazy"
                />
                <figcaption className="np-wire-caption">
                  Turmoil on the trading floor: Soaring rates and corporate belt-tightening bring the pandemic hiring wave to a standstill.
                </figcaption>
              </figure>

              {/* 2022 */}
              <div className="np-news-article-card">
                <div className="np-news-article-year">
                  <strong>2022</strong>
                  <span className="np-news-article-badge">~165K LAYOFFS</span>
                </div>
                <p className="np-news-article-text">
                  Post-COVID hiring boom ended. Inflation + rising interest rates → companies started layoffs. ~165K tech layoffs.
                </p>
              </div>

              {/* 2023 */}
              <div className="np-news-article-card">
                <div className="np-news-article-year">
                  <strong>2023</strong>
                  <span className="np-news-article-badge">~263K LAYOFFS</span>
                </div>
                <p className="np-news-article-text">
                  Biggest correction. Big Tech cut heavily as companies focused on profits. ~263K tech layoffs. ChatGPT/GenAI became a major new force.
                </p>
              </div>

              {/* Column 1 Second Photo */}
              <figure className="np-wire-figure">
                <img
                  src="/tech_layoffs_archive.webp"
                  alt="Deserted corporate offices following mass tech layoffs"
                  loading="lazy"
                />
                <figcaption className="np-wire-caption">
                  Deserted Offices: The Post-COVID Purge. Over 400,000 engineering and product desks liquidated as corporate mandates enforced ruthless margin austerity.
                </figcaption>
              </figure>

              {/* 2024 */}
              <div className="np-news-article-card">
                <div className="np-news-article-year">
                  <strong>2024</strong>
                  <span className="np-news-article-badge">~153K LAYOFFS</span>
                </div>
                <p className="np-news-article-text">
                  Layoffs continued, but focus shifted to restructuring, efficiency and AI/automation. ~153K tech layoffs.
                </p>
              </div>
            </div>

            {/* Column 2: 2025-2026 & The Hiring Shift */}
            <div className="np-col">
              <h3 className="np-article-headline font-serif" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                The 'No Hire, More Fire' Frontier
              </h3>
              <div className="np-article-byline font-mono" style={{ marginBottom: '0.5rem' }}>
                LABOR &amp; RESTRUCTURING BUREAU
              </div>

              <figure className="np-wire-figure">
                <img
                  src="/ai_automation.webp"
                  alt="Automatic writing and mechanical computing machines"
                  loading="lazy"
                />
                <figcaption className="np-wire-caption">
                  The Age of the Machine: Automated reasoning tools trigger an aggressive shift from headcount to high-leverage engineering.
                </figcaption>
              </figure>

              {/* 2025 */}
              <div className="np-news-article-card">
                <div className="np-news-article-year">
                  <strong>2025</strong>
                  <span className="np-news-article-badge">WEAK HIRING</span>
                </div>
                <p className="np-news-article-text">
                  Hiring became weaker while layoffs continued — described as “no hire, more fire.” AI increasingly affected hiring plans.
                </p>
              </div>

              {/* Column 2 Second Photo */}
              <figure className="np-wire-figure">
                <img
                  src="/ai_datacenter_archive.webp"
                  alt="The Dawn of the Calculating Leviathan industrial compute cluster"
                  loading="lazy"
                />
                <figcaption className="np-wire-caption">
                  The Calculating Leviathan: Massive multi-gigawatt compute clusters rise in 2026. Automated code generation shifts engineering demand to deep systems design &amp; verification.
                </figcaption>
              </figure>

              {/* 2026 */}
              <div className="np-news-article-card">
                <div className="np-news-article-year">
                  <strong>2026</strong>
                  <span className="np-news-article-badge">100K+ LOGGED</span>
                </div>
                <p className="np-news-article-text">
                  AI, automation, high infrastructure costs, geopolitics and weaker hiring remain major factors. 100K+ tech layoffs have already been reported by major trackers.
                </p>
              </div>

              {/* Editorial Takeaway */}
              <div className="np-news-article-card" style={{ background: 'var(--np-paper)' }}>
                <div className="np-news-article-year">
                  <strong>THE VERDICT</strong>
                  <span className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--np-ink-muted)' }}>EDITORIAL NOTE</span>
                </div>
                <p className="np-news-article-text">
                  The industry has migrated from indiscriminate headcount growth to ruthlessly efficient architectures, highly leveraged technical talent, and continuous automated verification.
                </p>
              </div>
            </div>

            {/* Column 3: Macro Indicators & AI Impact */}
            <div className="np-col">
              <h3 className="np-article-headline font-serif" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                Macro Forces, Equities &amp; The AI Shift
              </h3>
              <div className="np-article-byline font-mono" style={{ marginBottom: '0.5rem' }}>
                GLOBAL INTELLIGENCE WIRE
              </div>

              <figure className="np-wire-figure">
                <img
                  src="/global_conflict_wires.webp"
                  alt="Global telegraph commerce and conflict network"
                  loading="lazy"
                />
                <figcaption className="np-wire-caption">
                  Commerce &amp; Conflict: Global telegraph wires register macroeconomic friction alongside historic AI capital expenditure scrutiny.
                </figcaption>
              </figure>

              {/* Wars */}
              <div className="np-news-macro-card">
                <div className="np-news-macro-title">
                  <span>⚔️</span> WARS &amp; GEOPOLITICS
                </div>
                <p className="np-news-article-text">
                  Russia–Ukraine and Middle East conflicts → oil, inflation, supply-chain and business uncertainty.
                </p>
              </div>

              {/* Stocks */}
              <div className="np-news-macro-card">
                <div className="np-news-macro-title">
                  <span>📈</span> STOCKS &amp; CAPITAL
                </div>
                <p className="np-news-article-text">
                  2022 tech stocks crashed as rates rose; 2023–25 AI stocks surged; 2026 markets have become more concerned about whether huge AI spending will generate enough profit.
                </p>
              </div>

              {/* Column 3 Second Photo */}
              <figure className="np-wire-figure">
                <img
                  src="/wallstreet_ticker_archive.webp"
                  alt="Wall Street frenzy and ticker tape over tech capital investments"
                  loading="lazy"
                />
                <figcaption className="np-wire-caption">
                  Panic &amp; Scrutiny on the Exchange: Historic market swings as trillions poured into AI compute face rigorous balance sheet scrutiny.
                </figcaption>
              </figure>

              {/* AI */}
              <div className="np-news-macro-card">
                <div className="np-news-macro-title">
                  <span>🤖</span> AI LABOR REALITY
                </div>
                <p className="np-news-article-text">
                  Not every layoff is because of AI. The bigger change is fewer people needed for some repetitive/entry-level work + higher demand for AI/technical skills.
                </p>
              </div>
            </div>

          </div>

          {/* ── ARCHIVAL PICTORIAL SUPPLEMENT: 2 FEATURE WIRE PHOTOS ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1rem',
            margin: '1.25rem 0',
            padding: '0.85rem',
            border: '2px solid var(--np-ink)',
            background: 'var(--np-paper-card)',
            boxShadow: '3px 3px 0px var(--np-ink)'
          }}>
            <div>
              <div className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--np-red)', marginBottom: '0.35rem' }}>
                ARCHIVAL WIRE PHOTOGRAPHY · SILICON FOUNDRIES
              </div>
              <figure className="np-wire-figure" style={{ margin: 0 }}>
                <img
                  src="/semiconductor_foundry_archive.webp"
                  alt="Precision semiconductor wafer cleanroom laboratory"
                  loading="lazy"
                  style={{ maxHeight: '185px' }}
                />
                <figcaption className="np-wire-caption">
                  <strong>The Silicon Chokepoint:</strong> Inside precision cleanrooms where microchip lithography and specialized wafer fabrication dictate global technological independence.
                </figcaption>
              </figure>
            </div>

            <div>
              <div className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--np-red)', marginBottom: '0.35rem' }}>
                SPECIAL WIRE DISPATCH · CAPITOL CLASH
              </div>
              <figure className="np-wire-figure" style={{ margin: 0 }}>
                <img
                  src="/trump_ai_press.webp"
                  alt="Presidential press conference on AI race and compute infrastructure"
                  loading="lazy"
                  style={{ maxHeight: '185px' }}
                />
                <figcaption className="np-wire-caption">
                  <strong>The Sovereign Mandate:</strong> Tech titans and policymakers collide over artificial intelligence guardrails, energy grid allocations, and competitive acceleration.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* ── FULL WIDTH OVERALL STRIP ── */}
          <div className="np-news-overall-strip">
            <strong>Overall:</strong> 2022 = over-hiring correction → 2023 = mass layoffs → 2024 = restructuring → 2025 = weak hiring → 2026 = AI + efficiency + geopolitical uncertainty.
          </div>

          {/* ── BOTTOM BROADSHEET FOOTER WITH TURN PAGE ACTION ── */}
          <hr className="np-rule-double" />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 0'
          }}>
            <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--np-ink-muted)' }}>
              PRINTED &amp; PUBLISHED BY THE SPECIAL INVESTIGATIVE BUREAU · ALL RIGHTS RESERVED © 1890–2026
            </div>

            <button
              type="button"
              className="np-stamp-btn np-stamp-btn--primary font-mono"
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem', cursor: 'pointer' }}
              onClick={handleFinish}
            >
              <span>Turn Page: Enter Joyson Pinto's Portfolio ➔</span>
            </button>
          </div>
          <hr className="np-rule-thick" />

        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ===== LOOKBOOK =====
const LookbookIndex = () => (
  <div className="page-enter container" style={{ padding: '32px 32px 80px' }} data-screen-label="09 Lookbook">
    <div style={{ marginBottom: 56 }}>
      <div className="t-eyebrow" style={{ marginBottom: 16 }}>Lookbook · Spring 2026</div>
      <h1 className="t-display" style={{ fontSize: 'clamp(56px, 9vw, 132px)', margin: 0, maxWidth: 1100 }}>
        Stories, <em style={{ fontStyle: 'italic' }}>and</em> the clothes that came home with us.
      </h1>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {LOOKBOOK.map((lb, i) => (
        <a key={lb.id} href={`#/lookbook/${lb.id}`} style={{
          display: 'block', position: 'relative',
          gridColumn: i === 0 ? 'span 2' : 'span 1',
        }}>
          <div style={{
            position: 'relative', aspectRatio: i === 0 ? '8/5' : '3/4',
            borderRadius: 'var(--r-lg)', overflow: 'hidden',
            background: 'var(--paper-2)',
          }}>
            <img src={lb.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .8s var(--ease)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,17,13,0) 50%, rgba(20,17,13,0.55))' }} />
            <div style={{ position: 'absolute', top: 20, left: 20, color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em' }}>
              STORY 0{i + 1}
            </div>
            <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: 'var(--bone)' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: i === 0 ? 56 : 36, lineHeight: 0.95, margin: '0 0 8px' }}>{lb.title}</h3>
              <p style={{ fontSize: 13, opacity: 0.85, maxWidth: 360 }}>{lb.subtitle}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

const LookbookStory = ({ id }) => {
  const lb = LOOKBOOK.find(l => l.id === id);
  if (!lb) return <LookbookIndex />;

  const products = lb.products.map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);

  return (
    <div className="page-enter" data-screen-label={`09 Lookbook — ${lb.title}`}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '92vh', overflow: 'hidden' }}>
        <img src={lb.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,17,13,0.2) 0%, rgba(20,17,13,0.1) 50%, rgba(20,17,13,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '0 32px 64px' }}>
          <div className="container" style={{ color: 'var(--bone)', padding: 0 }}>
            <div className="t-eyebrow" style={{ marginBottom: 16, color: 'var(--bone)' }}>Story 0{LOOKBOOK.indexOf(lb) + 1}</div>
            <h1 className="t-display" style={{ fontSize: 'clamp(64px, 11vw, 180px)', margin: 0 }}>{lb.title}</h1>
            <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 480, marginTop: 16 }}>{lb.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-sm" style={{ padding: '80px 32px 0' }}>
        <p style={{ fontSize: 22, lineHeight: 1.5, fontFamily: 'var(--serif)', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          {lb.body}
        </p>
      </div>

      {/* Editorial photo grid */}
      <div className="container" style={{ padding: '80px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
          <div style={{ gridColumn: 'span 7', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 'var(--r-md)' }}>
            <img src={IMG('1551488831-00ddcb6c6bd3', 1200)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 'var(--r-md)', flex: 1 }}>
              <img src={IMG('1571945153237-4929e783af4a', 1000)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px 8px', fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1.3, fontStyle: 'italic' }}>
              "I tried to photograph the kind of light that makes you slow down."
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, fontStyle: 'normal', color: 'var(--stone)', marginTop: 12, letterSpacing: '0.06em' }}>
                — MARÍA VÁZQUEZ, PHOTOGRAPHER
              </div>
            </div>
          </div>
          <div style={{ gridColumn: 'span 12', aspectRatio: '21/9', overflow: 'hidden', borderRadius: 'var(--r-md)', marginTop: 8 }}>
            <img src={IMG('1583743814966-8936f5b7be1a', 1800)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)' }}>
              The crew was small. We rented a studio with one window, then mostly stayed outside.
              On Tuesday we got rained out and ate sardines until the light came back.
            </p>
          </div>
          <div style={{ gridColumn: 'span 7', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 'var(--r-md)' }}>
            <img src={IMG('1490481651871-ab68de25d43d', 1400)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* Shop the looks */}
      <section className="container" style={{ padding: '80px 32px 0' }}>
        <h2 className="t-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: '0 0 32px' }}>
          Shop the <em style={{ fontStyle: 'italic' }}>looks.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <div className="container" style={{ padding: '80px 32px 0', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', marginTop: 80 }}>
        <a href="#/lookbook" className="btn btn-ghost"><Icon name="arrow-left" size={14} /> All stories</a>
      </div>
    </div>
  );
};

const LookbookPage = ({ id }) => id ? <LookbookStory id={id} /> : <LookbookIndex />;

window.LookbookPage = LookbookPage;

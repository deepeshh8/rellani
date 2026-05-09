// ===== HOME PAGE =====
const HomeHero = () => {
  const slides = [
    { img: '1571945153237-4929e783af4a', title: 'Dubai Dreamy', sub: 'New Collection 2026' },
    { img: '1529139374559-ee8e0fe74d5b', title: 'By the Water', sub: 'Resort & Swim' },
    { img: '1594938890-d380a6a2f06e', title: 'Effortless', sub: 'Ready to Wear' },
  ];
  const [idx, setIdx] = React.useState(0);
  const next = () => setIdx(i => (i + 1) % slides.length);
  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const slide = slides[idx];

  React.useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-full" style={{ position: 'relative', width: '100%', height: '90vh', overflow: 'hidden', background: '#f0f0f0' }}>
      {slides.map((s, i) => (
        <img key={i} src={IMG(s.img, 2000)} alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      ))}

      {/* Subtle gradient at bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom text */}
      <div className="hero-bottom" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '40px 40px 44px',
        color: '#fff',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.9 }}>
            {slide.sub}
          </div>
          <h1 className="hero-title" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            margin: 0, fontWeight: 400,
          }}>{slide.title}</h1>
          <a href="#/shop/all" style={{
            display: 'inline-block', marginTop: 24,
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.7)',
            paddingBottom: 2,
          }}>Shop now</a>
        </div>

        {/* Slide counter + arrows */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', opacity: 0.7 }}>
            {String(idx + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={prev} style={{
              width: 36, height: 36, background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.4)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name="arrow" size={12} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={next} style={{
              width: 36, height: 36, background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.4)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name="arrow" size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Marquee
const Marquee = () => (
  <div style={{
    overflow: 'hidden',
    padding: '20px 0',
    borderBottom: '1px solid var(--line)',
  }}>
    <div style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
      {Array(2).fill(0).map((_, i) => (
        <React.Fragment key={i}>
          {['New Collection', 'Free Shipping $150+', 'Ready to Wear', 'Swim', 'New In', 'Free Returns', 'Resort 2026', 'Resortwear'].map(text => (
            <span key={text} style={{
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 64,
            }}>
              {text}
              <span style={{ width: 3, height: 3, background: 'var(--stone)', display: 'inline-block', flexShrink: 0 }}></span>
            </span>
          ))}
        </React.Fragment>
      ))}
    </div>
    <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
  </div>
);

// Zara-style featured section: label + 4-column product row
const FeaturedBentoGrid = ({ onQuickView, onAddWishlist, wishlist }) => {
  const [activeTab, setActiveTab] = React.useState('new');
  const tabs = [
    { id: 'new',          label: 'New In' },
    { id: 'ready-to-wear',label: 'Ready to Wear' },
    { id: 'swim',         label: 'Swim' },
    { id: 'resortwear',   label: 'Resortwear' },
  ];

  const products = React.useMemo(() => {
    if (activeTab === 'new') return PRODUCTS.filter(p => p.tags?.includes('new')).slice(0, 8);
    return PRODUCTS.filter(p => p.cat === activeTab).slice(0, 8);
  }, [activeTab]);

  return (
    <section className="featured-section" style={{ padding: '64px 40px 0' }}>
      {/* Tab row */}
      <div className="featured-tab-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: activeTab === t.id ? 'var(--ink)' : 'var(--stone)',
              borderBottom: activeTab === t.id ? '1px solid var(--ink)' : '1px solid transparent',
              paddingBottom: 4, background: 'none', border: 'none',
              borderBottomWidth: 1, borderBottomStyle: 'solid',
              borderBottomColor: activeTab === t.id ? 'var(--ink)' : 'transparent',
              cursor: 'pointer',
            }}>{t.label}</button>
          ))}
        </div>
        <a href="#/shop/all" className="featured-view-all" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', borderBottom: '1px solid var(--stone)', paddingBottom: 1 }}>View all</a>
      </div>

      {/* Product grid — 4 columns desktop, 2 mobile */}
      <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px 16px' }}>
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={onQuickView}
            onAddWishlist={onAddWishlist}
            isWishlisted={wishlist.includes(p.id)}
          />
        ))}
      </div>
    </section>
  );
};

// Our Values — editorial 3-up section
const OurValues = () => {
  const values = [
    {
      img: '1558769132-cb1aea458c5e',
      title: 'Effortless Elegance',
      body: 'Looking flawless should never feel like a job. We believe your wardrobe should work as flawlessly as you do, making sure you look and feel stunning, no matter how busy your day.',
    },
    {
      img: '1594938890-d380a6a2f06e',
      title: 'The Body is Art',
      body: 'Our designs treat the body as a work of art in motion — marrying Dubai\'s extravagant style with practical everyday wear. Because fashion can be fun and just be art.',
    },
    {
      img: '1529139374559-ee8e0fe74d5b',
      title: 'Ambition in Neutrals',
      body: 'We reject visual chaos. Our neutral palette is a power move. It grounds your look in authority, making sure your effortless combination always makes the loudest statement.',
    },
  ];

  return (
    <section style={{ padding: '100px 40px 0', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, margin: '0 0 56px', letterSpacing: '-0.01em' }}>
        Our <em>Values</em>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {values.map(v => (
          <div key={v.title}>
            <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', marginBottom: 24, background: 'var(--paper-2)' }}>
              <img src={IMG(v.img, 900)} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, fontWeight: 400, margin: '0 0 12px' }}>{v.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--stone)', lineHeight: 1.7, maxWidth: 320, margin: '0 auto' }}>{v.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--stone)' }}>
        live the dream. dress for it
      </div>
    </section>
  );
};

// Zara-style category section — large 2-up then 3-up
const CategoryShelf = () => {
  const topCats = [
    { id: 'ready-to-wear', label: 'Ready to Wear', img: '1571945153237-4929e783af4a' },
    { id: 'swim',          label: 'Swim',           img: '1529139374559-ee8e0fe74d5b' },
  ];
  const bottomCats = [
    { id: 'resortwear', label: 'Resortwear', img: '1490578474895-699cd4e2cf59' },
    { id: 'sets',       label: 'Sets',        img: '1594938890-d380a6a2f06e' },
    { id: 'all',        label: 'View All',    img: '1558769132-cb1aea458c5e' },
  ];

  const CatCard = ({ cat, height = '70vh' }) => {
    const [hov, setHov] = React.useState(false);
    return (
      <a href={`#/shop/${cat.id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="cat-card" style={{ position: 'relative', display: 'block', height, overflow: 'hidden', background: '#f0f0f0' }}
      >
        <img src={IMG(cat.img, 1200)} alt={cat.label} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 1s ease',
          transform: hov ? 'scale(1.04)' : 'scale(1)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '60px 20px 20px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.28))',
        }}>
          <div style={{ color: '#fff', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{cat.label}</div>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.6)', paddingBottom: 1 }}>Shop now</span>
        </div>
      </a>
    );
  };

  return (
    <section style={{ padding: '4px 0 0' }}>
      <div className="cat-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 4 }}>
        {topCats.map(c => <CatCard key={c.id} cat={c} height="75vh" />)}
      </div>
      <div className="cat-bottom" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
        {bottomCats.map(c => <CatCard key={c.id} cat={c} height="55vh" />)}
      </div>
    </section>
  );
};

// Promise / values — Zara-style minimal strip
const Promise = () => {
  const items = [
    { title: 'Free Shipping', body: 'On orders over $150' },
    { title: 'Free Returns', body: '30 days, no questions' },
    { title: 'Sustainably Made', body: '92% natural or recycled fibres' },
    { title: 'Lifetime Repairs', body: 'We fix Rellani garments, free' },
  ];
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', margin: '80px 0 0' }}>
      <div className="promise-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((item, i) => (
          <div key={item.title} className="promise-item" style={{
            padding: '32px 40px',
            borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: 'var(--stone)' }}>{item.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
};


// Instagram strip
const InstagramStrip = () => {
  const photos = [
    '1571945153237-4929e783af4a',
    '1529139374559-ee8e0fe74d5b',
    '1594938890-d380a6a2f06e',
    '1558769132-cb1aea458c5e',
    '1515886657613-9f3515b0c78f',
    '1572804013309-59a88b7e92f1',
  ];
  return (
    <section style={{ padding: '120px 0 0' }}>
      <div className="container" style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 14 }}>The Studio</div>
          <h2 className="t-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: 0 }}>
            <em style={{ fontStyle: 'italic' }}>@rellani</em>studio
          </h2>
        </div>
        <a href="#" className="t-link" style={{ fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="instagram" size={16} />
          Follow on Instagram
        </a>
      </div>
      <div className="insta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
        {photos.map((p, i) => (
          <a key={i} href="#" style={{
            aspectRatio: '1', overflow: 'hidden', position: 'relative', display: 'block',
          }}>
            <img src={IMG(p, 700)} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform .6s var(--ease)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>
        ))}
      </div>
    </section>
  );
};

const HomePage = ({ onQuickView, onAddWishlist, wishlist }) => (
  <div className="page-enter" data-screen-label="01 Home">
    <HomeHero />
    <Marquee />
    <FeaturedBentoGrid onQuickView={onQuickView} onAddWishlist={onAddWishlist} wishlist={wishlist} />
    <OurValues />
    <CategoryShelf />
    <Promise />
    <InstagramStrip />
  </div>
);

window.HomePage = HomePage;

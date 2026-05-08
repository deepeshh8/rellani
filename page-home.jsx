// ===== HOME PAGE =====
const HomeHero = () => {
  const slides = [
    { img: '1490481651871-ab68de25d43d', title: 'New Season', sub: 'Spring — Summer 2026' },
    { img: '1539109136881-3be0616acf4b', title: 'Woman', sub: 'New Collection' },
    { img: '1551232864-3f0890e580d9', title: 'Essentials', sub: 'Always In Stock' },
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
    <section style={{ position: 'relative', width: '100%', height: '90vh', overflow: 'hidden', background: '#f0f0f0' }}>
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
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '40px 40px 44px',
        color: '#fff',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.9 }}>
            {slide.sub}
          </div>
          <h1 style={{
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
          {['New Collection', 'Free Shipping $150+', 'Woman', 'Man', 'New In', 'Free Returns', 'Spring — Summer 2026', 'Accessories'].map(text => (
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
    { id: 'new', label: 'New In' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'knits', label: 'Knitwear' },
  ];

  const products = React.useMemo(() => {
    if (activeTab === 'new') return PRODUCTS.filter(p => p.tags?.includes('new')).slice(0, 8);
    return PRODUCTS.filter(p => p.cat === activeTab).slice(0, 8);
  }, [activeTab]);

  return (
    <section style={{ padding: '64px 40px 0' }}>
      {/* Tab row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
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
        <a href="#/shop/all" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', borderBottom: '1px solid var(--stone)', paddingBottom: 1 }}>View all</a>
      </div>

      {/* Product grid — 4 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px 16px' }}>
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

// Zara-style category section — large 2-up then 3-up
const CategoryShelf = () => {
  const topCats = [
    { id: 'outerwear', label: 'Woman', img: '1539109136881-3be0616acf4b' },
    { id: 'denim', label: 'Man', img: '1583743814966-8936f5b7be1a' },
  ];
  const bottomCats = [
    { id: 'knits', label: 'Knitwear', img: '1576566588028-4147f3842f27' },
    { id: 'dresses', label: 'Dresses', img: '1572804013309-59a88b7e92f1' },
    { id: 'accessories', label: 'Accessories', img: '1483985988355-763728e1935b' },
  ];

  const CatCard = ({ cat, height = '70vh' }) => {
    const [hov, setHov] = React.useState(false);
    return (
      <a href={`#/shop/${cat.id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ position: 'relative', display: 'block', height, overflow: 'hidden', background: '#f0f0f0' }}
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 4 }}>
        {topCats.map(c => <CatCard key={c.id} cat={c} height="75vh" />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((item, i) => (
          <div key={item.title} style={{
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
    '1571945153237-4929e783af4a', '1551488831-00ddcb6c6bd3', '1490481651871-ab68de25d43d',
    '1583743814966-8936f5b7be1a', '1542272604-787c3835535d', '1591047139829-d91aecb6caea',
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
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
    <CategoryShelf />
    <Promise />
    <InstagramStrip />
  </div>
);

window.HomePage = HomePage;

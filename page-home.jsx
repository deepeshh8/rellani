// ===== HOME PAGE =====

// All images verified directly from Unsplash photo pages
const HERO_IMGS = [
  '1763604608266-6ee862e562da', // woman white dress Santorini balcony, sea view
  '1762623930916-4bdcd8dd475d', // woman white dress ocean waves, Dubai
  '1618288956847-283e162b1bfe', // woman white dress Maldives beach
];

const HomeHero = () => {
  const [idx, setIdx] = React.useState(0);
  const next = () => setIdx(i => (i + 1) % HERO_IMGS.length);
  const prev = () => setIdx(i => (i - 1 + HERO_IMGS.length) % HERO_IMGS.length);

  React.useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-full" style={{ position: 'relative', width: '100%', height: '92vh', overflow: 'hidden', background: '#e8e0d4' }}>
      {HERO_IMGS.map((id, i) => (
        <img key={id} src={IMG(id, 2000)} alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        />
      ))}

      {/* gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(45,41,38,0.08) 0%, rgba(45,41,38,0) 40%, rgba(45,41,38,0.42) 100%)', pointerEvents: 'none' }} />

      {/* bottom content */}
      <div className="hero-bottom" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 48px 52px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14, opacity: 0.8 }}>New Collection — Resort 2026</div>
          <h1 className="hero-title" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 0.95, margin: 0, fontWeight: 400, letterSpacing: '-0.01em' }}>
            Dubai Dreamy
          </h1>
          <a href="#/shop/all" style={{ display: 'inline-block', marginTop: 28, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.6)', paddingBottom: 2 }}>
            Explore collection
          </a>
        </div>

        {/* slide counter + arrows */}
        <div className="hero-arrows" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)' }}>
            {String(idx + 1).padStart(2, '0')} / {String(HERO_IMGS.length).padStart(2, '0')}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={prev} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="arrow" size={13} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={next} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="arrow" size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* slide dots */}
      <div style={{ position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {HERO_IMGS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 6, height: 6, background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)', border: 0, padding: 0, cursor: 'pointer', transition: 'width .3s ease' }} />
        ))}
      </div>
    </section>
  );
};

// Editorial split — two large photos side by side (matches design 085810)
const EditorialSplit = () => (
  <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 4 }}>
    {[
      { img: '1762432875839-2a6f3a3ce085', label: 'Ready to Wear', href: '#/shop/ready-to-wear' },
      { img: '1764147385257-ffb883d0c315', label: 'Resortwear',   href: '#/shop/resortwear' },
    ].map(item => {
      const [hov, setHov] = React.useState(false);
      return (
        <a key={item.href} href={item.href}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{ position: 'relative', display: 'block', height: '72vh', overflow: 'hidden', background: 'var(--paper-2)' }}
        >
          <img src={IMG(item.img, 1400)} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 1.2s ease', transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(45,41,38,0.4) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
            <div style={{ color: '#fff', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 1 }}>Shop now</span>
          </div>
        </a>
      );
    })}
  </section>
);

// "Let us put together" — product grid (matches design 085810 middle section)
const FeaturedBentoGrid = ({ onQuickView, onAddWishlist, wishlist }) => {
  const [activeTab, setActiveTab] = React.useState('new');
  const tabs = [
    { id: 'new',           label: 'New In' },
    { id: 'ready-to-wear', label: 'Ready to Wear' },
    { id: 'swim',          label: 'Swim' },
    { id: 'resortwear',    label: 'Resortwear' },
  ];
  const products = React.useMemo(() => {
    if (activeTab === 'new') return PRODUCTS.filter(p => p.tags?.includes('new')).slice(0, 4);
    return PRODUCTS.filter(p => p.cat === activeTab).slice(0, 4);
  }, [activeTab]);

  return (
    <section className="featured-section" style={{ padding: '80px 48px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: 16 }}>Curated for you</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>Let us put together</h2>
      </div>

      {/* tabs */}
      <div className="featured-tab-row" style={{ display: 'flex', justifyContent: 'center', gap: 36, marginBottom: 40, borderBottom: '1px solid var(--line)', paddingBottom: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: activeTab === t.id ? 'var(--ink)' : 'var(--stone)',
            background: 'none', border: 'none',
            borderBottom: activeTab === t.id ? '1px solid var(--ink)' : '1px solid transparent',
            paddingBottom: 14, cursor: 'pointer', transition: 'color .2s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* 4-col grid */}
      <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px 20px' }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddWishlist={onAddWishlist} isWishlisted={wishlist.includes(p.id)} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href="#/shop/all" className="featured-view-all" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>View all pieces</a>
      </div>
    </section>
  );
};

// Polaroid editorial — full-width feature with overlaid product cards (matches design 085920)
const PolaroidEditorial = () => {
  const featured = PRODUCTS.find(p => p.slug === 'crochet-mini-dress') || PRODUCTS[0];
  return (
    <section style={{ position: 'relative', marginTop: 80, height: '75vh', overflow: 'hidden', background: 'var(--paper-3)' }}>
      <img src={IMG('1603204363695-2590827ccc35', 1800)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,41,38,0.08)' }} />

      {/* polaroid card — left */}
      <a href={`#/product/${featured.slug}`} style={{
        position: 'absolute', left: '12%', top: '15%',
        background: '#fff', padding: '10px 10px 28px', width: 220,
        boxShadow: '0 8px 32px rgba(45,41,38,0.18)',
        display: 'block',
      }}>
        <img src={IMG(featured.colors[0].img, 600)} alt={featured.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
        <div style={{ marginTop: 12, paddingLeft: 4 }}>
          <div style={{ fontSize: 11, color: 'var(--ink)', marginBottom: 3 }}>{featured.name} — {featured.colors[0].name}</div>
          <div style={{ fontSize: 11, color: 'var(--stone)' }}>${featured.price}</div>
        </div>
      </a>

      {/* polaroid card — right */}
      <a href={`#/product/${featured.slug}`} style={{
        position: 'absolute', right: '10%', bottom: '10%',
        background: '#fff', padding: '10px 10px 28px', width: 200,
        boxShadow: '0 8px 32px rgba(45,41,38,0.18)',
        transform: 'rotate(-2deg)',
        display: 'block',
      }}>
        <img src={IMG(featured.colors[Math.min(1, featured.colors.length-1)].img, 600)} alt={featured.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
        <div style={{ marginTop: 12, paddingLeft: 4 }}>
          <div style={{ fontSize: 11, color: 'var(--ink)', marginBottom: 3 }}>{featured.name} — {featured.colors[Math.min(1,featured.colors.length-1)].name}</div>
          <div style={{ fontSize: 11, color: 'var(--stone)' }}>${featured.price}</div>
        </div>
      </a>
    </section>
  );
};

// Our Values — 3-up editorial (matches design 085859)
const OurValues = () => {
  const values = [
    {
      img: '1618288956847-283e162b1bfe', // Maldives white dress
      title: 'Effortless Elegance',
      body: 'Looking flawless should never feel like a job. We believe your wardrobe should work as flawlessly as you do, making sure you look and feel stunning no matter how busy your day.',
    },
    {
      img: '1762623930916-4bdcd8dd475d', // white dress Dubai waves
      title: 'The Body is Art',
      body: "Our designs treat the body as a work of art in motion — marrying Dubai's extravagant style with practical everyday wear. Because fashion can be fun and just be art.",
    },
    {
      img: '1763130807744-5123cbe8ce4c', // woman long skirt beach
      title: 'Ambition in Neutrals',
      body: 'We reject visual chaos. Our neutral palette is a power move. It grounds your look in authority, making sure your effortless combination always makes the loudest statement.',
    },
  ];

  return (
    <section style={{ padding: '100px 48px 0', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 400, margin: '0 0 56px', letterSpacing: '-0.01em' }}>
        Our <em style={{ fontStyle: 'italic' }}>Values</em>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {values.map((v, i) => (
          <div key={v.title}>
            <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', marginBottom: 24, background: 'var(--paper-2)' }}>
              <img src={IMG(v.img, 900)} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, fontWeight: 400, margin: '0 0 12px' }}>{v.title}</h3>
            <p style={{ fontSize: 12.5, color: 'var(--stone)', lineHeight: 1.75, maxWidth: 300, margin: '0 auto' }}>{v.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: i===1?20:6, height: 6, background: i===1?'var(--ink)':'var(--line)' }} />)}
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)' }}>live the dream. dress for it</div>
      </div>
    </section>
  );
};

// Category shelf
const CategoryShelf = () => {
  const topCats = [
    { id: 'ready-to-wear', label: 'Ready to Wear', img: '1762432875839-2a6f3a3ce085' },
    { id: 'swim',          label: 'Swim',           img: '1637526997367-d44a21b2c3c3' },
  ];
  const bottomCats = [
    { id: 'resortwear', label: 'Resortwear', img: '1764147385257-ffb883d0c315' },
    { id: 'sets',       label: 'Sets',        img: '1774548073458-6f7096023a50' },
    { id: 'all',        label: 'View All',    img: '1763130807702-ef09e55188ba' },
  ];

  const CatCard = ({ cat, height = '70vh' }) => {
    const [hov, setHov] = React.useState(false);
    return (
      <a href={`#/shop/${cat.id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="cat-card"
        style={{ position: 'relative', display: 'block', height, overflow: 'hidden', background: 'var(--paper-2)' }}
      >
        <img src={IMG(cat.img, 1200)} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 1.2s ease', transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(45,41,38,0.35) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
          <div style={{ color: '#fff', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{cat.label}</div>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 1 }}>Shop now</span>
        </div>
      </a>
    );
  };

  return (
    <section style={{ marginTop: 80 }}>
      <div className="cat-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 4 }}>
        {topCats.map(c => <CatCard key={c.id} cat={c} height="75vh" />)}
      </div>
      <div className="cat-bottom" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
        {bottomCats.map(c => <CatCard key={c.id} cat={c} height="52vh" />)}
      </div>
    </section>
  );
};

// Promise strip
const Promise = () => {
  const items = [
    { title: 'Free Shipping',   body: 'On orders over $150' },
    { title: 'Free Returns',    body: '30 days, no questions' },
    { title: 'Sustainably Made', body: '92% natural fibres' },
    { title: 'Lifetime Repairs', body: 'We fix Rellani garments, free' },
  ];
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginTop: 80 }}>
      <div className="promise-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((item, i) => (
          <div key={item.title} className="promise-item" style={{ padding: '28px 32px', borderLeft: i > 0 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--stone)' }}>{item.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Instagram strip — lifestyle photos (matches design 085847)
const InstagramStrip = () => {
  const photos = [
    '1774548073458-6f7096023a50', // resort woman straw hat
    '1637526997367-d44a21b2c3c3', // bikini on boat
    '1763130807702-ef09e55188ba', // white dress on beach
    '1764057230771-d0ee6efdf056', // bikini grassland
    '1603204363695-2590827ccc35', // white dress elegant
  ];
  return (
    <section style={{ marginTop: 80 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: 6 }}>@rellanidubai</div>
        <a href="#" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, fontWeight: 400, borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>Follow along</a>
      </div>
      <div className="insta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
        {photos.map((id, i) => (
          <a key={i} href="#" style={{ aspectRatio: '1', overflow: 'hidden', display: 'block', background: 'var(--paper-2)', position: 'relative' }}>
            <img src={IMG(id, 700)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .8s ease' }}
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
    <EditorialSplit />
    <FeaturedBentoGrid onQuickView={onQuickView} onAddWishlist={onAddWishlist} wishlist={wishlist} />
    <PolaroidEditorial />
    <OurValues />
    <CategoryShelf />
    <Promise />
    <InstagramStrip />
  </div>
);

window.HomePage = HomePage;

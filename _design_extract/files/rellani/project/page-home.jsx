// ===== HOME PAGE =====
const HomeHero = () => {
  const slides = [
    { img: '1490481651871-ab68de25d43d', title: 'Urban energy', tag: 'Spring Sale' },
    { img: '1539109136881-3be0616acf4b', title: 'Quietly made', tag: 'Editorial' },
    { img: '1551232864-3f0890e580d9', title: 'Slowly built', tag: 'Workshop' },
  ];
  const [idx, setIdx] = React.useState(0);
  const slide = slides[idx];
  const next = () => setIdx(i => (i + 1) % slides.length);
  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);

  return (
    <section className="hero-section" style={{ position: 'relative', padding: '0 16px' }}>
      <div className="hero-stage" style={{
        position: 'relative',
        height: 'min(70vh, 580px)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        background: 'var(--paper-3)',
      }}>
        {slides.map((s, i) => (
          <img key={i} src={IMG(s.img, 1900)} alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: i === idx ? 1 : 0,
              transition: 'opacity .8s var(--ease)',
            }}
          />
        ))}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(20,17,13,0.15) 0%, rgba(20,17,13,0) 35%, rgba(20,17,13,0.55) 100%)',
        }} />

        <div className="hero-content" style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '32px 32px 36px',
          color: 'var(--bone)',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85 }}>
            {slide.tag}
          </div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(40px, 7vw, 88px)',
            lineHeight: 1, letterSpacing: '-0.02em',
            margin: 0,
          }}>{slide.title}</h1>

          <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
            <a href="#/shop/all" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 22px', borderRadius: 'var(--r-pill)',
              background: 'var(--ink)', color: 'var(--bone)',
              fontSize: 14, textDecoration: 'none',
            }}>
              Shop Now
              <span style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--bone)', color: 'var(--ink)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="arrow" size={10} /></span>
            </a>
            <a href="#/lookbook" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 22px', borderRadius: 'var(--r-pill)',
              background: 'var(--bone)', color: 'var(--ink)',
              fontSize: 14, textDecoration: 'none',
            }}>
              Discover
            </a>
          </div>
        </div>

        <div style={{
          position: 'absolute', top: 22, right: 22,
          display: 'flex', gap: 8,
        }}>
          <button onClick={prev} aria-label="Previous" style={{
            width: 34, height: 34, borderRadius: '50%',
            border: '1px solid rgba(251,248,241,0.55)',
            background: 'rgba(20,17,13,0.18)', backdropFilter: 'blur(6px)',
            color: 'var(--bone)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name="arrow" size={11} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button onClick={next} aria-label="Next" style={{
            width: 34, height: 34, borderRadius: '50%',
            border: '1px solid rgba(251,248,241,0.55)',
            background: 'rgba(20,17,13,0.18)', backdropFilter: 'blur(6px)',
            color: 'var(--bone)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name="arrow" size={11} />
          </button>
        </div>

        <div style={{
          position: 'absolute', top: 28, left: 28,
          display: 'flex', gap: 6, alignItems: 'center',
        }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i+1}`} style={{
              width: i === idx ? 22 : 6, height: 6, borderRadius: 3,
              background: i === idx ? 'var(--bone)' : 'rgba(251,248,241,0.45)',
              border: 0, padding: 0, cursor: 'pointer',
              transition: 'width .3s var(--ease)',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Marquee
const Marquee = () => (
  <div style={{
    overflow: 'hidden',
    padding: '28px 0',
    borderBlock: '1px solid var(--line)',
    margin: '64px 0 0',
  }}>
    <div style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', animation: 'marquee 32s linear infinite' }}>
      {Array(2).fill(0).map((_, i) => (
        <React.Fragment key={i}>
          {['Italian wool', 'Japanese selvedge', 'Portuguese suede', 'European linen', 'Vegetable-tanned leather', 'Recycled cashmere', 'Organic cotton', 'Hand-rolled silk'].map(text => (
            <span key={text} style={{
              fontFamily: 'var(--serif)', fontSize: 36, fontStyle: 'italic',
              letterSpacing: '-0.01em', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 56,
            }}>
              {text}
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }}></span>
            </span>
          ))}
        </React.Fragment>
      ))}
    </div>
    <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
  </div>
);

// Bento grid — varied-size cards w/ a featured center model card (Agora-inspired)
const BentoCard = ({ product, onQuickView, onAddWishlist, isWishlisted, area, showName = true, showPrice = false }) => {
  const [hover, setHover] = React.useState(false);
  if (!product) return null;
  return (
    <div
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridArea: area,
        position: 'relative',
        background: 'var(--bone)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        boxShadow: hover ? '0 18px 40px -22px rgba(20,17,13,0.32)' : '0 1px 2px rgba(20,17,13,0.04)',
        transition: 'box-shadow .35s var(--ease), transform .35s var(--ease)',
        transform: hover ? 'translateY(-2px)' : 'none',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onAddWishlist(product.id); }}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(6px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isWishlisted ? 'var(--accent)' : 'var(--ink)',
        }}
      >
        <Icon name={isWishlisted ? 'heart-fill' : 'heart'} size={14} />
      </button>

      <div style={{ position: 'relative', flex: 1, minHeight: 0, background: 'var(--paper-2)' }}>
        <img
          src={IMG(product.colors[0].img, 800)}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform .7s var(--ease)',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>

      {showPrice ? (
        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.1 }}>{product.name}</div>
          <div style={{ fontSize: 13, color: 'var(--stone)', marginTop: 4 }}>From ${product.price.toLocaleString()}</div>
        </div>
      ) : showName ? (
        <div style={{ padding: '12px 14px 14px', textAlign: 'center', fontSize: 13, color: 'var(--ink)' }}>
          {product.name}
        </div>
      ) : null}
    </div>
  );
};

const FeaturedBentoGrid = ({ onQuickView, onAddWishlist, wishlist }) => {
  const [tab, setTab] = React.useState('men');
  const tabs = [
    { id: 'men', label: 'For Men' },
    { id: 'women', label: 'Women' },
  ];

  // pick a stable set per tab — first 12 match the Agora inspo names
  const set = React.useMemo(() => {
    const order = ['silk-whisper', 'sapphire-serenade', 'champagne-cascade', 'zebra-stylist', 'lace-enigma-skirt', 'denim-t-shirt', 'flower-black-hat', 'golden-hour-jumpsuit', 'zxb-t-shirt', 'ember-embrace-xz', 'moonstone-muse-hat'];
    // Prefer manual order, then any others
    const ordered = [];
    PRODUCTS.forEach(() => {});
    return PRODUCTS.filter(p => p.cat !== 'shoes');
  }, [tab]);

  const small = set.slice(0, 12);
  const center = set.find(p => p.name === 'Oasis Jacket') || set[2];
  const oasis = set.find(p => p.name === 'Oasis Jacket') || set[2];

  // model image options keyed by tab
  const modelImg = tab === 'men'
    ? '1617137968427-85924c800a22'   // editorial men
    : '1539109136881-3be0616acf4b';  // editorial women

  return (
    <section style={{ padding: '120px 32px 0', position: 'relative' }}>
      {/* header row: tabs left | centered headline | button right */}
      <div className="bento-header" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        marginBottom: 48,
        gap: 24,
      }}>
        <div className="bento-tabs" style={{ display: 'flex', gap: 28, fontSize: 14 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 0',
                fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? 'var(--ink)' : 'var(--stone)',
                borderBottom: tab === t.id ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--stone)', marginBottom: 8 }}>
            Rellani Seasons
          </div>
          <h2 className="bento-title" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(32px, 4.2vw, 56px)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: 0,
            whiteSpace: 'nowrap',
          }}>
            Details with eco-friendly materials
          </h2>
        </div>

        <div className="bento-collections" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 22px', borderRadius: 'var(--r-pill)',
            background: 'var(--bone)', border: '1px solid var(--line)',
            fontSize: 14, color: 'var(--ink)', cursor: 'pointer',
          }}>
            2026 Collections
            <Icon name="chevron" size={12} />
          </button>
        </div>
      </div>

      {/* bento grid */}
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: '220px',
        gap: 20,
        gridTemplateAreas: `
          "a b m m c d"
          "e f m m g h"
          "k k i j o o"
          "k k l n o o"
        `,
      }}>
        <BentoCard product={small[0]} area="a" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[0]?.id) }} />
        <BentoCard product={small[1]} area="b" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[1]?.id) }} />
        <BentoCard product={small[2]} area="c" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[2]?.id) }} />
        <BentoCard product={small[3]} area="d" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[3]?.id) }} />
        <BentoCard product={small[4]} area="e" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[4]?.id) }} />
        <BentoCard product={small[5]} area="f" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[5]?.id) }} />
        <BentoCard product={small[6]} area="g" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[6]?.id) }} />
        <BentoCard product={small[7]} area="h" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[7]?.id) }} />

        {/* M — featured center model */}
        <div
          onClick={() => onQuickView(center)}
          style={{
            gridArea: 'm', position: 'relative',
            borderRadius: 'var(--r-md)', overflow: 'hidden',
            background: 'var(--paper-2)', cursor: 'pointer',
          }}
        >
          <img
            src={IMG(modelImg, 1200)}
            alt="Featured"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* corner letter */}
          <div style={{
            position: 'absolute', top: 22, left: 26,
            fontFamily: 'var(--serif)', fontSize: 64,
            color: 'rgba(255,255,255,0.85)', lineHeight: 1,
          }}>S</div>
          {/* size selector */}
          <div style={{
            position: 'absolute', bottom: 18, left: 22, right: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.18em',
          }}>
            <div style={{ display: 'flex', gap: 24 }}>
              <span style={{ opacity: 0.6 }}>M</span>
              <span style={{ borderBottom: '1.5px solid currentColor', paddingBottom: 2 }}>L</span>
              <span style={{ opacity: 0.6 }}>XL</span>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="arrow" size={11} />
            </div>
          </div>
        </div>

        <BentoCard product={small[8]} area="i" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[8]?.id) }} />
        <BentoCard product={small[9]} area="j" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[9]?.id) }} />
        <BentoCard product={small[10]} area="l" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[10]?.id) }} />
        <BentoCard product={small[11]} area="n" {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(small[11]?.id) }} />

        {/* K — model card with corner letter */}
        <div
          onClick={() => location.hash = '#/shop/all'}
          style={{
            gridArea: 'k', position: 'relative',
            borderRadius: 'var(--r-md)', overflow: 'hidden',
            background: 'var(--paper-3)', cursor: 'pointer',
          }}
        >
          <img
            src={IMG('1488161628813-04466f872be2', 900)}
            alt="Lookbook"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', top: 22, left: 26,
            fontFamily: 'var(--serif)', fontSize: 64,
            color: 'rgba(255,255,255,0.85)', lineHeight: 1,
          }}>L</div>
          <div style={{
            position: 'absolute', bottom: 18, left: 22, right: 22,
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ opacity: 0.6 }}>XL</span>
            <span style={{ borderBottom: '1.5px solid currentColor', paddingBottom: 2 }}>2XL</span>
            <span style={{ opacity: 0.6 }}>3XL</span>
          </div>
        </div>

        {/* O — Oasis Jacket price feature */}
        <BentoCard product={oasis} area="o" showName={false} showPrice={true} {...{ onQuickView, onAddWishlist, isWishlisted: wishlist.includes(oasis?.id) }} />
      </div>

      {/* pagination dots like inspo */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
        marginTop: 48,
      }}>
        <button style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--bone)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="arrow" size={12} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0,1,2,3].map(i => (
            <span key={i} style={{
              width: i === 2 ? 22 : 6, height: 6, borderRadius: 3,
              background: i === 2 ? 'var(--ink)' : 'var(--line)',
              transition: 'width .3s var(--ease)',
            }} />
          ))}
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--ink)', color: 'var(--bone)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="arrow" size={12} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <a href="#/shop/all" className="btn btn-secondary">
          View all <Icon name="arrow" size={13} />
        </a>
      </div>
    </section>
  );
};

// Big editorial story
const BigEditorial = () => (
  <section className="container" style={{ padding: '120px 32px 0' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'stretch' }}>
      <div style={{
        position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden',
        aspectRatio: '4/5', minHeight: 540,
      }}>
        <img src={IMG('1583743814966-8936f5b7be1a', 1400)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', bottom: 28, left: 28,
          color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
        }}>SHOT 03 / FEATURING WORKSHOP TRENCH</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 0' }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 18 }}>Story 01</div>
          <h2 className="t-display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '0 0 24px' }}>
            Quiet <em style={{ fontStyle: 'italic' }}>hours.</em>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 480, marginBottom: 16 }}>
            There is a particular kind of light that arrives at the end of winter — slow,
            low, generous to materials. We chased it for three days in Lisbon. These are the clothes that came home.
          </p>
          <p style={{ fontSize: 14, color: 'var(--stone)', lineHeight: 1.6, maxWidth: 460 }}>
            Photographs by María Vázquez. Styled by Lana Okonkwo. Featuring the Aria Wool Overcoat,
            the Soft Merino Crew, and the Archive Straight Jean.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <a href="#/lookbook" className="btn btn-primary">Read the story <Icon name="arrow" size={14} /></a>
          <a href="#/shop/all" className="btn btn-ghost">Shop the looks →</a>
        </div>
      </div>
    </div>
  </section>
);

// Categories
const CategoryShelf = () => {
  const cats = [
    { id: 'outerwear', label: 'Outerwear', count: 3, img: '1591047139829-d91aecb6caea' },
    { id: 'knits', label: 'Knits', count: 3, img: '1576566588028-4147f3842f27' },
    { id: 'denim', label: 'Denim', count: 3, img: '1542272604-787c3835535d' },
    { id: 'dresses', label: 'Dresses', count: 2, img: '1539109136881-3be0616acf4b' },
    { id: 'accessories', label: 'Accessories', count: 6, img: '1483985988355-763728e1935b' },
  ];

  return (
    <section className="container" style={{ padding: '120px 32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 14 }}>By category</div>
          <h2 className="t-display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: 0 }}>
            Shop the studio.
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {cats.map(c => (
          <a
            key={c.id}
            href={`#/shop/${c.id}`}
            style={{
              position: 'relative',
              aspectRatio: '3 / 4',
              borderRadius: 'var(--r-md)',
              overflow: 'hidden',
              display: 'block',
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <img src={IMG(c.img, 800)} alt={c.label} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform .8s var(--ease)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(20,17,13,0) 50%, rgba(20,17,13,0.55) 100%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 18, left: 18, right: 18,
              color: 'var(--bone)',
            }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', opacity: 0.85, fontFamily: 'var(--mono)' }}>{c.count} STYLES</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// Promise / values
const Promise = () => {
  const items = [
    { icon: 'truck', title: 'Free shipping over $150', body: 'Carbon-neutral delivery in 2–4 days.' },
    { icon: 'box', title: 'Easy 30-day returns', body: 'No questions, no fees. We mean it.' },
    { icon: 'leaf', title: 'Slowly made, mostly natural', body: '92% of fibers are renewable or recycled.' },
    { icon: 'sparkle', title: 'Repaired, not replaced', body: 'Free repairs on Rellani garments, forever.' },
  ];
  return (
    <section className="container" style={{ padding: '120px 32px 0' }}>
      <div style={{
        background: 'var(--bone)', borderRadius: 'var(--r-lg)',
        padding: '64px 56px',
      }}>
        <div className="t-eyebrow" style={{ marginBottom: 16 }}>The Rellani Promise</div>
        <h2 className="t-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '0 0 48px', maxWidth: 700 }}>
          We build clothes to <em style={{ fontStyle: 'italic' }}>last.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {items.map(i => (
            <div key={i.title} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <Icon name={i.icon} size={22} stroke={1.4} />
              <div style={{ fontSize: 16, fontWeight: 500, marginTop: 6 }}>{i.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--stone)', lineHeight: 1.55 }}>{i.body}</div>
            </div>
          ))}
        </div>
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
    <BigEditorial />
    <CategoryShelf />
    <Promise />
    <InstagramStrip />
  </div>
);

window.HomePage = HomePage;

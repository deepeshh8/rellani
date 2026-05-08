// ===== HEADER WITH SEARCH + NAV =====
const NAV = [
  { label: 'New', cat: 'all', filter: 'new' },
  { label: 'Outerwear', cat: 'outerwear' },
  { label: 'Knits', cat: 'knits' },
  { label: 'Tops', cat: 'tops' },
  { label: 'Denim', cat: 'denim' },
  { label: 'Trousers', cat: 'trousers' },
  { label: 'Dresses', cat: 'dresses' },
  { label: 'Shoes', cat: 'shoes' },
  { label: 'Accessories', cat: 'accessories' },
  { label: 'Lookbook', cat: '__lookbook' },
];

const ANNOUNCEMENTS = [
  'Free shipping on $150+',
  'Spring Editorial',
  'Free returns',
];

const Announcement = () => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ANNOUNCEMENTS.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--bone)',
      fontSize: 12, letterSpacing: '0.08em',
      textAlign: 'center',
      height: 36,
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        transform: `translateY(${10 - idx * 16}px)`,
        transition: 'transform .55s var(--ease)',
      }}>
        {ANNOUNCEMENTS.map((m, i) => (
          <div key={i} style={{ height: 16, lineHeight: '16px' }}>{m}</div>
        ))}
      </div>
    </div>
  );
};

const SearchOverlay = ({ open, onClose }) => {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;
  const q = query.trim().toLowerCase();
  const matchedSugg = q ? SUGGESTIONS.filter(s => s.includes(q)).slice(0, 4) : SUGGESTIONS.slice(0, 6);
  const matchedProd = q
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q) || p.blurb?.toLowerCase().includes(q)).slice(0, 6)
    : PRODUCTS.filter(p => p.tags?.includes('bestseller') || p.tags?.includes('editor-pick')).slice(0, 4);
  const matchedCat = q ? CATEGORIES.filter(c => c.label.toLowerCase().includes(q)) : [];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(20, 17, 13, 0.4)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeInSlow .25s var(--ease)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          maxHeight: '78vh', overflow: 'auto',
          animation: 'fadeIn .3s var(--ease)',
        }}
      >
        <div className="container" style={{ padding: '24px 32px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
            <Icon name="search" size={22} stroke={1.4} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for jackets, jeans, anything…"
              style={{
                flex: 1, border: 0, background: 'transparent',
                fontSize: 22, fontFamily: 'var(--serif)', padding: 0,
                outline: 'none',
              }}
            />
            <button onClick={onClose} className="icon-btn" aria-label="Close">
              <Icon name="close" size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 32, paddingTop: 28 }}>
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>Suggestions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {matchedSugg.map(s => (
                  <button key={s} onClick={() => setQuery(s)} style={{
                    textAlign: 'left', padding: '8px 10px', borderRadius: 'var(--r-sm)',
                    fontSize: 14, transition: 'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,17,13,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{s}</button>
                ))}
                {matchedSugg.length === 0 && <div style={{ fontSize: 13, color: 'var(--stone)' }}>No suggestions</div>}
              </div>
              {matchedCat.length > 0 && (
                <>
                  <div className="t-eyebrow" style={{ marginTop: 24, marginBottom: 12 }}>Categories</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {matchedCat.map(c => (
                      <a key={c.id} href={`#/shop/${c.id}`} onClick={onClose} style={{
                        padding: '8px 10px', borderRadius: 'var(--r-sm)', fontSize: 14,
                      }}>{c.label}</a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>Popular</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Aria Wool Overcoat', 'Soft Merino Crew', 'Archive Straight Jean', 'Campus Runner', 'Every-Day Tote'].map(s => (
                  <button key={s} onClick={() => setQuery(s)} style={{
                    textAlign: 'left', padding: '8px 10px', borderRadius: 'var(--r-sm)',
                    fontSize: 14, color: 'var(--ink)',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>{q ? 'Products' : 'Editor picks'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {matchedProd.map(p => (
                  <a key={p.id} href={`#/product/${p.slug}`} onClick={onClose} style={{
                    display: 'flex', gap: 12, padding: 8, borderRadius: 'var(--r-md)',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,17,13,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: 64, height: 80, background: 'var(--paper-2)', borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--stone)' }}>{p.cat}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, marginTop: 4 }}>${p.price}</div>
                    </div>
                  </a>
                ))}
                {matchedProd.length === 0 && <div style={{ fontSize: 13, color: 'var(--stone)', gridColumn: 'span 2' }}>No products match — try another word.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ cartCount, wishlistCount, onOpenCart, onOpenSearch, route }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isPLP = route.startsWith('/shop');
  const currentCat = isPLP ? route.split('/')[2] : null;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--paper)',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background .25s var(--ease), border-color .25s var(--ease)',
    }}>
      <Announcement />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '18px 32px',
        gap: 24,
      }}>
        {/* left: nav */}
        <nav style={{ display: 'flex', gap: 22, alignItems: 'center', fontSize: 13.5 }}>
          <a href="#/shop/all" style={{ position: 'relative', paddingBottom: 4 }}>
            Shop
            {isPLP && <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--ink)' }} />}
          </a>
          <a href="#/lookbook" style={{ position: 'relative', paddingBottom: 4 }}>
            Lookbook
            {route.startsWith('/lookbook') && <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--ink)' }} />}
          </a>
          <a href="#/about" style={{ paddingBottom: 4 }}>About</a>
        </nav>

        {/* center: wordmark */}
        <a href="#/" style={{ justifySelf: 'center' }}>
          <Wordmark size={28} />
        </a>

        {/* right: actions */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifySelf: 'end' }}>
          <button onClick={onOpenSearch} className="icon-btn" aria-label="Search">
            <Icon name="search" size={18} stroke={1.5} />
          </button>
          <a href="#/account" className="icon-btn" aria-label="Account">
            <Icon name="user" size={18} stroke={1.5} />
          </a>
          <a href="#/wishlist" className="icon-btn" aria-label="Wishlist" style={{ position: 'relative' }}>
            <Icon name="heart" size={18} stroke={1.5} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--accent)', color: 'var(--bone)',
                fontSize: 9, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{wishlistCount}</span>
            )}
          </a>
          <button onClick={onOpenCart} className="icon-btn" aria-label="Cart" style={{ position: 'relative' }} id="cart-icon">
            <Icon name="bag" size={18} stroke={1.5} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--ink)', color: 'var(--bone)',
                fontSize: 9.5, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* sub-nav for category quick-jumps (visible on PLP) */}
      {isPLP && (
        <div style={{
          borderTop: '1px solid var(--line)',
          background: 'var(--paper)',
        }}>
          <div className="container" style={{ display: 'flex', gap: 8, padding: '12px 32px', overflowX: 'auto' }}>
            {CATEGORIES.map(c => (
              <a
                key={c.id}
                href={`#/shop/${c.id}`}
                style={{
                  padding: '6px 14px', borderRadius: 'var(--r-pill)',
                  fontSize: 12.5, letterSpacing: '0.03em',
                  background: currentCat === c.id ? 'var(--ink)' : 'transparent',
                  color: currentCat === c.id ? 'var(--bone)' : 'var(--ink)',
                  border: currentCat === c.id ? 'none' : '1px solid var(--line)',
                  whiteSpace: 'nowrap',
                  transition: 'all .2s var(--ease)',
                }}
              >{c.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer style={{
    background: 'var(--ink)',
    color: 'var(--bone)',
    marginTop: 80,
    paddingTop: 80,
    paddingBottom: 32,
  }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 34, lineHeight: 1, marginBottom: 16, letterSpacing: '-0.01em' }}>rellani</div>
          <p style={{ fontSize: 13.5, color: 'rgba(251, 248, 241, 0.72)', maxWidth: 320, lineHeight: 1.6 }}>
            Quietly considered clothing, designed in a small studio in Brooklyn and made in family-run mills across Italy, Portugal and Japan.
          </p>
          <div style={{ marginTop: 28 }}>
            <div className="t-eyebrow" style={{ color: 'rgba(251, 248, 241, 0.5)', marginBottom: 10 }}>Letter from the studio</div>
            <div style={{ display: 'flex', gap: 8, maxWidth: 360 }}>
              <input className="input-underline" placeholder="your@email.com" style={{ color: 'var(--bone)', borderBottomColor: 'rgba(251,248,241,0.25)' }} />
              <button className="icon-btn" style={{ color: 'var(--bone)' }} aria-label="Subscribe">
                <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
        </div>
        {[
          { title: 'Shop', items: [['New', '#/shop/all'], ['Outerwear', '#/shop/outerwear'], ['Knits', '#/shop/knits'], ['Denim', '#/shop/denim'], ['Shoes', '#/shop/shoes']] },
          { title: 'Help', items: [['Contact', '#'], ['Shipping', '#'], ['Returns', '#'], ['Size guide', '#'], ['Care guide', '#']] },
          { title: 'Studio', items: [['About us', '#/about'], ['Lookbook', '#/lookbook'], ['Sustainability', '#'], ['Stockists', '#']] },
          { title: 'Follow', items: [['Instagram', '#'], ['TikTok', '#'], ['Pinterest', '#'], ['Spotify', '#']] },
        ].map(col => (
          <div key={col.title}>
            <div className="t-eyebrow" style={{ color: 'rgba(251, 248, 241, 0.5)', marginBottom: 16 }}>{col.title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map(([label, href]) => (
                <li key={label}><a href={href} style={{ fontSize: 13.5, color: 'rgba(251, 248, 241, 0.85)' }}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        paddingTop: 24, borderTop: '1px solid rgba(251, 248, 241, 0.12)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        fontSize: 12, color: 'rgba(251, 248, 241, 0.5)',
      }}>
        <div>© 2026 Rellani Studio. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="#" style={{ color: 'inherit' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit' }}>Terms</a>
          <a href="#" style={{ color: 'inherit' }}>Cookies</a>
          <a href="#" style={{ color: 'inherit', display: 'flex', gap: 6, alignItems: 'center' }}>
            <Icon name="global" size={13} />
            United States / USD
          </a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Header, Footer, SearchOverlay });

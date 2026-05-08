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
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isPLP = route.startsWith('/shop');
  const currentCat = isPLP ? route.split('/')[2] : null;
  const linkStyle = { fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'border-color .2s',
    }}>
      <Announcement />

      {/* Main nav row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 24px',
        height: 52,
      }}>
        {/* Left nav */}
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <a href="#/shop/all" style={{ ...linkStyle, borderBottom: isPLP ? '1px solid var(--ink)' : 'none', paddingBottom: 1 }}>Shop</a>
          <a href="#/lookbook" style={{ ...linkStyle, borderBottom: route.startsWith('/lookbook') ? '1px solid var(--ink)' : 'none', paddingBottom: 1 }}>Lookbook</a>
          <a href="#/about" style={linkStyle}>About</a>
        </nav>

        {/* Center wordmark */}
        <a href="#/" style={{ justifySelf: 'center', letterSpacing: '0.18em', fontSize: 20, textTransform: 'uppercase', fontWeight: 400 }}>
          RELLANI
        </a>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'end', gap: 2 }}>
          <button onClick={onOpenSearch} className="icon-btn" aria-label="Search">
            <Icon name="search" size={17} stroke={1.4} />
          </button>
          <a href="#/account" className="icon-btn" aria-label="Account">
            <Icon name="user" size={17} stroke={1.4} />
          </a>
          <a href="#/wishlist" className="icon-btn" aria-label="Wishlist" style={{ position: 'relative' }}>
            <Icon name="heart" size={17} stroke={1.4} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 6, height: 6,
                background: 'var(--ink)',
                borderRadius: '50%',
              }} />
            )}
          </a>
          <button onClick={onOpenCart} className="icon-btn" aria-label="Cart" style={{ position: 'relative' }} id="cart-icon">
            <Icon name="bag" size={17} stroke={1.4} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 6, height: 6,
                background: 'var(--ink)',
                borderRadius: '50%',
              }} />
            )}
          </button>
        </div>
      </div>

      {/* Category sub-nav on PLP */}
      {isPLP && (
        <div style={{ borderTop: '1px solid var(--line)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', padding: '0 24px' }}>
            {CATEGORIES.map(c => (
              <a key={c.id} href={`#/shop/${c.id}`} style={{
                padding: '10px 16px',
                fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: currentCat === c.id ? 'var(--ink)' : 'var(--stone)',
                borderBottom: currentCat === c.id ? '1px solid var(--ink)' : '1px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color .15s',
              }}>{c.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--line)', marginTop: 80 }}>
    {/* Email signup */}
    <div style={{ borderBottom: '1px solid var(--line)', padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>Stay in the loop</div>
        <div style={{ fontSize: 13, color: 'var(--stone)' }}>New arrivals, exclusive access, and nothing else.</div>
      </div>
      <div style={{ display: 'flex', gap: 0, flex: '0 0 400px' }}>
        <input className="input-underline" placeholder="Email address" style={{ flex: 1, fontSize: 13 }} />
        <button style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 20px', background: 'var(--ink)', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Subscribe
        </button>
      </div>
    </div>

    {/* Links */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '48px 40px 40px', gap: 32 }}>
      {[
        { title: 'Shop', items: [['New In', '#/shop/all'], ['Outerwear', '#/shop/outerwear'], ['Knitwear', '#/shop/knits'], ['Denim', '#/shop/denim'], ['Dresses', '#/shop/dresses'], ['Shoes', '#/shop/shoes'], ['Accessories', '#/shop/accessories']] },
        { title: 'Help', items: [['Contact', '#'], ['Shipping Info', '#'], ['Returns', '#'], ['Size Guide', '#'], ['Care Guide', '#'], ['Track Order', '#']] },
        { title: 'Company', items: [['About Rellani', '#/about'], ['Lookbook', '#/lookbook'], ['Sustainability', '#'], ['Careers', '#'], ['Stockists', '#']] },
        { title: 'Follow', items: [['Instagram', '#'], ['TikTok', '#'], ['Pinterest', '#'], ['Spotify', '#']] },
      ].map(col => (
        <div key={col.title}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>{col.title}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {col.items.map(([label, href]) => (
              <li key={label}><a href={href} style={{ fontSize: 12, color: 'var(--stone)', letterSpacing: '0.02em' }}>{label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: '1px solid var(--line)',
      padding: '20px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 11, color: 'var(--stone)', letterSpacing: '0.04em',
    }}>
      <div style={{ letterSpacing: '0.18em', fontWeight: 400 }}>RELLANI © 2026</div>
      <div style={{ display: 'flex', gap: 24 }}>
        <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'inherit' }}>Terms of Use</a>
        <a href="#" style={{ color: 'inherit' }}>Cookies</a>
        <a href="#" style={{ color: 'inherit', display: 'flex', gap: 5, alignItems: 'center' }}>
          <Icon name="global" size={12} /> United States / USD
        </a>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Header, Footer, SearchOverlay });

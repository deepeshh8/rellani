// ===== RELLANI PRIMITIVES =====
// Icons + small reusable components

// ====== ICONS (clean 1.5px stroke, 24px) ======
const Icon = ({ name, size = 20, stroke = 1.5, ...rest }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
    'heart-fill': <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" fill="currentColor" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
    close: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    'arrow-up': <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
    'arrow-left': <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
    'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    'arrow-diag': <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    'chev-right': <path d="m9 6 6 6-6 6" />,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    filter: <><path d="M3 6h18" /><path d="M6 12h12" /><path d="M10 18h4" /></>,
    sort: <><path d="M3 7h18" /><path d="M6 12h12" /><path d="M10 17h4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    rows: <><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    zoom: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /><path d="M11 8v6M8 11h6" /></>,
    truck: <><rect x="2" y="7" width="12" height="9" rx="1" /><path d="M14 10h4l3 3v3h-7" /><circle cx="6.5" cy="17.5" r="1.5" fill="currentColor" /><circle cx="17.5" cy="17.5" r="1.5" fill="currentColor" /></>,
    leaf: <><path d="M21 4c-9 0-17 6-17 14a3 3 0 0 0 3 3c8 0 14-8 14-17Z" /><path d="M4 20 14 9" /></>,
    'global': <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></>,
    sliders: <><path d="M4 6h10" /><path d="M18 6h2" /><circle cx="16" cy="6" r="2" /><path d="M4 18h2" /><path d="M10 18h10" /><circle cx="8" cy="18" r="2" /><path d="M4 12h6" /><path d="M14 12h6" /><circle cx="12" cy="12" r="2" /></>,
    star: <path d="m12 3 2.5 6 6.5.6-5 4.4 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.6 9.5 9 12 3Z" />,
    'star-fill': <path d="m12 3 2.5 6 6.5.6-5 4.4 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.6 9.5 9 12 3Z" fill="currentColor" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></>,
    play: <path d="M7 4v16l13-8L7 4Z" fill="currentColor" />,
    menu: <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>,
    'lock': <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
    'card': <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></>,
    'apple-pay': <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M9 12c-.5-.6-.5-1.5 0-2 .4-.5 1-.7 1.5-.5M15 16c-.5.6-1.3.6-1.8 0-.6-.6-.6-2 0-2.6" /></>,
    'box': <><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

// ====== MARK / WORDMARK ======
const RellaniMark = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1" />
    <path d="M11 22V10h6c2.2 0 4 1.6 4 3.8 0 1.7-1 3-2.5 3.5L22 22h-2.6l-3.2-4.5H13V22h-2Zm2-6.4h3.8c1.3 0 2.2-.8 2.2-1.9s-.9-1.9-2.2-1.9H13v3.8Z" fill={color} />
  </svg>
);

const Wordmark = ({ size = 26 }) => (
  <span style={{
    fontFamily: 'var(--serif)',
    fontSize: size,
    letterSpacing: '-0.01em',
    fontWeight: 400,
    lineHeight: 1,
    fontFeatureSettings: '"liga" 1, "dlig" 1',
  }}>rellani</span>
);

// ====== STAR RATING ======
const Stars = ({ value = 4.5, size = 12 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span style={{ display: 'inline-flex', gap: 1, color: 'var(--ink)' }}>
      {[0,1,2,3,4].map(i => (
        <Icon key={i} name={i < full || (i === full && half) ? 'star-fill' : 'star'} size={size} stroke={1.2} />
      ))}
    </span>
  );
};

// ====== BADGE ======
const Badge = ({ children, variant = 'default' }) => {
  const styles = {
    default: { background: 'var(--bone)', color: 'var(--ink)' },
    new: { background: 'var(--ink)', color: 'var(--bone)' },
    sale: { background: 'var(--accent)', color: 'var(--bone)' },
    soft: { background: 'var(--paper-3)', color: 'var(--ink)' },
  };
  return (
    <span style={{
      ...styles[variant],
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '4px 8px',
      borderRadius: 'var(--r-pill)',
      fontWeight: 500,
    }}>{children}</span>
  );
};

// ====== TOAST ======
const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--ink)', color: 'var(--bone)', padding: '14px 22px',
      borderRadius: 'var(--r-pill)', fontSize: 13.5, zIndex: 1000,
      animation: 'fadeIn .25s var(--ease)', boxShadow: 'var(--shadow-lg)',
      display: 'flex', gap: 10, alignItems: 'center',
    }}>
      <Icon name="check" size={16} />
      {message}
    </div>
  );
};

// ====== PRODUCT CARD ======
const ProductCard = ({ product, onQuickView, onAddWishlist, isWishlisted, density = 'normal' }) => {
  const [hovered, setHovered] = React.useState(false);
  const [colorIdx, setColorIdx] = React.useState(0);
  const color = product.colors[colorIdx];
  const altImg = product.colors[(colorIdx + 1) % product.colors.length];
  const isNew = product.tags?.includes('new');
  const isBest = product.tags?.includes('bestseller');

  return (
    <a
      href={`#/product/${product.slug}`}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', cursor: 'pointer' }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        background: 'var(--paper-2)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        marginBottom: 12,
      }}>
        <img
          src={IMG(color.img, 800)}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'opacity .35s var(--ease), transform .8s var(--ease)',
            opacity: hovered ? 0 : 1,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        <img
          src={IMG(altImg.img, 800)}
          alt=""
          loading="lazy"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'opacity .4s var(--ease), transform .8s var(--ease)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1.03)' : 'scale(1.06)',
          }}
        />

        {/* badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {isNew && <Badge variant="new">New</Badge>}
          {isBest && <Badge variant="soft">Bestseller</Badge>}
        </div>

        {/* wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddWishlist?.(product.id); }}
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(251, 248, 241, 0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            transition: 'transform .2s var(--ease)',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Icon name={isWishlisted ? 'heart-fill' : 'heart'} size={16} stroke={1.6} />
        </button>

        {/* quick view (slides up on hover) */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView?.(product); }}
          style={{
            position: 'absolute', left: 12, right: 12, bottom: 12,
            background: 'var(--ink)', color: 'var(--bone)',
            padding: '11px 14px', borderRadius: 'var(--r-pill)',
            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            transform: hovered ? 'translateY(0)' : 'translateY(110%)',
            opacity: hovered ? 1 : 0,
            transition: 'transform .35s var(--ease), opacity .35s var(--ease)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontWeight: 500,
          }}
        >
          <Icon name="eye" size={14} />
          Quick view
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2, color: 'var(--ink)' }}>
            {product.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--stone)' }}>
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
          ${product.price}
        </div>
      </div>

      {/* color swatches */}
      <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
        {product.colors.slice(0, 5).map((c, i) => (
          <button
            key={c.name}
            onMouseEnter={() => setColorIdx(i)}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setColorIdx(i); }}
            aria-label={c.name}
            style={{
              width: 14, height: 14, borderRadius: '50%',
              background: c.hex,
              border: i === colorIdx ? '1.5px solid var(--ink)' : '1px solid rgba(20,17,13,0.15)',
              boxShadow: 'inset 0 0 0 2px var(--paper)',
              cursor: 'pointer',
              transition: 'transform .15s var(--ease)',
            }}
          />
        ))}
        {product.colors.length > 5 && (
          <span style={{ fontSize: 10, color: 'var(--stone)', alignSelf: 'center', marginLeft: 2 }}>
            +{product.colors.length - 5}
          </span>
        )}
      </div>
    </a>
  );
};

Object.assign(window, { Icon, RellaniMark, Wordmark, Stars, Badge, Toast, ProductCard });

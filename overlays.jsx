// ===== OVERLAYS: Quick view modal =====
const QuickView = ({ product, onClose, onAdd, onAddWishlist, isWishlisted }) => {
  const [colorIdx, setColorIdx] = React.useState(0);
  const [size, setSize] = React.useState(null);
  if (!product) return null;
  const color = product.colors[colorIdx];

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 250,
      background: 'rgba(20,17,13,0.5)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'fadeInSlow .25s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper)', borderRadius: 'var(--r-lg)',
        maxWidth: 1080, width: '100%', maxHeight: '92vh', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        animation: 'scaleIn .3s var(--ease)',
      }}>
        <div style={{ background: 'var(--paper-2)', position: 'relative' }}>
          <img src={IMG(color.img, 1200)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: 40, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="t-eyebrow">{product.cat}</span>
            <button onClick={onClose} className="icon-btn"><Icon name="close" size={18} /></button>
          </div>
          <h2 className="t-display" style={{ fontSize: 38, margin: '0 0 8px' }}>{product.name}</h2>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, marginBottom: 16 }}>${product.price}</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 24 }}>{product.blurb}</p>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12.5, marginBottom: 8, color: 'var(--stone)' }}>Color: <span style={{ color: 'var(--ink)' }}>{color.name}</span></div>
            <div style={{ display: 'flex', gap: 8 }}>
              {product.colors.map((c, i) => (
                <button key={c.name} onClick={() => setColorIdx(i)} style={{
                  width: 28, height: 28, borderRadius: '50%', background: c.hex,
                  border: i === colorIdx ? '2px solid var(--ink)' : '1px solid rgba(20,17,13,0.18)',
                  boxShadow: i === colorIdx ? 'inset 0 0 0 2px var(--paper)' : 'none',
                }} />
              ))}
            </div>
          </div>

          {product.sizeKind !== 'one' && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12.5, marginBottom: 8, color: 'var(--stone)' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} style={{
                    minWidth: 48, padding: '10px 14px', borderRadius: 'var(--r-pill)',
                    border: '1px solid', borderColor: size === s ? 'var(--ink)' : 'var(--line)',
                    background: size === s ? 'var(--ink)' : 'transparent',
                    color: size === s ? 'var(--bone)' : 'var(--ink)', fontSize: 13,
                  }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <button className="btn btn-primary btn-block btn-lg" onClick={(e) => { onAdd(product, color.name, size, 1, e.currentTarget); onClose(); }}>
              Add to bag — ${product.price}
            </button>
            <button onClick={() => onAddWishlist(product.id)} className="icon-btn" style={{ width: 48, height: 48, border: '1px solid var(--line)' }}>
              <Icon name={isWishlisted ? 'heart-fill' : 'heart'} size={18} />
            </button>
          </div>
          <a href={`#/product/${product.slug}`} onClick={onClose} className="t-link" style={{ marginTop: 14, fontSize: 13, alignSelf: 'center' }}>View full details →</a>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="page-enter container-sm" style={{ padding: '60px 32px 80px' }} data-screen-label="10 About">
    <div className="t-eyebrow" style={{ marginBottom: 14 }}>About the studio</div>
    <h1 className="t-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', margin: '0 0 48px' }}>
      Quietly <em style={{ fontStyle: 'italic' }}>considered</em> clothing, made slowly.
    </h1>
    <div style={{ aspectRatio: '21/9', borderRadius: 'var(--r-lg)', overflow: 'hidden', marginBottom: 40 }}>
      <img src={IMG('1620799140408-edc6dcb6d633', 1800)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p>Rellani started in a single room above a bakery in Brooklyn, where two of us spent a winter cutting samples on a borrowed pattern table. Six years later there are nine of us, and we still cut samples on the same table.</p>
      <p>We design four small collections a year. Each piece is made in a workshop we know — most of them family-run, all of them small. We visit them twice a year. We pay for the samples even when they don't work, because the people making them deserve their time.</p>
      <p>We believe that clothing should outlast the season it was made for. We offer free repairs on every Rellani garment, forever. If something breaks, we'll fix it. If it can't be fixed, we'll find a way.</p>
    </div>
  </div>
);

const JournalPage = () => (
  <div className="page-enter container" style={{ padding: '60px 32px 80px' }} data-screen-label="11 Journal">
    <div className="t-eyebrow" style={{ marginBottom: 14 }}>Journal</div>
    <h1 className="t-display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '0 0 56px' }}>
      Notes from the <em style={{ fontStyle: 'italic' }}>studio.</em>
    </h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {[
        { tag: 'Materials', title: 'On the merino we keep going back to', date: 'Apr 12, 2026', img: '1620012253295-c15cc3e65df4' },
        { tag: 'Travel', title: 'Three days in Biella', date: 'Mar 28, 2026', img: '1591047139829-d91aecb6caea' },
        { tag: 'Process', title: 'Why we don\'t do drops', date: 'Mar 02, 2026', img: '1572804013309-59a88b7e92f1' },
      ].map(a => (
        <a key={a.title} href="#" style={{ display: 'block' }}>
          <div style={{ aspectRatio: '4/5', borderRadius: 'var(--r-md)', overflow: 'hidden', marginBottom: 16 }}>
            <img src={IMG(a.img, 800)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="t-eyebrow" style={{ marginBottom: 8 }}>{a.tag}</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.1, marginBottom: 8 }}>{a.title}</h2>
          <div style={{ fontSize: 12.5, color: 'var(--stone)' }}>{a.date} · 4 min read</div>
        </a>
      ))}
    </div>
  </div>
);

window.QuickView = QuickView;
window.AboutPage = AboutPage;
window.JournalPage = JournalPage;

// ===== PRODUCT DETAIL PAGE (PDP) =====
const PDPPage = ({ slug, onAdd, onAddWishlist, wishlist }) => {
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) return <div className="container" style={{ padding: 80, textAlign: 'center' }}>Not found.</div>;

  const [colorIdx, setColorIdx] = React.useState(0);
  const [size, setSize] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const [imgIdx, setImgIdx] = React.useState(0);
  const [zoomOpen, setZoomOpen] = React.useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = React.useState(false);
  const [sticky, setSticky] = React.useState(false);
  const [accordion, setAccordion] = React.useState('details');

  React.useEffect(() => {
    const el = document.getElementById('pdp-buybox');
    const onScroll = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setSticky(r.bottom < 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const color = product.colors[colorIdx];
  const gallery = [
    IMG(color.img, 1400),
    IMG(product.colors[(colorIdx + 1) % product.colors.length].img, 1400),
    IMG(product.colors[(colorIdx + 2) % product.colors.length].img, 1400),
    IMG(product.gallery[0]?.split('photo-')[1]?.split('?')[0] || product.colors[0].img, 1400),
  ];

  // related
  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  const handleAdd = (e) => {
    if (!size && product.sizes.length > 1) {
      const sizeRow = document.getElementById('size-row');
      sizeRow?.animate([
        { transform: 'translateX(0)' }, { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' }, { transform: 'translateX(0)' },
      ], { duration: 280 });
      return;
    }
    onAdd(product, color.name, size, qty, e?.currentTarget);
  };

  return (
    <div className="page-enter" data-screen-label={`03 PDP — ${product.name}`}>
      {/* Sticky add-to-cart */}
      {sticky && (
        <div style={{
          position: 'fixed', top: 84, left: 0, right: 0, zIndex: 40,
          background: 'rgba(242, 236, 224, 0.97)', backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--line)',
          animation: 'fadeIn .25s var(--ease)',
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 32px', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <img src={IMG(color.img, 200)} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 'var(--r-sm)' }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{product.name}</div>
                <div style={{ fontSize: 12, color: 'var(--stone)' }}>{color.name} · ${product.price}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {product.sizes.length > 1 && (
                <select value={size || ''} onChange={e => setSize(e.target.value)} style={{ border: '1px solid var(--line)', padding: '8px 12px', borderRadius: 'var(--r-pill)', fontSize: 13, background: 'var(--bone)' }}>
                  <option value="">Select size</option>
                  {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
              <button className="btn btn-primary" onClick={handleAdd}>
                Add — ${product.price * qty}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container" style={{ padding: '24px 32px 0' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--stone)', marginBottom: 24, fontFamily: 'var(--mono)' }}>
          <a href="#/">Home</a> / <a href="#/shop/all">Shop</a> / <a href={`#/shop/${product.cat}`}>{product.cat}</a> / {product.name}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          {/* Gallery */}
          <div style={{ display: 'flex', gap: 16 }}>
            {/* thumbs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{
                  width: 64, height: 80, borderRadius: 'var(--r-sm)', overflow: 'hidden',
                  border: imgIdx === i ? '2px solid var(--ink)' : '1px solid var(--line)',
                  padding: 0, background: 'var(--paper-2)', flexShrink: 0,
                }}>
                  <img src={g} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            {/* main */}
            <div style={{ flex: 1, position: 'sticky', top: 130, alignSelf: 'flex-start' }}>
              <div
                onClick={() => setZoomOpen(true)}
                style={{
                  position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--r-lg)',
                  overflow: 'hidden', cursor: 'zoom-in', background: 'var(--paper-2)',
                }}>
                <img
                  key={imgIdx + '-' + colorIdx}
                  src={gallery[imgIdx]}
                  alt={product.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    animation: 'fadeInSlow .3s var(--ease)',
                  }}
                />
                <button style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(251, 248, 241, 0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}>
                  <Icon name="zoom" size={16} />
                </button>
                {product.tags?.includes('new') && (
                  <div style={{ position: 'absolute', top: 16, left: 16 }}>
                    <Badge variant="new">New</Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div id="pdp-buybox" style={{ paddingTop: 8 }}>
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>{product.cat} · Spring 2026</div>
            <h1 className="t-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: '0 0 12px' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <Stars value={product.rating} />
              <span style={{ fontSize: 12.5, color: 'var(--stone)' }}>
                {product.rating.toFixed(1)} · {product.reviews} reviews
              </span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 16, marginBottom: 24 }}>
              ${product.price}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 32 }}>
              {product.blurb}
            </p>

            {/* Color */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Color</span>
                <span style={{ fontSize: 13, color: 'var(--stone)' }}>{color.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => { setColorIdx(i); setImgIdx(0); }}
                    aria-label={c.name}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: c.hex,
                      border: i === colorIdx ? '2px solid var(--ink)' : '1px solid rgba(20,17,13,0.18)',
                      boxShadow: i === colorIdx ? 'inset 0 0 0 3px var(--paper)' : 'none',
                      cursor: 'pointer',
                      transition: 'transform .15s var(--ease)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            {product.sizeKind !== 'one' && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Size {product.sizeKind === 'waist' && <span style={{ color: 'var(--stone)' }}>(waist)</span>}</span>
                  <button onClick={() => setSizeGuideOpen(true)} className="t-link" style={{ fontSize: 12.5 }}>
                    Size guide
                  </button>
                </div>
                <div id="size-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      style={{
                        minWidth: 56, padding: '12px 16px',
                        borderRadius: 'var(--r-pill)',
                        border: '1px solid',
                        borderColor: size === s ? 'var(--ink)' : 'var(--line)',
                        background: size === s ? 'var(--ink)' : 'transparent',
                        color: size === s ? 'var(--bone)' : 'var(--ink)',
                        fontSize: 13, fontWeight: 500,
                        transition: 'all .2s var(--ease)',
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: 14, lineHeight: 0 }}>
                  <Icon name="minus" size={14} />
                </button>
                <span style={{ minWidth: 28, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 14 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ padding: 14, lineHeight: 0 }}>
                  <Icon name="plus" size={14} />
                </button>
              </div>
              <button className="btn btn-primary btn-lg btn-block" onClick={handleAdd}>
                Add to bag — ${product.price * qty}
              </button>
              <button
                onClick={() => onAddWishlist(product.id)}
                className="icon-btn"
                style={{ width: 48, height: 48, border: '1px solid var(--line)' }}
                aria-label="Wishlist">
                <Icon name={wishlist.includes(product.id) ? 'heart-fill' : 'heart'} size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 18, fontSize: 12.5, color: 'var(--stone)', marginBottom: 32 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="truck" size={14} /> Free shipping
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="box" size={14} /> 30-day returns
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="leaf" size={14} /> Free repairs, forever
              </span>
            </div>

            {/* Accordion */}
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {[
                { id: 'details', label: 'Details & materials', body: (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(product.detail || ['Crafted slowly in a family-run workshop', 'Made-to-last construction', 'Earns a patina with use']).map(d => (
                      <li key={d} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink-2)' }}>
                        <span style={{ color: 'var(--stone)' }}>—</span> {d}
                      </li>
                    ))}
                  </ul>
                )},
                { id: 'care', label: 'Care', body: (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(product.care || ['Wash with care', 'Air dry', 'Iron on low']).map(d => (
                      <li key={d} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink-2)' }}>
                        <span style={{ color: 'var(--stone)' }}>—</span> {d}
                      </li>
                    ))}
                  </ul>
                )},
                { id: 'shipping', label: 'Shipping & returns', body: (
                  <p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
                    Free carbon-neutral shipping on orders over $150. Standard delivery takes 2–4 business days.
                    All Rellani garments may be returned for any reason within 30 days, in original condition.
                  </p>
                )},
              ].map(s => (
                <div key={s.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button
                    onClick={() => setAccordion(accordion === s.id ? null : s.id)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      width: '100%', padding: '18px 0', fontWeight: 500, fontSize: 14,
                    }}>
                    {s.label}
                    <Icon name={accordion === s.id ? 'minus' : 'plus'} size={14} />
                  </button>
                  {accordion === s.id && (
                    <div style={{ padding: '0 0 20px', animation: 'fadeIn .2s' }}>
                      {s.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section style={{ marginTop: 96, padding: '48px 0', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>What people say</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 80, lineHeight: 1, marginBottom: 8 }}>
                {product.rating.toFixed(1)}
              </div>
              <Stars value={product.rating} size={16} />
              <div style={{ fontSize: 13, color: 'var(--stone)', marginTop: 8 }}>
                Based on {product.reviews} reviews
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { name: 'Mira K.', rating: 5, when: '2 weeks ago', body: 'Exactly the piece I was hoping for. The fabric has weight without bulk and the cut is forgiving but never sloppy.' },
                { name: 'Tomás G.', rating: 4, when: 'a month ago', body: 'Slightly more relaxed than I expected — went down a size and it’s perfect. Customer service was easy.' },
                { name: 'Sara V.', rating: 5, when: 'a month ago', body: 'I’ve worn this nearly every day. The quality is obvious from across the room. Worth every dollar.' },
              ].map((r, i) => (
                <div key={i} style={{ padding: 24, background: 'var(--bone)', borderRadius: 'var(--r-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontWeight: 500, fontSize: 13.5 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--stone)' }}>{r.when}</div>
                  </div>
                  <Stars value={r.rating} size={11} />
                  <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, marginBottom: 0 }}>{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section style={{ padding: '48px 0 80px' }}>
          <h2 className="t-display" style={{ fontSize: 36, margin: '0 0 24px' }}>You might also like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} onAddWishlist={onAddWishlist} isWishlisted={wishlist.includes(p.id)} />
            ))}
          </div>
        </section>
      </div>

      {zoomOpen && (
        <div onClick={() => setZoomOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(20,17,13,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
          animation: 'fadeIn .2s',
        }}>
          <button onClick={() => setZoomOpen(false)} style={{ position: 'absolute', top: 24, right: 24, color: 'var(--bone)' }}>
            <Icon name="close" size={24} />
          </button>
          <img src={gallery[imgIdx]} style={{ maxWidth: '92%', maxHeight: '92%', objectFit: 'contain' }} />
        </div>
      )}

      {sizeGuideOpen && <SizeGuide product={product} onClose={() => setSizeGuideOpen(false)} />}
    </div>
  );
};

const SizeGuide = ({ product, onClose }) => {
  const isShoe = product.sizeKind === 'shoe';
  const isWaist = product.sizeKind === 'waist';
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,17,13,0.5)',
      display: 'flex', justifyContent: 'flex-end', backdropFilter: 'blur(4px)',
      animation: 'fadeInSlow .25s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper)', width: 480, height: '100%', overflow: 'auto',
        padding: 32, animation: 'slideInRight .3s var(--ease)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 className="t-display" style={{ fontSize: 32, margin: 0 }}>Size guide</h2>
          <button onClick={onClose} className="icon-btn"><Icon name="close" size={20} /></button>
        </div>

        <div style={{ background: 'var(--bone)', padding: 20, borderRadius: 'var(--r-md)', marginBottom: 24, fontSize: 13.5, lineHeight: 1.5 }}>
          {isShoe && 'European sizes shown. We recommend ordering your usual size.'}
          {isWaist && 'Waist sizes (in inches). We recommend the size closest to your natural waist measurement.'}
          {!isShoe && !isWaist && 'Our pieces are cut slightly relaxed. Take your usual size for our intended fit, or size down for a closer one.'}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {isShoe ? (
                <><th style={th}>EU</th><th style={th}>US M</th><th style={th}>US W</th><th style={th}>UK</th><th style={th}>cm</th></>
              ) : isWaist ? (
                <><th style={th}>Size</th><th style={th}>Waist (in)</th><th style={th}>Hip (in)</th><th style={th}>Inseam</th></>
              ) : (
                <><th style={th}>Size</th><th style={th}>Chest</th><th style={th}>Waist</th><th style={th}>Hips</th></>
              )}
            </tr>
          </thead>
          <tbody>
            {isShoe ? [['37','5','6.5','4','23.5'],['38','6','7.5','5','24.0'],['39','7','8.5','6','24.6'],['40','7.5','9','6.5','25.0'],['41','8.5','10','7.5','25.7'],['42','9','10.5','8','26.5'],['43','10','11.5','9','27.0'],['44','11','12.5','10','27.7']]
              .map(r => <tr key={r[0]}>{r.map((c,i) => <td key={i} style={td}>{c}</td>)}</tr>)
            : isWaist ? [['26','26','35','30'],['28','28','37','30'],['30','30','39','31'],['32','32','41','32'],['34','34','43','32'],['36','36','45','33']]
              .map(r => <tr key={r[0]}>{r.map((c,i) => <td key={i} style={td}>{c}</td>)}</tr>)
            : [['XS','34-35','27-28','35-36'],['S','36-37','29-30','37-38'],['M','38-40','31-33','39-41'],['L','41-43','34-36','42-44'],['XL','44-46','37-39','45-47']]
              .map(r => <tr key={r[0]}>{r.map((c,i) => <td key={i} style={td}>{c}</td>)}</tr>)
            }
          </tbody>
        </table>

        <div style={{ marginTop: 32, padding: 20, border: '1px solid var(--line)', borderRadius: 'var(--r-md)' }}>
          <div className="t-eyebrow" style={{ marginBottom: 8 }}>Need help?</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)', margin: '0 0 12px' }}>
            Email <a href="#" style={{ textDecoration: 'underline' }}>fit@rellani.com</a> with the piece and your usual sizes.
            Our team replies within a day.
          </p>
        </div>
      </div>
    </div>
  );
};

const th = { padding: '10px 8px', textAlign: 'left', fontWeight: 500, borderBottom: '1px solid var(--ink)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' };
const td = { padding: '10px 8px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12.5 };

window.PDPPage = PDPPage;

// ===== CART DRAWER + CART PAGE =====
const CartDrawer = ({ open, items, onClose, onUpdate, onRemove }) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;
  const freeShippingProgress = Math.min(100, (subtotal / 150) * 100);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(20,17,13,0.4)',
      display: 'flex', justifyContent: 'flex-end',
      animation: 'fadeInSlow .25s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper)', width: 480, maxWidth: '100vw', height: '100%',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight .35s var(--ease)',
      }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 className="t-display" style={{ fontSize: 28, margin: 0 }}>Your bag <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--stone)' }}>({items.length})</span></h2>
            <button onClick={onClose} className="icon-btn"><Icon name="close" size={20} /></button>
          </div>
          {items.length > 0 && (
            <div>
              {subtotal < 150 ? (
                <div style={{ fontSize: 12.5, color: 'var(--stone)', marginBottom: 8 }}>
                  Add <span style={{ color: 'var(--ink)', fontWeight: 500 }}>${(150 - subtotal).toFixed(0)}</span> more for free shipping
                </div>
              ) : (
                <div style={{ fontSize: 12.5, color: 'var(--success)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check" size={14} /> You've earned free shipping
                </div>
              )}
              <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${freeShippingProgress}%`, background: 'var(--ink)', transition: 'width .4s var(--ease)' }} />
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Icon name="bag" size={36} stroke={1} />
              <div style={{ fontSize: 17, fontFamily: 'var(--serif)', marginTop: 16, marginBottom: 8 }}>Your bag is empty.</div>
              <div style={{ fontSize: 13.5, color: 'var(--stone)', marginBottom: 24 }}>Pieces you save will live here.</div>
              <a href="#/shop/all" onClick={onClose} className="btn btn-primary">Start shopping</a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {items.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} style={{ display: 'flex', gap: 16 }}>
                  <a href={`#/product/${item.slug}`} onClick={onClose} style={{
                    width: 92, height: 116, background: 'var(--paper-2)',
                    borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0,
                  }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <a href={`#/product/${item.slug}`} onClick={onClose} style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</a>
                      <button onClick={() => onRemove(item)} className="icon-btn" style={{ width: 28, height: 28, marginTop: -4, marginRight: -4 }}>
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--stone)', marginTop: 2 }}>
                      {item.color} · {item.size || 'One size'}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 'var(--r-pill)' }}>
                        <button onClick={() => onUpdate(item, item.qty - 1)} style={{ padding: '6px 10px', lineHeight: 0 }}><Icon name="minus" size={11} /></button>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => onUpdate(item, item.qty + 1)} style={{ padding: '6px 10px', lineHeight: 0 }}><Icon name="plus" size={11} /></button>
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>${item.price * item.qty}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--line)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 8 }}>
              <span style={{ color: 'var(--stone)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--mono)' }}>${subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 16 }}>
              <span style={{ color: 'var(--stone)' }}>Shipping</span>
              <span style={{ fontFamily: 'var(--mono)' }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 500, marginBottom: 20, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <span>Total</span>
              <span style={{ fontFamily: 'var(--mono)' }}>${total}</span>
            </div>
            <a href="#/checkout" onClick={onClose} className="btn btn-primary btn-block btn-lg">
              Checkout <Icon name="arrow" size={14} />
            </a>
            <a href="#/cart" onClick={onClose} className="btn btn-ghost btn-block" style={{ marginTop: 8 }}>View bag</a>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, color: 'var(--stone)' }}>
              <Icon name="lock" size={13} /><span style={{ fontSize: 11.5 }}>Secure checkout · 30-day returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartPage = ({ items, onUpdate, onRemove }) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;

  if (items.length === 0) {
    return (
      <div className="page-enter container" style={{ padding: '80px 32px', textAlign: 'center' }} data-screen-label="04 Cart">
        <Icon name="bag" size={48} stroke={0.8} />
        <h1 className="t-display" style={{ fontSize: 48, margin: '24px 0 8px' }}>Your bag is empty.</h1>
        <p style={{ color: 'var(--stone)', marginBottom: 24 }}>The pieces you save will live here.</p>
        <a href="#/shop/all" className="btn btn-primary btn-lg">Browse the shop</a>
      </div>
    );
  }

  return (
    <div className="page-enter container" style={{ padding: '32px 32px 80px' }} data-screen-label="04 Cart">
      <h1 className="t-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 32 }}>Your bag.</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 64 }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 2fr 1fr 1fr 60px', gap: 16, padding: '16px 0', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', borderBottom: '1px solid var(--line)' }}>
            <span></span><span>Item</span><span>Quantity</span><span style={{ textAlign: 'right' }}>Price</span><span></span>
          </div>
          {items.map(item => (
            <div key={`${item.id}-${item.color}-${item.size}`} style={{ display: 'grid', gridTemplateColumns: '90px 2fr 1fr 1fr 60px', gap: 16, padding: '24px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
              <a href={`#/product/${item.slug}`} style={{ width: 90, height: 110, background: 'var(--paper-2)', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
              <div>
                <a href={`#/product/${item.slug}`} style={{ fontSize: 15, fontWeight: 500 }}>{item.name}</a>
                <div style={{ fontSize: 12.5, color: 'var(--stone)', marginTop: 4 }}>{item.color} · {item.size || 'One size'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 'var(--r-pill)', width: 'fit-content' }}>
                <button onClick={() => onUpdate(item, item.qty - 1)} style={{ padding: 10, lineHeight: 0 }}><Icon name="minus" size={12} /></button>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, minWidth: 22, textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => onUpdate(item, item.qty + 1)} style={{ padding: 10, lineHeight: 0 }}><Icon name="plus" size={12} /></button>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 14, textAlign: 'right' }}>${item.price * item.qty}</div>
              <button onClick={() => onRemove(item)} className="icon-btn"><Icon name="close" size={16} /></button>
            </div>
          ))}
        </div>

        <aside style={{ position: 'sticky', top: 130, alignSelf: 'flex-start' }}>
          <div style={{ background: 'var(--bone)', padding: 28, borderRadius: 'var(--r-md)' }}>
            <h2 className="t-display" style={{ fontSize: 28, margin: '0 0 24px' }}>Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
              <span>Subtotal</span><span style={{ fontFamily: 'var(--mono)' }}>${subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
              <span>Shipping</span><span style={{ fontFamily: 'var(--mono)' }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 16, color: 'var(--stone)' }}>
              <span>Tax</span><span style={{ fontFamily: 'var(--mono)' }}>Calculated at checkout</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 500, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
              <span>Estimated total</span><span style={{ fontFamily: 'var(--mono)' }}>${subtotal + shipping}</span>
            </div>
            <a href="#/checkout" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 24 }}>
              Checkout <Icon name="arrow" size={14} />
            </a>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', color: 'var(--stone)', fontSize: 12 }}>
              <Icon name="lock" size={13} /> Secure checkout
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

window.CartDrawer = CartDrawer;
window.CartPage = CartPage;

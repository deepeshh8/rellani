// ===== ACCOUNT, WISHLIST, LOOKBOOK =====

const AccountPage = ({ section = 'overview', wishlist, onRemoveWishlist }) => {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'profile', label: 'Profile' },
  ];

  const orders = [
    { id: '#RL-204871', date: 'Apr 18, 2026', total: 326, status: 'In transit', items: ['Aria Wool Overcoat', 'Soft Merino Crew'], image: IMG('1591047139829-d91aecb6caea', 200) },
    { id: '#RL-204455', date: 'Mar 22, 2026', total: 168, status: 'Delivered', items: ['Campus Runner'], image: IMG('1542291026-7eec264c27ff', 200) },
    { id: '#RL-203991', date: 'Feb 10, 2026', total: 246, status: 'Delivered', items: ['Studio Poplin Shirt', 'Archive Straight Jean'], image: IMG('1602810318383-e386cc2a3ccf', 200) },
  ];

  return (
    <div className="page-enter container" style={{ padding: '32px 32px 80px' }} data-screen-label={`07 Account — ${section}`}>
      <h1 className="t-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 8 }}>
        Hello, <em style={{ fontStyle: 'italic' }}>Wren.</em>
      </h1>
      <p style={{ color: 'var(--stone)', marginBottom: 40 }}>Member since March 2024 · Linen tier</p>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56 }}>
        <aside>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: 130 }}>
            {sections.map(s => (
              <a key={s.id} href={`#/account/${s.id}`} style={{
                padding: '10px 14px', fontSize: 14, borderRadius: 'var(--r-sm)',
                background: section === s.id ? 'var(--ink)' : 'transparent',
                color: section === s.id ? 'var(--bone)' : 'var(--ink)',
                fontWeight: section === s.id ? 500 : 400,
              }}>{s.label}</a>
            ))}
            <div style={{ height: 1, background: 'var(--line)', margin: '8px 0' }} />
            <a href="#/" style={{ padding: '10px 14px', fontSize: 14, color: 'var(--stone)' }}>Sign out</a>
          </nav>
        </aside>

        <div>
          {section === 'overview' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                {[
                  { label: 'Open orders', value: '1', sub: 'arriving Wed' },
                  { label: 'Wishlist', value: wishlist.length, sub: 'pieces saved' },
                  { label: 'Linen credits', value: '$24', sub: 'redeem on next order' },
                ].map(c => (
                  <div key={c.label} style={{ background: 'var(--bone)', padding: 24, borderRadius: 'var(--r-md)' }}>
                    <div className="t-eyebrow" style={{ marginBottom: 8 }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1 }}>{c.value}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--stone)', marginTop: 6 }}>{c.sub}</div>
                  </div>
                ))}
              </div>

              <h2 className="t-display" style={{ fontSize: 28, margin: '0 0 16px' }}>Recent orders</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {orders.slice(0,2).map(o => <OrderRow key={o.id} order={o} />)}
              </div>
            </>
          )}

          {section === 'orders' && (
            <>
              <h2 className="t-display" style={{ fontSize: 28, margin: '0 0 16px' }}>All orders</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {orders.map(o => <OrderRow key={o.id} order={o} />)}
              </div>
            </>
          )}

          {section === 'wishlist' && (
            <WishlistContent wishlist={wishlist} onRemoveWishlist={onRemoveWishlist} />
          )}

          {section === 'addresses' && (
            <div>
              <h2 className="t-display" style={{ fontSize: 28, margin: '0 0 16px' }}>Addresses</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {[
                  { label: 'Home', name: 'Wren Hayes', addr: '244 Devoe St, Apt 3', city: 'Brooklyn, NY 11206', country: 'United States' },
                  { label: 'Studio', name: 'Wren Hayes', addr: '78 N 11th St, Suite 4', city: 'Brooklyn, NY 11249', country: 'United States' },
                ].map(a => (
                  <div key={a.label} style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--r-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <Badge>{a.label}</Badge>
                      <button className="t-link" style={{ fontSize: 12.5 }}>Edit</button>
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                      {a.name}<br/>{a.addr}<br/>{a.city}<br/>{a.country}
                    </div>
                  </div>
                ))}
                <button style={{ padding: 24, border: '1px dashed var(--line)', borderRadius: 'var(--r-md)', fontSize: 13.5, color: 'var(--stone)' }}>
                  <Icon name="plus" size={16} /> Add address
                </button>
              </div>
            </div>
          )}

          {section === 'profile' && (
            <div>
              <h2 className="t-display" style={{ fontSize: 28, margin: '0 0 16px' }}>Profile</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 580 }}>
                <input className="input" defaultValue="Wren" placeholder="First name" />
                <input className="input" defaultValue="Hayes" placeholder="Last name" />
                <input className="input" style={{ gridColumn: '1 / -1' }} defaultValue="wren@example.com" placeholder="Email" />
                <input className="input" defaultValue="+1 (917) 555-0142" placeholder="Phone" />
                <input className="input" type="date" defaultValue="1992-08-14" />
              </div>
              <button className="btn btn-primary" style={{ marginTop: 24 }}>Save changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderRow = ({ order }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '90px 2fr 1fr 1fr auto', gap: 16, alignItems: 'center', padding: 16, background: 'var(--bone)', borderRadius: 'var(--r-md)' }}>
    <img src={order.image} style={{ width: 64, height: 80, objectFit: 'cover', borderRadius: 'var(--r-sm)' }} />
    <div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{order.id}</div>
      <div style={{ fontSize: 12.5, color: 'var(--stone)', marginTop: 4 }}>{order.items.join(' · ')}</div>
    </div>
    <div style={{ fontSize: 13, color: 'var(--stone)' }}>{order.date}</div>
    <div>
      <Badge variant={order.status === 'In transit' ? 'sale' : 'default'}>{order.status}</Badge>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>${order.total}</span>
      <a href="#" className="icon-btn"><Icon name="chev-right" size={16} /></a>
    </div>
  </div>
);

const WishlistContent = ({ wishlist, onRemoveWishlist }) => {
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div>
      <h2 className="t-display" style={{ fontSize: 28, margin: '0 0 16px' }}>Wishlist</h2>
      {items.length === 0 ? (
        <div style={{ padding: 48, background: 'var(--bone)', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
          <Icon name="heart" size={32} stroke={1} />
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 12, marginBottom: 6 }}>Nothing saved yet.</div>
          <div style={{ fontSize: 13, color: 'var(--stone)', marginBottom: 20 }}>Tap the heart on anything you'd like to remember.</div>
          <a href="#/shop/all" className="btn btn-primary">Browse the shop</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {items.map(p => (
            <div key={p.id} style={{ position: 'relative' }}>
              <ProductCard product={p} isWishlisted onAddWishlist={() => onRemoveWishlist(p.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WishlistPage = ({ wishlist, onRemoveWishlist, onQuickView }) => (
  <div className="page-enter container" style={{ padding: '32px 32px 80px' }} data-screen-label="08 Wishlist">
    <div style={{ marginBottom: 32 }}>
      <h1 className="t-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: 0 }}>Wishlist.</h1>
      <p style={{ color: 'var(--stone)', marginTop: 8 }}>{wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} you've saved.</p>
    </div>
    <WishlistContent wishlist={wishlist} onRemoveWishlist={onRemoveWishlist} />
  </div>
);

window.AccountPage = AccountPage;
window.WishlistPage = WishlistPage;

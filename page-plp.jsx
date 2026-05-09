// ===== PRODUCT LISTING PAGE (PLP) =====
const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
];

const PLPFilters = ({ filters, setFilters, count }) => {
  const allColors = React.useMemo(() => {
    const map = new Map();
    PRODUCTS.forEach(p => p.colors.forEach(c => {
      if (!map.has(c.name)) map.set(c.name, c.hex);
    }));
    return Array.from(map.entries());
  }, []);

  const toggleArr = (key, val) => setFilters(f => {
    const arr = f[key] || [];
    return { ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
  });

  const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = React.useState(defaultOpen);
    return (
      <div style={{ borderBottom: '1px solid var(--line)', padding: '20px 0' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: open ? 16 : 0,
          }}>
          {title}
          <Icon name={open ? 'minus' : 'plus'} size={14} />
        </button>
        {open && children}
      </div>
    );
  };

  return (
    <aside style={{ width: 220, flexShrink: 0, position: 'sticky', top: 100, alignSelf: 'flex-start', borderRight: '1px solid var(--line)', padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{count} {count === 1 ? 'piece' : 'pieces'}</div>
        <button onClick={() => setFilters({ size: [], color: [], price: null, tags: [] })} style={{ fontSize: 12, color: 'var(--stone)', textDecoration: 'underline' }}>Reset</button>
      </div>

      <Section title="Size">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['XS', 'S', 'M', 'L', 'XL'].map(s => (
            <button key={s} onClick={() => toggleArr('size', s)} style={{
              padding: '8px 14px', fontSize: 12, borderRadius: 'var(--r-pill)',
              border: '1px solid', borderColor: filters.size?.includes(s) ? 'var(--ink)' : 'var(--line)',
              background: filters.size?.includes(s) ? 'var(--ink)' : 'transparent',
              color: filters.size?.includes(s) ? 'var(--bone)' : 'var(--ink)',
              transition: 'all .2s var(--ease)',
            }}>{s}</button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {allColors.slice(0, 12).map(([name, hex]) => (
            <button
              key={name}
              onClick={() => toggleArr('color', name)}
              title={name}
              style={{
                width: 26, height: 26, borderRadius: '50%',
                background: hex,
                border: filters.color?.includes(name) ? '2px solid var(--ink)' : '1px solid rgba(20,17,13,0.18)',
                boxShadow: filters.color?.includes(name) ? 'inset 0 0 0 3px var(--paper)' : 'none',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="Price">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'lt100', label: 'Under $100' },
            { id: '100-200', label: '$100 — $200' },
            { id: '200-300', label: '$200 — $300' },
            { id: 'gt300', label: '$300+' },
          ].map(o => (
            <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13.5 }}>
              <input
                type="radio"
                checked={filters.price === o.id}
                onChange={() => setFilters(f => ({ ...f, price: f.price === o.id ? null : o.id }))}
                style={{ accentColor: 'var(--ink)' }}
              />
              {o.label}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Tags" defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'new', label: 'New arrivals' },
            { id: 'bestseller', label: 'Bestseller' },
            { id: 'editor-pick', label: "Editor's pick" },
          ].map(t => (
            <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13.5 }}>
              <input
                type="checkbox"
                checked={filters.tags?.includes(t.id) || false}
                onChange={() => toggleArr('tags', t.id)}
                style={{ accentColor: 'var(--ink)' }}
              />
              {t.label}
            </label>
          ))}
        </div>
      </Section>
    </aside>
  );
};

const PLPPage = ({ category, onQuickView, onAddWishlist, wishlist }) => {
  const [sort, setSort] = React.useState('featured');
  const [sortOpen, setSortOpen] = React.useState(false);
  const [density, setDensity] = React.useState(4);
  const [filters, setFilters] = React.useState({ size: [], color: [], price: null, tags: [] });
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const cat = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];

  const filtered = React.useMemo(() => {
    let list = [...PRODUCTS];
    if (cat.id !== 'all') list = list.filter(p => p.cat === cat.id);
    if (filters.size?.length) list = list.filter(p => p.sizes.some(s => filters.size.includes(s)));
    if (filters.color?.length) list = list.filter(p => p.colors.some(c => filters.color.includes(c.name)));
    if (filters.price) {
      list = list.filter(p => {
        if (filters.price === 'lt100') return p.price < 100;
        if (filters.price === '100-200') return p.price >= 100 && p.price < 200;
        if (filters.price === '200-300') return p.price >= 200 && p.price < 300;
        if (filters.price === 'gt300') return p.price >= 300;
      });
    }
    if (filters.tags?.length) list = list.filter(p => p.tags?.some(t => filters.tags.includes(t)));

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'new') list.sort((a, b) => (b.tags?.includes('new') ? 1 : 0) - (a.tags?.includes('new') ? 1 : 0));
    return list;
  }, [cat, filters, sort]);

  return (
    <div className="page-enter" style={{ padding: '0' }} data-screen-label={`02 PLP — ${cat.label}`}>
      {/* Minimal header row */}
      <div className="plp-header" style={{ padding: '28px 40px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontWeight: 400 }}>
          {cat.id === 'all' ? 'All' : cat.label}
          <span style={{ color: 'var(--stone)', marginLeft: 12 }}>{filtered.length}</span>
        </h1>
        <div style={{ fontSize: 11, color: 'var(--stone)', letterSpacing: '0.06em' }}>
          <a href="#/">Home</a> / <a href="#/shop/all">Shop</a>{cat.id !== 'all' && <> / {cat.label}</>}
        </div>
      </div>

      {/* Mobile filter bar */}
      <div className="plp-mobile-filter-bar" style={{ display: 'none', padding: '10px 16px', borderBottom: '1px solid var(--line)', gap: 8 }}>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', border: '1px solid var(--line)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer' }}
        >
          <Icon name="sliders" size={14} /> Filter {(filters.size?.length || filters.color?.length || filters.price || filters.tags?.length) ? `(${[filters.size?.length, filters.color?.length, filters.price ? 1 : 0, filters.tags?.length].reduce((a,b)=>a+(b||0),0)})` : ''}
        </button>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setSortOpen(!sortOpen)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', border: '1px solid var(--line)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer' }}>
            Sort <Icon name="chevron" size={12} />
          </button>
          {sortOpen && (
            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: '#fff', border: '1px solid var(--line)', zIndex: 30, minWidth: 180, padding: 4 }}>
              {SORT_OPTIONS.map(o => (
                <button key={o.id} onClick={() => { setSort(o.id); setSortOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: 13, background: sort === o.id ? 'var(--paper-2)' : 'transparent' }}>{o.label}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 52, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
              <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Filter</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="icon-btn"><Icon name="close" size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <PLPFilters filters={filters} setFilters={setFilters} count={filtered.length} />
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10 }}>
              <button onClick={() => { setFilters({ size: [], color: [], price: null, tags: [] }); setMobileFiltersOpen(false); }} style={{ flex: 1, padding: '14px', border: '1px solid var(--line)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer' }}>Clear all</button>
              <button onClick={() => setMobileFiltersOpen(false)} style={{ flex: 2, padding: '14px', background: 'var(--ink)', color: '#fff', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                View {filtered.length} items
              </button>
            </div>
          </div>
        )}
        <div className="plp-sidebar">
          <PLPFilters filters={filters} setFilters={setFilters} count={filtered.length} />
        </div>

        <div className="plp-content" style={{ flex: 1, minWidth: 0, padding: '24px 40px' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: 'var(--stone)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {filtered.length} items
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--r-pill)', padding: 2 }}>
                {[3, 4].map(n => (
                  <button key={n} onClick={() => setDensity(n)} style={{
                    padding: '6px 10px', borderRadius: 'var(--r-pill)',
                    background: density === n ? 'var(--ink)' : 'transparent',
                    color: density === n ? 'var(--bone)' : 'var(--ink)',
                    fontSize: 12,
                  }}>
                    <Icon name={n === 3 ? 'rows' : 'grid'} size={14} />
                  </button>
                ))}
              </div>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="btn btn-ghost btn-sm"
                  style={{ border: '1px solid var(--line)' }}>
                  <Icon name="sort" size={14} /> Sort: {SORT_OPTIONS.find(o => o.id === sort)?.label}
                  <Icon name="chevron" size={12} />
                </button>
                {sortOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                    background: 'var(--paper)', border: '1px solid var(--line)',
                    borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-md)',
                    minWidth: 200, padding: 6, zIndex: 30,
                    animation: 'fadeIn .2s var(--ease)',
                  }}>
                    {SORT_OPTIONS.map(o => (
                      <button key={o.id} onClick={() => { setSort(o.id); setSortOpen(false); }} style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '8px 12px', borderRadius: 'var(--r-sm)', fontSize: 13,
                        background: sort === o.id ? 'var(--paper-2)' : 'transparent',
                      }}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {(filters.size?.length || filters.color?.length || filters.price || filters.tags?.length) ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {filters.size?.map(s => (
                <span key={s} style={chipStyle} onClick={() => setFilters(f => ({ ...f, size: f.size.filter(x => x !== s) }))}>
                  Size: {s} <Icon name="close" size={12} />
                </span>
              ))}
              {filters.color?.map(c => (
                <span key={c} style={chipStyle} onClick={() => setFilters(f => ({ ...f, color: f.color.filter(x => x !== c) }))}>
                  Color: {c} <Icon name="close" size={12} />
                </span>
              ))}
              {filters.price && (
                <span style={chipStyle} onClick={() => setFilters(f => ({ ...f, price: null }))}>
                  Price: {filters.price} <Icon name="close" size={12} />
                </span>
              )}
              {filters.tags?.map(t => (
                <span key={t} style={chipStyle} onClick={() => setFilters(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))}>
                  {t} <Icon name="close" size={12} />
                </span>
              ))}
            </div>
          ) : null}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--stone)' }}>
              <Icon name="search" size={32} stroke={1} />
              <div style={{ marginTop: 16, fontSize: 16, color: 'var(--ink)' }}>Nothing matches just yet.</div>
              <div style={{ fontSize: 13, marginTop: 8 }}>Try removing a filter or two.</div>
            </div>
          ) : (
            <div className="plp-grid" style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${density}, 1fr)`,
              gap: '2px 16px',
            }}>
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={onQuickView}
                  onAddWishlist={onAddWishlist}
                  isWishlisted={wishlist.includes(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const chipStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '6px 12px', borderRadius: 'var(--r-pill)',
  background: 'var(--paper-2)', border: '1px solid var(--line)',
  fontSize: 12, cursor: 'pointer',
};

window.PLPPage = PLPPage;

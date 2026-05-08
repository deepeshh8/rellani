// ===== APP / ROUTER / STATE =====
const useHash = () => {
  const [hash, setHash] = React.useState(window.location.hash || '#/');
  React.useEffect(() => {
    const onHash = () => { setHash(window.location.hash || '#/'); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash.replace(/^#/, '') || '/';
};

// LocalStorage hook
const usePersistedState = (key, initial) => {
  const [val, setVal] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch { return initial; }
  });
  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
};

const useTweaks = (defaults) => {
  const [tweaks, setTweaks] = React.useState(defaults);
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e?.data?.type === '__edit_mode_init') setTweaks({ ...defaults, ...e.data.values });
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const setTweak = (k, v) => {
    if (typeof k === 'object') {
      setTweaks(t => ({ ...t, ...k }));
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: k }, '*');
    } else {
      setTweaks(t => ({ ...t, [k]: v }));
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
    }
  };
  return [tweaks, setTweak];
};

const App = () => {
  const route = useHash();
  const [cart, setCart] = usePersistedState('rellani-cart', []);
  const [wishlist, setWishlist] = usePersistedState('rellani-wishlist', []);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [quickView, setQuickView] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [orderId, setOrderId] = React.useState(null);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // route parsing
  const seg = route.split('/').filter(Boolean);
  const page = seg[0] || 'home';

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product, color, size, qty = 1, sourceEl) => {
    if (!size && product.sizes.length > 1) return;
    const key = `${product.id}-${color}-${size || 'one'}`;
    setCart(c => {
      const existing = c.find(i => i.key === key);
      if (existing) return c.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...c, {
        key, id: product.id, slug: product.slug, name: product.name,
        price: product.price, color, size, qty,
        image: IMG(product.colors.find(c => c.name === color)?.img || product.colors[0].img, 400),
      }];
    });
    setToast(`Added ${product.name} to bag`);
    // fly-to-cart
    if (sourceEl) {
      const cartIcon = document.getElementById('cart-icon');
      if (cartIcon) {
        const r1 = sourceEl.getBoundingClientRect();
        const r2 = cartIcon.getBoundingClientRect();
        const ghost = document.createElement('div');
        ghost.style.cssText = `position:fixed;left:${r1.left + r1.width/2 - 20}px;top:${r1.top + r1.height/2 - 20}px;width:40px;height:40px;border-radius:50%;background:var(--ink);z-index:999;pointer-events:none;--fly-x:${(r2.left + r2.width/2) - (r1.left + r1.width/2)}px;--fly-y:${(r2.top + r2.height/2) - (r1.top + r1.height/2)}px;animation:flyToCart .8s var(--ease) forwards;`;
        document.body.appendChild(ghost);
        setTimeout(() => ghost.remove(), 850);
      }
    }
  };

  const updateCart = (item, qty) => {
    if (qty <= 0) return setCart(c => c.filter(i => i.key !== item.key));
    setCart(c => c.map(i => i.key === item.key ? { ...i, qty } : i));
  };

  const removeFromCart = (item) => setCart(c => c.filter(i => i.key !== item.key));

  const toggleWishlist = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    if (!wishlist.includes(id)) setToast('Saved to wishlist');
  };

  const completeOrder = () => {
    const id = '#RL-' + (200000 + Math.floor(Math.random() * 99999));
    setOrderId(id);
    window.location.hash = '#/order-confirmed';
  };

  const orderConfirmedItems = React.useRef([]);
  React.useEffect(() => {
    if (route === '/order-confirmed' && orderConfirmedItems.current.length === 0 && cart.length > 0) {
      orderConfirmedItems.current = cart;
      setCart([]);
    }
  }, [route]);

  const renderPage = () => {
    if (route === '/' || page === 'home') return <HomePage onQuickView={setQuickView} onAddWishlist={toggleWishlist} wishlist={wishlist} />;
    if (page === 'shop') return <PLPPage category={seg[1] || 'all'} onQuickView={setQuickView} onAddWishlist={toggleWishlist} wishlist={wishlist} />;
    if (page === 'product') return <PDPPage slug={seg[1]} onAdd={addToCart} onAddWishlist={toggleWishlist} wishlist={wishlist} />;
    if (page === 'cart') return <CartPage items={cart} onUpdate={updateCart} onRemove={removeFromCart} />;
    if (page === 'checkout') return <CheckoutPage items={cart} onComplete={completeOrder} />;
    if (page === 'order-confirmed') return <OrderConfirmPage orderId={orderId || '#RL-204871'} items={orderConfirmedItems.current.length ? orderConfirmedItems.current : []} />;
    if (page === 'wishlist') return <WishlistPage wishlist={wishlist} onRemoveWishlist={toggleWishlist} />;
    if (page === 'account') return <AccountPage section={seg[1] || 'overview'} wishlist={wishlist} onRemoveWishlist={toggleWishlist} />;
    if (page === 'lookbook') return <LookbookPage id={seg[1]} />;
    if (page === 'about') return <AboutPage />;
    if (page === 'journal') return <JournalPage />;
    return <HomePage onQuickView={setQuickView} onAddWishlist={toggleWishlist} wishlist={wishlist} />;
  };

  // Hide header/footer for checkout
  const isCheckout = page === 'checkout';

  return (
    <div className="app">
      {!isCheckout && (
        <Header
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          onOpenCart={() => setCartOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          route={route}
        />
      )}
      <main className="main" key={route}>
        {renderPage()}
      </main>
      {!isCheckout && <Footer />}

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdate={updateCart}
        onRemove={removeFromCart}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      {quickView && (
        <QuickView
          product={quickView}
          onClose={() => setQuickView(null)}
          onAdd={addToCart}
          onAddWishlist={toggleWishlist}
          isWishlisted={wishlist.includes(quickView.id)}
        />
      )}
      <Toast message={toast} onClose={() => setToast(null)} />

      <RellaniTweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

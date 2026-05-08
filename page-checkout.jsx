// ===== CHECKOUT =====
const CheckoutPage = ({ items, onComplete }) => {
  const [step, setStep] = React.useState(1);
  const [contact, setContact] = React.useState({ email: '', phone: '', news: true });
  const [shipping, setShipping] = React.useState({ first: '', last: '', address: '', address2: '', city: '', state: '', zip: '', country: 'United States' });
  const [shipMethod, setShipMethod] = React.useState('standard');
  const [payment, setPayment] = React.useState('card');
  const [card, setCard] = React.useState({ number: '', name: '', exp: '', cvc: '' });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipPrice = shipMethod === 'express' ? 24 : (subtotal > 150 ? 0 : 12);
  const tax = Math.round((subtotal + shipPrice) * 0.0875);
  const total = subtotal + shipPrice + tax;

  if (items.length === 0) {
    return (
      <div className="page-enter container" style={{ padding: 80, textAlign: 'center' }} data-screen-label="05 Checkout">
        <h1 className="t-display" style={{ fontSize: 48 }}>Your bag is empty.</h1>
        <a href="#/shop/all" className="btn btn-primary" style={{ marginTop: 24 }}>Browse the shop</a>
      </div>
    );
  }

  const Steps = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {['Contact', 'Shipping', 'Payment'].map((s, i) => (
        <React.Fragment key={s}>
          <button onClick={() => i < step - 1 && setStep(i + 1)} style={{
            color: step === i + 1 ? 'var(--ink)' : 'var(--stone)',
            fontWeight: step === i + 1 ? 600 : 400,
          }}>0{i + 1} {s}</button>
          {i < 2 && <span style={{ color: 'var(--stone)' }}>/</span>}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="page-enter" data-screen-label="05 Checkout">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', minHeight: 'calc(100vh - 120px)' }}>
        {/* form */}
        <div style={{ padding: '40px clamp(32px, 6vw, 80px)' }}>
          <a href="#/" style={{ display: 'inline-block', marginBottom: 32 }}>
            <Wordmark size={28} />
          </a>
          <Steps />

          {step === 1 && (
            <div className="page-enter">
              <h1 className="t-display" style={{ fontSize: 40, margin: '0 0 24px' }}>Contact</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input className="input" placeholder="Email address" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} />
                <input className="input" placeholder="Phone (optional)" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} />
                <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, color: 'var(--ink-2)', marginTop: 4 }}>
                  <input type="checkbox" checked={contact.news} onChange={e => setContact({...contact, news: e.target.checked})} style={{ accentColor: 'var(--ink)' }} />
                  Email me with news from the studio (rare and worth it).
                </label>
              </div>
              <div style={{ marginTop: 28 }}>
                <button className="btn btn-primary btn-lg" disabled={!contact.email} onClick={() => setStep(2)} style={{ opacity: contact.email ? 1 : 0.4 }}>
                  Continue to shipping <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="page-enter">
              <h1 className="t-display" style={{ fontSize: 40, margin: '0 0 24px' }}>Shipping</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <input className="input" placeholder="First name" value={shipping.first} onChange={e => setShipping({...shipping, first: e.target.value})} />
                <input className="input" placeholder="Last name" value={shipping.last} onChange={e => setShipping({...shipping, last: e.target.value})} />
                <input className="input" style={{ gridColumn: '1 / -1' }} placeholder="Address" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} />
                <input className="input" style={{ gridColumn: '1 / -1' }} placeholder="Apartment, suite (optional)" value={shipping.address2} onChange={e => setShipping({...shipping, address2: e.target.value})} />
                <input className="input" placeholder="City" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} />
                <input className="input" placeholder="State" value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} />
                <input className="input" placeholder="ZIP" value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} />
                <select className="input" value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})}>
                  <option>United States</option><option>Canada</option><option>United Kingdom</option><option>European Union</option><option>Japan</option>
                </select>
              </div>

              <h3 style={{ marginTop: 32, marginBottom: 12, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { id: 'standard', label: 'Standard delivery', meta: '2–4 business days', price: subtotal > 150 ? 'Free' : '$12' },
                  { id: 'express', label: 'Express delivery', meta: '1–2 business days', price: '$24' },
                ].map(m => (
                  <label key={m.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    border: '1px solid', borderColor: shipMethod === m.id ? 'var(--ink)' : 'var(--line)',
                    borderRadius: 'var(--r-md)', cursor: 'pointer',
                    background: shipMethod === m.id ? 'var(--bone)' : 'transparent',
                  }}>
                    <input type="radio" checked={shipMethod === m.id} onChange={() => setShipMethod(m.id)} style={{ accentColor: 'var(--ink)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{m.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--stone)' }}>{m.meta}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{m.price}</div>
                  </label>
                ))}
              </div>

              <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
                <button onClick={() => setStep(1)} className="btn btn-ghost"><Icon name="arrow-left" size={14} /> Back</button>
                <button className="btn btn-primary btn-lg" onClick={() => setStep(3)} disabled={!shipping.first || !shipping.zip} style={{ opacity: shipping.first && shipping.zip ? 1 : 0.4, marginLeft: 'auto' }}>
                  Continue to payment <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="page-enter">
              <h1 className="t-display" style={{ fontSize: 40, margin: '0 0 24px' }}>Payment</h1>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {[
                  { id: 'card', label: 'Card', icon: 'card' },
                  { id: 'apple', label: 'Apple Pay', icon: 'apple-pay' },
                  { id: 'klarna', label: 'Klarna', icon: 'sparkle' },
                ].map(m => (
                  <button key={m.id} onClick={() => setPayment(m.id)} style={{
                    flex: 1, padding: '14px 12px',
                    border: '1px solid', borderColor: payment === m.id ? 'var(--ink)' : 'var(--line)',
                    borderRadius: 'var(--r-md)',
                    background: payment === m.id ? 'var(--bone)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontSize: 13.5, fontWeight: 500,
                  }}>
                    <Icon name={m.icon} size={16} />
                    {m.label}
                  </button>
                ))}
              </div>

              {payment === 'card' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <input className="input" style={{ gridColumn: '1 / -1' }} placeholder="Card number" value={card.number} onChange={e => setCard({...card, number: e.target.value})} />
                  <input className="input" style={{ gridColumn: '1 / -1' }} placeholder="Name on card" value={card.name} onChange={e => setCard({...card, name: e.target.value})} />
                  <input className="input" placeholder="MM / YY" value={card.exp} onChange={e => setCard({...card, exp: e.target.value})} />
                  <input className="input" placeholder="CVC" value={card.cvc} onChange={e => setCard({...card, cvc: e.target.value})} />
                </div>
              )}
              {payment === 'apple' && (
                <div style={{ padding: 32, textAlign: 'center', background: 'var(--bone)', borderRadius: 'var(--r-md)' }}>
                  <Icon name="apple-pay" size={42} stroke={1.2} />
                  <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 12 }}>You'll confirm with Touch ID after placing your order.</p>
                </div>
              )}
              {payment === 'klarna' && (
                <div style={{ padding: 24, background: 'var(--bone)', borderRadius: 'var(--r-md)', fontSize: 13.5 }}>
                  Pay in 4 interest-free installments of <strong style={{ fontFamily: 'var(--mono)' }}>${(total / 4).toFixed(2)}</strong>. No credit impact.
                </div>
              )}

              <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
                <button onClick={() => setStep(2)} className="btn btn-ghost"><Icon name="arrow-left" size={14} /> Back</button>
                <button className="btn btn-primary btn-lg" onClick={onComplete} style={{ marginLeft: 'auto' }}>
                  <Icon name="lock" size={14} /> Place order — ${total}
                </button>
              </div>

              <div style={{ marginTop: 24, fontSize: 12, color: 'var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Icon name="lock" size={12} /> Secure, 256-bit encrypted checkout.
              </div>
            </div>
          )}
        </div>

        {/* summary */}
        <div style={{ background: 'var(--bone)', padding: '40px clamp(32px, 4vw, 56px)', borderLeft: '1px solid var(--line)' }}>
          <h3 className="t-eyebrow" style={{ marginBottom: 20 }}>Order summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {items.map(item => (
              <div key={`${item.id}-${item.color}-${item.size}`} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 64, height: 80, position: 'relative', flexShrink: 0, background: 'var(--paper-2)', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
                  <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--ink)', color: 'var(--bone)', fontSize: 10, padding: '0 6px', minWidth: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{item.qty}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--stone)', marginTop: 2 }}>{item.color} · {item.size || 'One size'}</div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>${item.price * item.qty}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Row label="Subtotal" value={`$${subtotal}`} />
            <Row label="Shipping" value={shipPrice === 0 ? 'Free' : `$${shipPrice}`} />
            <Row label="Tax" value={`$${tax}`} />
          </div>
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 500 }}>
            <span>Total</span><span style={{ fontFamily: 'var(--mono)' }}>${total}</span>
          </div>

          <div style={{ marginTop: 24, padding: 16, border: '1px solid var(--line)', borderRadius: 'var(--r-md)', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12.5, lineHeight: 1.5 }}>
            <Icon name="leaf" size={16} stroke={1.4} />
            <div>This order offsets <strong>0.4 kg CO₂</strong> via our shipping partner. Carbon-neutral by default.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}>
    <span style={{ color: 'var(--stone)' }}>{label}</span>
    <span style={{ fontFamily: 'var(--mono)' }}>{value}</span>
  </div>
);

const OrderConfirmPage = ({ orderId, items }) => {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="page-enter container" style={{ padding: '60px 32px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }} data-screen-label="06 Order confirmed">
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: 'var(--ink)',
        margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'scaleIn .35s var(--ease)',
      }}>
        <Icon name="check" size={32} stroke={1.5} style={{ color: 'var(--bone)' }} />
      </div>
      <div className="t-eyebrow" style={{ marginBottom: 12 }}>Order {orderId}</div>
      <h1 className="t-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 0 16px' }}>Thank you, sincerely.</h1>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
        We've received your order and are preparing it from our Brooklyn studio. You'll get a tracking number within a day.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <a href="#/account/orders" className="btn btn-primary">View order</a>
        <a href="#/" className="btn btn-secondary">Continue shopping</a>
      </div>

      <div style={{ marginTop: 64, padding: 32, background: 'var(--bone)', borderRadius: 'var(--r-md)', textAlign: 'left' }}>
        <h3 className="t-eyebrow" style={{ marginBottom: 16 }}>Your pieces</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(i => (
            <div key={`${i.id}-${i.color}-${i.size}`} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <img src={i.image} style={{ width: 48, height: 60, objectFit: 'cover', borderRadius: 4 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{i.name}</div>
                <div style={{ fontSize: 12, color: 'var(--stone)' }}>{i.color} · {i.size || 'One size'} · qty {i.qty}</div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>${i.price * i.qty}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
          <span>Total paid</span><span style={{ fontFamily: 'var(--mono)' }}>${total}</span>
        </div>
      </div>
    </div>
  );
};

window.CheckoutPage = CheckoutPage;
window.OrderConfirmPage = OrderConfirmPage;

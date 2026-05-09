// ===== RELLANI CATALOG =====

const IMG = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=90&auto=format&fit=crop&crop=center`;

const CATEGORIES = [
  { id: 'all',           label: 'All' },
  { id: 'ready-to-wear', label: 'Ready to Wear' },
  { id: 'swim',          label: 'Swim' },
  { id: 'resortwear',    label: 'Resortwear' },
  { id: 'sets',          label: 'Sets' },
];

const sz = {
  cloth: ['XS', 'S', 'M', 'L', 'XL'],
  one:   ['One size'],
};

const PRODUCTS = [
  // ===== READY TO WEAR =====
  {
    id: 'p01', slug: 'lace-wrap-dress', name: 'Lace Wrap Dress',
    cat: 'ready-to-wear', price: 248, tags: ['new', 'editor-pick'],
    blurb: 'A bias-cut wrap dress in intricate lace. Adjustable tie waist, open back.',
    detail: ['100% cotton lace', 'Adjustable wrap tie', 'Open back', 'Fully lined', 'Made in Portugal'],
    care: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#F5F0E8', img: '1618288956847-283e162b1bfe' },
      { name: 'Sand',  hex: '#C8B69A', img: '1774548073458-6f7096023a50' },
    ],
  },
  {
    id: 'p02', slug: 'flowy-maxi-dress', name: 'Flowy Maxi Dress',
    cat: 'ready-to-wear', price: 198, tags: ['new'],
    blurb: 'An effortless maxi in lightweight crepe. Thin straps, subtle gather at the waist.',
    detail: ['100% viscose crepe', 'Adjustable straps', 'Side split', 'Made in Italy'],
    care: ['Machine wash 30°', 'Do not tumble dry'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Ivory', hex: '#EDE8DF', img: '1762623930916-4bdcd8dd475d' },
      { name: 'Stone', hex: '#B4A99A', img: '1763130807744-5123cbe8ce4c' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },
  {
    id: 'p03', slug: 'draped-midi-dress', name: 'Draped Midi Dress',
    cat: 'ready-to-wear', price: 218, tags: ['editor-pick'],
    blurb: 'Sculpted draping across the bust, falling into a clean column skirt. Our most photographed piece.',
    detail: ['Stretch satin', 'Built-in boning', 'Hidden zip', 'Made in Dubai'],
    care: ['Dry clean only'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Champagne', hex: '#D4C4A8', img: '1758551926198-bcf800465f4f' },
      { name: 'Nude',      hex: '#C8AA90', img: '1618821559072-27db50f0ed2b' },
    ],
  },
  {
    id: 'p04', slug: 'knot-front-top', name: 'Knot Front Top',
    cat: 'ready-to-wear', price: 98, tags: ['new'],
    blurb: 'A simple, beautiful knot-front top in slub cotton. Pairs with everything.',
    detail: ['100% slub cotton', 'Relaxed fit', 'Made in Portugal'],
    care: ['Machine wash cold', 'Tumble dry low'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FAF7F2', img: '1733051482171-b8753a80c316' },
      { name: 'Mocha', hex: '#9A8070', img: '1711509724019-5e8df601ff31' },
    ],
  },
  {
    id: 'p05', slug: 'wide-leg-trouser', name: 'Wide Leg Trouser',
    cat: 'ready-to-wear', price: 148, tags: [],
    blurb: 'A high-rise wide leg in linen-silk. Breathable for warm climates.',
    detail: ['55% linen, 45% silk', 'High waist', 'Wide leg', 'Made in Italy'],
    care: ['Dry clean recommended', 'Hand wash cold'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Sand',  hex: '#D4C4A8', img: '1774548073458-6f7096023a50' },
      { name: 'White', hex: '#FAF7F2', img: '1763130807702-ef09e55188ba' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },
  {
    id: 'p06', slug: 'crochet-mini-dress', name: 'Crochet Mini Dress',
    cat: 'ready-to-wear', price: 228, tags: ['new', 'editor-pick'],
    blurb: 'Hand-crocheted cotton mini. The open weave catches the light beautifully.',
    detail: ['100% hand-crocheted cotton', 'Lined', 'Made in Bali'],
    care: ['Hand wash cold', 'Lay flat to dry'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FAF7F2', img: '1603204363695-2590827ccc35' },
      { name: 'Camel', hex: '#C8B69A', img: '1660715196774-3e2e563c82ac' },
    ],
  },

  // ===== SWIM =====
  {
    id: 'p07', slug: 'bandeau-bikini-top', name: 'Bandeau Bikini Top',
    cat: 'swim', price: 88, tags: ['new'],
    blurb: 'A structured bandeau with underwire support. Removable straps.',
    detail: ['80% nylon, 20% lycra', 'Removable padding', 'Removable straps', 'UV protective'],
    care: ['Rinse after use', 'Hand wash cold', 'Do not tumble dry'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FAF7F2', img: '1637526997367-d44a21b2c3c3' },
      { name: 'Sand',  hex: '#C8B69A', img: '1764057230771-d0ee6efdf056' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },
  {
    id: 'p08', slug: 'high-waist-bikini-bottom', name: 'High Waist Bottom',
    cat: 'swim', price: 78, tags: ['new'],
    blurb: 'High-waisted, full coverage. The bottom that works for every body.',
    detail: ['80% nylon, 20% lycra', 'High waist', 'UV protective', 'Made in Portugal'],
    care: ['Rinse after use', 'Hand wash cold'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FAF7F2', img: '1764057230771-d0ee6efdf056' },
      { name: 'Sand',  hex: '#C8B69A', img: '1637526997367-d44a21b2c3c3' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },
  {
    id: 'p09', slug: 'one-piece-swimsuit', name: 'Sculpted One-Piece',
    cat: 'swim', price: 178, tags: ['editor-pick'],
    blurb: 'A deeply cut one-piece with a plunge neckline and open back.',
    detail: ['80% nylon, 20% lycra', 'Plunge neckline', 'Open back', 'Removable padding'],
    care: ['Rinse after use', 'Hand wash cold', 'Do not tumble dry'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Ivory', hex: '#EDE8DF', img: '1618288956847-283e162b1bfe' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },

  // ===== RESORTWEAR =====
  {
    id: 'p10', slug: 'linen-kaftan', name: 'Linen Kaftan',
    cat: 'resortwear', price: 168, tags: ['new'],
    blurb: 'A generous kaftan in washed linen. Slips over swimwear or wears as a dress.',
    detail: ['100% washed linen', 'Oversized fit', 'V neckline', 'Made in Morocco'],
    care: ['Machine wash 30°', 'Iron while damp'],
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'White',       hex: '#FAF7F2', img: '1762623930916-4bdcd8dd475d' },
      { name: 'Sand',        hex: '#D4C4A8', img: '1774548073458-6f7096023a50' },
      { name: 'Terracotta',  hex: '#C4704A', img: '1711509724019-5e8df601ff31' },
    ],
  },
  {
    id: 'p11', slug: 'crochet-cover-up', name: 'Crochet Cover-Up',
    cat: 'resortwear', price: 148, tags: ['new', 'editor-pick'],
    blurb: 'An open-weave crochet cover-up. Ideal over a bikini or under a blazer.',
    detail: ['100% hand-crocheted cotton', 'Open side slits', 'Made in Bali'],
    care: ['Hand wash cold', 'Dry flat'],
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'White',   hex: '#FAF7F2', img: '1763130807702-ef09e55188ba' },
      { name: 'Natural', hex: '#D4C4A8', img: '1700317440744-a126fc87b900' },
    ],
  },
  {
    id: 'p12', slug: 'sarong-wrap-skirt', name: 'Sarong Wrap Skirt',
    cat: 'resortwear', price: 88, tags: [],
    blurb: 'A silk-blend sarong that ties a dozen ways. Wear as a skirt, dress, or wrap.',
    detail: ['70% silk, 30% cotton', 'Versatile styling', 'One size', 'Made in Italy'],
    care: ['Hand wash cold', 'Do not wring'],
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'Ivory', hex: '#EDE8DF', img: '1758551926198-bcf800465f4f' },
      { name: 'Stone', hex: '#B4A99A', img: '1763130807744-5123cbe8ce4c' },
    ],
  },

  // ===== SETS =====
  {
    id: 'p13', slug: 'linen-co-ord-set', name: 'Linen Co-ord Set',
    cat: 'sets', price: 298, tags: ['new', 'editor-pick'],
    blurb: 'A crop top and wide-leg trouser in matching washed linen. Sold together.',
    detail: ['100% washed linen', 'Crop top + wide leg trouser', 'Made in Portugal'],
    care: ['Machine wash 30°', 'Iron while damp'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Sand',  hex: '#D4C4A8', img: '1618821559072-27db50f0ed2b' },
      { name: 'White', hex: '#FAF7F2', img: '1603204363695-2590827ccc35' },
    ],
  },
  {
    id: 'p14', slug: 'bikini-set', name: 'Classic Bikini Set',
    cat: 'sets', price: 158, tags: ['new'],
    blurb: 'Our signature triangle top and brief bottom. A forever style.',
    detail: ['80% nylon, 20% lycra', 'Triangle top + brief', 'UV protective', 'Sold as a set'],
    care: ['Rinse after use', 'Hand wash cold'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FAF7F2', img: '1637526997367-d44a21b2c3c3' },
      { name: 'Nude',  hex: '#C8B0A0', img: '1764057230771-d0ee6efdf056' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },
  {
    id: 'p15', slug: 'knit-set', name: 'Knit Crop & Skirt Set',
    cat: 'sets', price: 268, tags: ['editor-pick'],
    blurb: 'A fine-gauge knit crop top and matching mini skirt. Effortlessly put-together.',
    detail: ['Viscose-cotton knit', 'Crop top + mini skirt', 'Stretchy fit', 'Made in Italy'],
    care: ['Hand wash cold', 'Lay flat to dry'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Ivory', hex: '#EDE8DF', img: '1618821559072-27db50f0ed2b' },
      { name: 'Black', hex: '#2D2926', img: '1660643378668-325f861d95cc' },
    ],
  },
];

// Apply ratings + metadata
PRODUCTS.forEach((p, i) => {
  p.rating  = 4.2 + ((i * 7)  % 8) / 10;
  p.reviews = 18  + ((i * 29) % 120);
  p.inStock = true;
  p.image   = IMG(p.colors[0].img);
  p.images  = p.colors.map(c => IMG(c.img));
  p.gallery = [
    IMG(p.colors[0].img, 1400),
    IMG(p.colors[Math.min(1, p.colors.length - 1)].img, 1400),
    IMG(p.colors[Math.min(2, p.colors.length - 1)].img, 1400),
  ];
});

const LOOKBOOK = [
  {
    id: 'lb1', title: 'Dubai Dreamy',
    subtitle: 'Shot at golden hour on the rooftops of the Marina.',
    cover: IMG('1762623930916-4bdcd8dd475d', 1600),
    products: ['p01', 'p03', 'p10', 'p13'],
    body: 'The city at dusk. That particular glow when the desert heat softens and everything turns to gold. We dressed for it.',
  },
  {
    id: 'lb2', title: 'By the Water',
    subtitle: 'A morning spent slowly, somewhere with a view.',
    cover: IMG('1637526997367-d44a21b2c3c3', 1600),
    products: ['p07', 'p09', 'p11', 'p14'],
    body: 'Salt air and sunlight. The pieces that move from poolside to lunch without a second thought.',
  },
  {
    id: 'lb3', title: 'Neutrals',
    subtitle: 'An ode to the quiet power of doing less.',
    cover: IMG('1618288956847-283e162b1bfe', 1600),
    products: ['p02', 'p05', 'p12', 'p15'],
    body: 'Sand, ivory, stone. We reject visual chaos. Our neutral palette lets you be the statement.',
  },
];

const SUGGESTIONS = [
  'lace dress', 'maxi dress', 'crochet cover-up', 'kaftan',
  'bikini set', 'one piece', 'linen co-ord', 'wrap dress',
  'wide leg trouser', 'knit set',
];

Object.assign(window, { CATEGORIES, PRODUCTS, LOOKBOOK, SUGGESTIONS, IMG });

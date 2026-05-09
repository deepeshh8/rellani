// ===== RELLANI CATALOG =====

const IMG = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=90&auto=format&fit=crop&crop=center`;

const CATEGORIES = [
  { id: 'all', label: 'All' },
];

const sz = {
  cloth: ['XS', 'S', 'M', 'L', 'XL'],
  shoe:  ['37', '38', '39', '40', '41', '42', '43', '44'],
  one:   ['One size'],
  waist: ['26', '28', '30', '32', '34', '36'],
};

const PRODUCTS = [];

// Apply default rating + review counts
PRODUCTS.forEach((p, i) => {
  p.rating  = 4 + ((i * 13) % 10) / 10;
  p.reviews = 24 + ((i * 37) % 280);
  p.inStock = (i * 7) % 11 !== 3;
  p.image   = IMG(p.colors[0].img);
  p.images  = p.colors.map(c => IMG(c.img));
  p.gallery = [
    IMG(p.colors[0].img, 1200),
    IMG(p.colors[Math.min(1, p.colors.length - 1)].img, 1200),
    IMG(p.colors[Math.min(2, p.colors.length - 1)].img, 1200),
  ];
});

const LOOKBOOK = [];

const SUGGESTIONS = [];

Object.assign(window, { CATEGORIES, PRODUCTS, LOOKBOOK, SUGGESTIONS, IMG });

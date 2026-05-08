// ===== RELLANI CATALOG =====
// All imagery sourced from Unsplash (free editorial photography)

const IMG = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'knits', label: 'Knits' },
  { id: 'tops', label: 'Tops & Shirts' },
  { id: 'denim', label: 'Denim' },
  { id: 'trousers', label: 'Trousers' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
];

// helper
const sz = {
  cloth: ['XS', 'S', 'M', 'L', 'XL'],
  shoe: ['37', '38', '39', '40', '41', '42', '43', '44'],
  one: ['One size'],
  waist: ['26', '28', '30', '32', '34', '36'],
};

const PRODUCTS = [
  // ===== OUTERWEAR =====
  {
    id: 'p01', slug: 'aria-wool-overcoat', name: 'Silk Whisper',
    cat: 'outerwear', price: 248, gender: 'unisex', tags: ['new', 'editor-pick'],
    blurb: 'A relaxed, double-faced wool overcoat cut just past the knee. Unstructured shoulders, dropped sleeves, mother-of-pearl buttons.',
    detail: ['80% virgin wool, 20% cashmere', 'Double-faced, unlined construction', 'Two welt pockets, one inside chest', 'Made in Biella, Italy'],
    care: ['Dry clean only', 'Steam to refresh', 'Store on a wide hanger'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Camel', hex: '#B59874', img: '1591047139829-d91aecb6caea' },
      { name: 'Ink', hex: '#1E1A16', img: '1539533018447-63fcce2678e3' },
      { name: 'Stone', hex: '#A89F8E', img: '1591047139829-d91aecb6caea' },
    ],
  },
  {
    id: 'p02', slug: 'forest-quilted-jacket', name: 'Sapphire Serenade',
    cat: 'outerwear', price: 168, gender: 'unisex', tags: ['new'],
    blurb: 'A modern take on the country quilt, in a softened diamond stitch with corduroy collar.',
    detail: ['Recycled polyester shell', 'Down-alternative fill (RDS-free)', 'Corduroy collar trim', 'Two flap pockets, two slash'],
    care: ['Machine wash cold', 'Tumble dry low', 'Do not iron'],
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Forest', hex: '#2F3D2A', img: '1551488831-00ddcb6c6bd3' },
      { name: 'Sand', hex: '#C8B68F', img: '1583743814966-8936f5b7be1a' },
    ],
  },
  {
    id: 'p03', slug: 'workshop-trench', name: 'Oasis Jacket',
    cat: 'outerwear', price: 3790, gender: 'unisex', tags: ['editor-pick'],
    blurb: 'Our take on the classic. Cotton-gabardine, raglan sleeves, removable belt, lightly oversized.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Khaki', hex: '#9C8965', img: '1583743814966-8936f5b7be1a' },
      { name: 'Black', hex: '#0E0C0A', img: '1518049362265-d5b2a6b00b37' },
    ],
  },

  // ===== KNITS =====
  {
    id: 'p04', slug: 'soft-merino-crew', name: 'Champagne Cascade',
    cat: 'knits', price: 118, gender: 'unisex', tags: [],
    blurb: 'Featherweight merino in a relaxed crewneck. Spun in Italy on slow gauges for an even, supple hand.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Oat', hex: '#E5DDC8', img: '1556905055-8f358a7a47b2' },
      { name: 'Charcoal', hex: '#3A3631', img: '1620799140408-edc6dcb6d633' },
      { name: 'Rust', hex: '#BD4A28', img: '1490481651871-ab68de25d43d' },
      { name: 'Sage', hex: '#A4AE99', img: '1622445275576-721325763afe' },
    ],
  },
  {
    id: 'p05', slug: 'fisher-cable-knit', name: 'ZEBRA Stylist',
    cat: 'knits', price: 188, gender: 'unisex', tags: ['new'],
    blurb: 'A heirloom cable knit reimagined in undyed wool. Hand-finished hems.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Ecru', hex: '#EFE6D2', img: '1576566588028-4147f3842f27' },
      { name: 'Navy', hex: '#1E2A3F', img: '1591195853828-11db59a44f6b' },
    ],
  },
  {
    id: 'p06', slug: 'house-half-zip', name: 'Ember Embrace XZ',
    cat: 'knits', price: 148, gender: 'unisex', tags: [],
    blurb: 'A weighty cotton-cashmere half-zip with our signature ribbed funnel collar.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Slate', hex: '#5A6470', img: '1620012253295-c15cc3e65df4' },
      { name: 'Cream', hex: '#F0E8D4', img: '1611312449412-6cefac5dc3e4' },
    ],
  },

  // ===== TOPS =====
  {
    id: 'p07', slug: 'studio-poplin-shirt', name: 'ZXB T-Shirt',
    cat: 'tops', price: 98, gender: 'unisex', tags: [],
    blurb: 'A weekday workhorse in long-staple cotton. Slightly relaxed through the body, mother-of-pearl buttons.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FBF8F1', img: '1602810318383-e386cc2a3ccf' },
      { name: 'Sky', hex: '#9BB7CE', img: '1564584217132-2271feaeb3c5' },
      { name: 'Stripe', hex: '#7A8FA3', img: '1598033129183-c4f50c736f10' },
    ],
  },
  {
    id: 'p08', slug: 'heavy-cotton-tee', name: 'Denim T-Shirt',
    cat: 'tops', price: 48, gender: 'unisex', tags: ['bestseller'],
    blurb: 'A 240gsm cotton tee that holds its shape. Garment-dyed, pre-shrunk.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FBF8F1', img: '1521572163474-6864f9cf17ab' },
      { name: 'Black', hex: '#0E0C0A', img: '1583743814966-8936f5b7be1a' },
      { name: 'Olive', hex: '#5A5E3A', img: '1622445275463-afa2d2e9a92f' },
      { name: 'Brick', hex: '#8C3F2A', img: '1620799140408-edc6dcb6d633' },
    ],
  },
  {
    id: 'p09', slug: 'linen-camp-shirt', name: 'Lace Enigma Skirt',
    cat: 'tops', price: 88, gender: 'unisex', tags: ['new'],
    blurb: 'A breezy short-sleeve in 100% European linen. Open camp collar.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Bone', hex: '#EAE3D4', img: '1490578474895-699cd4e2cf59' },
      { name: 'Sage', hex: '#A4AE99', img: '1622445275576-721325763afe' },
    ],
  },
  {
    id: 'p10', slug: 'silk-cami', name: 'Golden Hour Jumpsuit',
    cat: 'tops', price: 118, gender: 'unisex', tags: [],
    blurb: 'A bias-cut silk cami with adjustable straps. Wear under, wear out.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Champagne', hex: '#D9C5A1', img: '1571945153237-4929e783af4a' },
      { name: 'Black', hex: '#0E0C0A', img: '1539109136881-3be0616acf4b' },
    ],
  },

  // ===== DENIM =====
  {
    id: 'p11', slug: 'archive-straight-jean', name: 'Flower Black Hat',
    cat: 'denim', price: 138, gender: 'unisex', tags: ['bestseller'],
    blurb: 'A true straight leg in 13.5oz Japanese selvedge. Sits at the natural waist.',
    sizes: sz.waist, sizeKind: 'waist',
    colors: [
      { name: 'Indigo', hex: '#2A3D5C', img: '1620799140408-edc6dcb6d633' },
      { name: 'Washed', hex: '#7B8FA3', img: '1582418702059-97ebafb35d09' },
      { name: 'Black', hex: '#1A1A1C', img: '1604176354204-9268737828e4' },
    ],
  },
  {
    id: 'p12', slug: 'wide-leg-denim', name: 'Moonstone Muse Hat',
    cat: 'denim', price: 158, gender: 'unisex', tags: [],
    blurb: 'A relaxed wide-leg with a high rise. The kind of jean that does the work for you.',
    sizes: sz.waist, sizeKind: 'waist',
    colors: [
      { name: 'Mid Wash', hex: '#6B82A0', img: '1604176354204-9268737828e4' },
      { name: 'Ecru', hex: '#E5DDC8', img: '1582552938357-32b906df40cb' },
    ],
  },
  {
    id: 'p13', slug: 'denim-chore-jacket', name: 'Denim Chore Jacket',
    cat: 'denim', price: 168, gender: 'unisex', tags: ['new'],
    blurb: 'A chore-coat-meets-denim in a heavy 14oz wash. Four patch pockets.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Indigo', hex: '#2A3D5C', img: '1591047139829-d91aecb6caea' },
    ],
  },

  // ===== TROUSERS =====
  {
    id: 'p14', slug: 'pleated-wool-trouser', name: 'Pleated Wool Trouser',
    cat: 'trousers', price: 168, gender: 'unisex', tags: [],
    blurb: 'A double-pleated trouser in tropical wool. Slightly tapered.',
    sizes: sz.waist, sizeKind: 'waist',
    colors: [
      { name: 'Charcoal', hex: '#3A3631', img: '1473966968600-fa801b869a1a' },
      { name: 'Camel', hex: '#B59874', img: '1594633312681-425c7b97ccd1' },
    ],
  },
  {
    id: 'p15', slug: 'utility-cargo', name: 'Utility Cargo',
    cat: 'trousers', price: 128, gender: 'unisex', tags: ['new'],
    blurb: 'A modern cargo with sculpted pockets. Heavy-twill cotton.',
    sizes: sz.waist, sizeKind: 'waist',
    colors: [
      { name: 'Olive', hex: '#5A5E3A', img: '1624378439575-d8705ad7ae80' },
      { name: 'Stone', hex: '#A89F8E', img: '1593032465175-481ac7f401a0' },
    ],
  },
  {
    id: 'p16', slug: 'pull-on-pant', name: 'Pull-On Pant',
    cat: 'trousers', price: 88, gender: 'unisex', tags: [],
    blurb: 'A loose, drawstring pant in laundered linen-cotton.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Bone', hex: '#EAE3D4', img: '1490578474895-699cd4e2cf59' },
      { name: 'Black', hex: '#0E0C0A', img: '1473966968600-fa801b869a1a' },
    ],
  },

  // ===== DRESSES =====
  {
    id: 'p17', slug: 'column-slip-dress', name: 'Column Slip Dress',
    cat: 'dresses', price: 178, gender: 'unisex', tags: ['editor-pick'],
    blurb: 'A bias-cut column dress in matte silk. Adjustable straps, low back.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Ink', hex: '#14110D', img: '1539109136881-3be0616acf4b' },
      { name: 'Champagne', hex: '#D9C5A1', img: '1572804013309-59a88b7e92f1' },
    ],
  },
  {
    id: 'p18', slug: 'poplin-shirt-dress', name: 'Poplin Shirt Dress',
    cat: 'dresses', price: 148, gender: 'unisex', tags: [],
    blurb: 'An effortless midi shirt dress in cotton poplin. Self-belt.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'White', hex: '#FBF8F1', img: '1572804013309-59a88b7e92f1' },
      { name: 'Sky', hex: '#9BB7CE', img: '1583744946564-b52ac1c389c8' },
    ],
  },
  {
    id: 'p19', slug: 'knit-tank-dress', name: 'Knit Tank Dress',
    cat: 'dresses', price: 128, gender: 'unisex', tags: ['new'],
    blurb: 'A fine-gauge knit dress that drapes the body.',
    sizes: sz.cloth, sizeKind: 'cloth',
    colors: [
      { name: 'Black', hex: '#0E0C0A', img: '1539109136881-3be0616acf4b' },
      { name: 'Cream', hex: '#F0E8D4', img: '1572804013309-59a88b7e92f1' },
    ],
  },

  // ===== SHOES =====
  {
    id: 'p20', slug: 'campus-runner', name: 'Campus Runner',
    cat: 'shoes', price: 168, gender: 'unisex', tags: ['bestseller'],
    blurb: 'A low-profile runner in suede and mesh. Made in Portugal.',
    sizes: sz.shoe, sizeKind: 'shoe',
    colors: [
      { name: 'Stone', hex: '#A89F8E', img: '1485518882345-15568b007705' },
      { name: 'Black', hex: '#0E0C0A', img: '1606107557195-0e29a4b5b4aa' },
      { name: 'Bone', hex: '#EAE3D4', img: '1595950653106-6c9ebd614d3a' },
    ],
  },
  {
    id: 'p21', slug: 'leather-derby', name: 'Leather Derby',
    cat: 'shoes', price: 268, gender: 'unisex', tags: [],
    blurb: 'A soft, hand-finished derby in vegetable-tanned calf.',
    sizes: sz.shoe, sizeKind: 'shoe',
    colors: [
      { name: 'Cognac', hex: '#7A4426', img: '1614252369475-531eba835eb1' },
      { name: 'Black', hex: '#0E0C0A', img: '1533867617858-e7b97e060509' },
    ],
  },
  {
    id: 'p22', slug: 'studio-loafer', name: 'Studio Loafer',
    cat: 'shoes', price: 198, gender: 'unisex', tags: ['new'],
    blurb: 'A penny loafer in soft, polished leather. Leather sole.',
    sizes: sz.shoe, sizeKind: 'shoe',
    colors: [
      { name: 'Cordovan', hex: '#5A2A22', img: '1582588678413-dbf45f4823e9' },
      { name: 'Black', hex: '#0E0C0A', img: '1614252369475-531eba835eb1' },
    ],
  },

  // ===== ACCESSORIES =====
  {
    id: 'p23', slug: 'every-day-tote', name: 'Every-Day Tote',
    cat: 'accessories', price: 198, gender: 'unisex', tags: ['bestseller'],
    blurb: 'A roomy tote in vegetable-tanned leather. Patinas with use.',
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'Tan', hex: '#A87B53', img: '1483985988355-763728e1935b' },
      { name: 'Black', hex: '#0E0C0A', img: '1542272604-787c3835535d' },
    ],
  },
  {
    id: 'p24', slug: 'silk-square', name: 'Hand-Rolled Silk Square',
    cat: 'accessories', price: 78, gender: 'unisex', tags: [],
    blurb: 'A 90cm hand-rolled silk square, printed in Como.',
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'Sand', hex: '#C8B68F', img: '1601924994987-69e26d50dc26' },
      { name: 'Plum', hex: '#4A2A3A', img: '1582142306909-195724d33ffc' },
    ],
  },
  {
    id: 'p25', slug: 'leather-belt', name: 'Italian Leather Belt',
    cat: 'accessories', price: 88, gender: 'unisex', tags: [],
    blurb: 'A 35mm vegetable-tanned belt with brass hardware.',
    sizes: ['S', 'M', 'L'], sizeKind: 'cloth',
    colors: [
      { name: 'Cognac', hex: '#7A4426', img: '1624222247344-550fb60583dc' },
      { name: 'Black', hex: '#0E0C0A', img: '1551232864-3f0890e580d9' },
    ],
  },
  {
    id: 'p26', slug: 'wool-cap', name: 'Felted Wool Cap',
    cat: 'accessories', price: 58, gender: 'unisex', tags: [],
    blurb: 'A six-panel cap in densely-felted wool.',
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'Black', hex: '#0E0C0A', img: '1521369909029-2afed882baee' },
      { name: 'Camel', hex: '#B59874', img: '1490481651871-ab68de25d43d' },
    ],
  },
  {
    id: 'p27', slug: 'linen-scarf', name: 'Linen Scarf',
    cat: 'accessories', price: 68, gender: 'unisex', tags: ['new'],
    blurb: 'A featherweight linen scarf with hand-rolled hems.',
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'Sage', hex: '#A4AE99', img: '1601924381811-e8b4dd03a76c' },
      { name: 'Bone', hex: '#EAE3D4', img: '1582142306909-195724d33ffc' },
    ],
  },
  {
    id: 'p28', slug: 'gold-hoops', name: 'Small Gold Hoops',
    cat: 'accessories', price: 128, gender: 'unisex', tags: [],
    blurb: '14k gold-vermeil hoops, 12mm. A daily wear.',
    sizes: sz.one, sizeKind: 'one',
    colors: [
      { name: 'Gold', hex: '#C8A35C', img: '1605100804763-247f67b3557e' },
      { name: 'Silver', hex: '#C8C8CE', img: '1611591437281-460bfbe1220a' },
    ],
  },
];

// Apply default rating + review counts deterministically
PRODUCTS.forEach((p, i) => {
  p.rating = 4 + ((i * 13) % 10) / 10; // 4.0–4.9
  p.reviews = 24 + ((i * 37) % 280);
  p.inStock = (i * 7) % 11 !== 3; // ~most in stock
  p.image = IMG(p.colors[0].img); // primary image
  p.images = p.colors.map(c => IMG(c.img));
  // a couple alt photos for gallery
  p.gallery = [
    IMG(p.colors[0].img, 1200),
    IMG(p.colors[Math.min(1, p.colors.length-1)].img, 1200),
    IMG(p.colors[Math.min(2, p.colors.length-1)].img, 1200),
  ];
});

// ===== LOOKBOOK =====
const LOOKBOOK = [
  {
    id: 'lb1', title: 'Quiet Hours',
    subtitle: 'A study in restraint, photographed in Lisbon, March 2026.',
    cover: IMG('1551488831-00ddcb6c6bd3', 1600),
    products: ['p01', 'p04', 'p11', 'p20'],
    body: 'There is a particular kind of light that arrives at the end of winter — slow, low, generous to materials. We chased it for three days. These are the clothes that came home.',
  },
  {
    id: 'lb2', title: 'House & Garden',
    subtitle: 'Spring layers, weekend ease.',
    cover: IMG('1571945153237-4929e783af4a', 1600),
    products: ['p06', 'p09', 'p15', 'p23'],
    body: 'Soft cottons, half-tucked shirts, sleeves rolled. The kind of dressing that gets out of the way of an afternoon.',
  },
  {
    id: 'lb3', title: 'Shore',
    subtitle: 'Dispatch from a coastal April.',
    cover: IMG('1490481651871-ab68de25d43d', 1600),
    products: ['p02', 'p07', 'p16', 'p27'],
    body: 'Wind. Rope. Salt. Linen that softens with every wash and a knit you can wear after the swim.',
  },
];

// ===== TYPEAHEAD SUGGESTIONS =====
const SUGGESTIONS = [
  'wool overcoat', 'merino crew', 'silk slip', 'wide-leg jean',
  'denim chore', 'pleated trouser', 'campus runner', 'leather tote',
  'linen shirt', 'cable knit', 'gold hoops',
];

// expose globally
Object.assign(window, { CATEGORIES, PRODUCTS, LOOKBOOK, SUGGESTIONS, IMG });

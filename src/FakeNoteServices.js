const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const initialNotes = [
  {
    id: 1,
    text: 'Github hesabı oluştur. GitHub, yazılım geliştiricilerin projelerini barındırabilecekleri bir platformdur. Linke tıklayarak githuba ulaşabilirsin',
    source: 'https://github.com/',
    category: 'technology',
  },
  {
    id: 2,
    text: 'Spor salonuna kayıt ol. Spor sağlıklı bir yaşam için önemlidir. Linkte sporun faydaları yazıyor',
    source:
      'https://www.macfit.com/blog/fitness/spor-yapmanin-az-bilinen-14-faydasi',
    category: 'health',
  },
  {
    id: 3,
    text: 'Ankara, Türkiye nin başkenti ve en kalabalık ikinci şehridir.Ankara, Türkiye nin siyasi, idari ve ekonomik merkezlerinden biridir. Anıtkabir, Kocatepe Camii ve Atatürk Orman Çiftliği gibi önemli turistik yerler bulunmaktadır.',
    source: 'https://tr.wikipedia.org/wiki/Ankara',
    category: 'society',
  },
  {
    id: 4,
    text: 'Filtreme TEST',
    source: 'https://tr.wikipedia.org/wiki/Ankara',
    category: 'science',
  },
  {
    id: 5,
    text: 'Filtreme TEST',
    source: 'https://tr.wikipedia.org/wiki/Ankara',
    category: 'finance',
  },
  {
    id: 6,
    text: 'Filtreme TEST',
    source: 'https://tr.wikipedia.org/wiki/Ankara',
    category: 'entertainment',
  },
  {
    id: 7,
    text: 'Filtreme TEST',
    source: 'https://tr.wikipedia.org/wiki/Ankara',
    category: 'history',
  },
  {
    id: 8,
    text: 'Filtreme TEST',
    source: 'https://tr.wikipedia.org/wiki/Ankara',
    category: 'news',
  },
];

export function getCategories() {
  return CATEGORIES;
}
export function getInitialNotes() {
  return initialNotes;
}

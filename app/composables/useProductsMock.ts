export const useProductsMock = () => {
  const products = [
    {
      id: 'baby-girls-floral-bodysuit',
      name: 'Baby Girls Floral Bodysuit 3-Pack',
      price: 17.18,
      originalPrice: 42.95,
      discount: '60% OFF',
      rating: 4.5,
      reviews: 1,
      badges: ['BEST SELLER', 'TOP RATED'],
      pack: '3 PACK',
      image: '/img/product_floral.jpg',
      colors: ['white', 'blue', 'pink']
    },
    {
      id: 'baby-boys-fish-henley',
      name: 'Baby Boys Fish Henley Bodysuit 3-Pack',
      price: 17.18,
      originalPrice: 42.95,
      discount: '60% OFF',
      rating: 5,
      reviews: 3,
      badges: ['BEST SELLER', 'TOP RATED'],
      pack: '3 PACK',
      image: '/img/product_fish_henley.jpg',
      colors: ['blue', 'white', 'stripes']
    },
    {
      id: 'baby-girls-floral-ruffle-leggings',
      name: 'Baby Girls Floral Ruffle Leggings 3-Pack',
      price: 15.98,
      originalPrice: 39.95,
      discount: '60% OFF',
      rating: 0,
      reviews: 0,
      badges: [],
      pack: '3 PACK',
      image: '/img/product_floral_leggings.jpg',
      colors: ['blue', 'pink', 'white']
    },
    {
      id: 'baby-boys-fish-pants',
      name: 'Baby Boys Fish Pants 3-Pack',
      price: 15.98,
      originalPrice: 39.95,
      discount: '60% OFF',
      rating: 5,
      reviews: 3,
      badges: ['TOP RATED'],
      pack: '3 PACK',
      image: '/img/product_fish_pants.jpg',
      colors: ['blue', 'white', 'stripes']
    },
    {
      id: 'baby-boys-sweater',
      name: 'Baby Boys Holiday Sweater',
      price: 24.98,
      originalPrice: 49.95,
      discount: '50% OFF',
      rating: 0,
      reviews: 0,
      badges: [],
      pack: null,
      image: '/img/product_sweater.jpg',
      colors: ['green', 'brown']
    },
    {
      id: 'baby-girls-bodysuit-pink',
      name: 'Baby Girls Solid Bodysuit 3-Pack',
      price: 14.98,
      originalPrice: 34.95,
      discount: '57% OFF',
      rating: 4.8,
      reviews: 12,
      badges: [],
      pack: '3 PACK',
      image: '/img/product_bodysuit_pink.jpg',
      colors: ['purple', 'white', 'pink']
    },
    {
      id: 'baby-girls-floral-dress',
      name: 'Baby Girls Floral Dress With Bloomers',
      price: 19.98,
      originalPrice: 39.95,
      discount: '50% OFF',
      rating: 5,
      reviews: 8,
      badges: [],
      pack: null,
      image: '/img/product_floral_dress.jpg',
      colors: ['white', 'orange']
    },
    // The promo block can be a special item or handled in the grid logic
    {
      id: 'promo-harvest',
      isPromo: true,
      image: '/img/promo_harvest.jpg',
      link: '/category/harvest'
    }
  ];

  const getProduct = (id: string) => products.find(p => p.id === id);

  return {
    products,
    getProduct
  };
};

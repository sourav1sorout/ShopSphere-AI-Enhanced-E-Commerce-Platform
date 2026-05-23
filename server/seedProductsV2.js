const { Product } = require('./models');

const productsData = [
  // Electronics - 12 products
  {
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 139999,
    discountPercentage: 10,
    stock: 45,
    ratings: 4.8,
    numReviews: 2340,
    category: 'Electronics',
    description: 'Latest flagship smartphone with A17 Pro chip, advanced camera system, and all-day battery.',
    image: 'https://images.unsplash.com/photo-1592286927505-1def25e88f6d?w=500',
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25e88f6d?w=500',
      'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500',
      'https://images.unsplash.com/photo-1511261635113-a055aedc937a?w=500'
    ],
    specifications: {
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      display: '6.7" Super Retina XDR',
      battery: '4685 mAh',
      camera: '48MP + 12MP + 12MP'
    },
    tags: ['smartphone', 'premium', '5G', 'camera'],
    isFeatured: true,
    sold: 280,
    color: 'Black',
    size: '6.7"'
  },
  {
    name: 'Samsung 65" QLED 4K TV',
    brand: 'Samsung',
    price: 89999,
    discountPercentage: 25,
    stock: 20,
    ratings: 4.7,
    numReviews: 1456,
    category: 'Electronics',
    description: 'Ultra HD 4K QLED Smart TV with quantum dots and HDR10+ support.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682a8a6b607?w=500',
    images: [
      'https://images.unsplash.com/photo-1593642532400-2682a8a6b607?w=500',
      'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500'
    ],
    specifications: {
      resolution: '4K UHD',
      panel: 'QLED',
      refresh: '120Hz',
      hdr: 'HDR10+, HLG',
      smartFeatures: 'Tizen OS'
    },
    tags: ['tv', '4k', 'smart', 'qled'],
    isFeatured: true,
    sold: 145,
    color: 'Black',
    size: '65"'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    brand: 'Sony',
    price: 29999,
    discountPercentage: 15,
    stock: 85,
    ratings: 4.9,
    numReviews: 3210,
    category: 'Electronics',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    specifications: {
      noiseCancellation: 'Active',
      battery: '30 hours',
      bluetooth: 'v5.3',
      driver: '40mm',
      weight: '250g'
    },
    tags: ['headphones', 'noise-cancelling', 'wireless', 'premium'],
    isFeatured: false,
    sold: 520,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'iPad Air 11-inch',
    brand: 'Apple',
    price: 79999,
    discountPercentage: 8,
    stock: 35,
    ratings: 4.7,
    numReviews: 1890,
    category: 'Electronics',
    description: 'Powerful tablet with M1 chip, stunning display, and Apple Pencil support.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
      'https://images.unsplash.com/photo-1533391304329-0fa0d82af999?w=500'
    ],
    specifications: {
      chip: 'M1',
      ram: '8GB',
      storage: '256GB',
      display: '11-inch Liquid Retina',
      battery: '15.9-hour'
    },
    tags: ['tablet', 'ipad', 'premium', 'productivity'],
    isFeatured: false,
    sold: 180,
    color: 'Space Grey',
    size: '11"'
  },
  {
    name: 'Dell XPS 13 Laptop',
    brand: 'Dell',
    price: 109999,
    discountPercentage: 12,
    stock: 28,
    ratings: 4.8,
    numReviews: 2100,
    category: 'Electronics',
    description: 'Ultra-portable laptop with Intel Core i7, 16GB RAM, and 512GB SSD.',
    image: 'https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=500',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=500'
    ],
    specifications: {
      processor: 'Intel Core i7',
      ram: '16GB',
      storage: '512GB SSD',
      display: '13.4" FHD',
      battery: '12+ hours'
    },
    tags: ['laptop', 'portable', 'work', 'premium'],
    isFeatured: false,
    sold: 210,
    color: 'Platinum Silver',
    size: '13.4"'
  },
  {
    name: 'Canon EOS R6 Camera',
    brand: 'Canon',
    price: 249999,
    discountPercentage: 18,
    stock: 12,
    ratings: 4.9,
    numReviews: 890,
    category: 'Electronics',
    description: 'Professional mirrorless camera with 20MP sensor and 4K video recording.',
    image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500',
    images: [
      'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500',
      'https://images.unsplash.com/photo-1606933248051-5ce98c9a6fac?w=500'
    ],
    specifications: {
      sensor: '20MP Full Frame',
      video: '4K 60fps',
      autofocus: 'Dual Pixel AF',
      battery: '3-4 hours continuous'
    },
    tags: ['camera', 'professional', 'mirrorless', '4k'],
    isFeatured: false,
    sold: 95,
    color: 'Black',
    size: 'Professional'
  },
  {
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 119999,
    discountPercentage: 15,
    stock: 55,
    ratings: 4.7,
    numReviews: 1765,
    category: 'Electronics',
    description: 'Google flagship with advanced AI features, exceptional camera, and pure Android.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
      'https://images.unsplash.com/photo-1572437090568-e5b99f06b0e2?w=500'
    ],
    specifications: {
      processor: 'Tensor G3',
      ram: '12GB',
      storage: '512GB',
      display: '6.7" OLED',
      camera: '50MP + 48MP + 48MP'
    },
    tags: ['smartphone', 'ai', 'camera', 'google'],
    isFeatured: true,
    sold: 320,
    color: 'Obsidian',
    size: '6.7"'
  },
  {
    name: 'Apple MacBook Pro 16"',
    brand: 'Apple',
    price: 239999,
    discountPercentage: 8,
    stock: 18,
    ratings: 4.9,
    numReviews: 2456,
    category: 'Electronics',
    description: 'Powerful laptop with M3 Max chip, 36GB RAM, and stunning Retina display.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500'
    ],
    specifications: {
      chip: 'M3 Max',
      ram: '36GB',
      storage: '1TB SSD',
      display: '16" Retina',
      battery: '18+ hours'
    },
    tags: ['laptop', 'professional', 'mac', 'powerful'],
    isFeatured: true,
    sold: 280,
    color: 'Space Black',
    size: '16"'
  },
  {
    name: 'Meta Quest 3 VR Headset',
    brand: 'Meta',
    price: 49999,
    discountPercentage: 20,
    stock: 40,
    ratings: 4.6,
    numReviews: 1320,
    category: 'Electronics',
    description: 'Advanced VR headset with mixed reality capabilities and high-resolution displays.',
    image: 'https://images.unsplash.com/photo-1617638924702-92f37fcab133?w=500',
    images: [
      'https://images.unsplash.com/photo-1617638924702-92f37fcab133?w=500',
      'https://images.unsplash.com/photo-1618537391154-6db71e1cd1c9?w=500'
    ],
    specifications: {
      resolution: '4K per eye',
      fieldOfView: '110 degrees',
      processor: 'Snapdragon XR Gen 2',
      storage: '512GB',
      battery: '2.5 hours'
    },
    tags: ['vr', 'headset', 'metaverse', 'gaming'],
    isFeatured: false,
    sold: 180,
    color: 'White',
    size: 'One Size'
  },
  {
    name: 'NVIDIA RTX 4090 Graphics Card',
    brand: 'NVIDIA',
    price: 199999,
    discountPercentage: 0,
    stock: 8,
    ratings: 4.8,
    numReviews: 567,
    category: 'Electronics',
    description: 'Flagship GPU for gaming and professional applications with 24GB GDDR6X memory.',
    image: 'https://images.unsplash.com/photo-1587829191301-f7d0b77a74db?w=500',
    images: [
      'https://images.unsplash.com/photo-1587829191301-f7d0b77a74db?w=500'
    ],
    specifications: {
      memory: '24GB GDDR6X',
      architecture: 'Ada Lovelace',
      tdp: '575W',
      cuda: '16,384 CUDA cores'
    },
    tags: ['gpu', 'gaming', 'professional', 'graphics'],
    isFeatured: false,
    sold: 120,
    color: 'Black',
    size: 'Standard'
  },
  {
    name: 'Bose QuietComfort 45 Headphones',
    brand: 'Bose',
    price: 34999,
    discountPercentage: 20,
    stock: 65,
    ratings: 4.8,
    numReviews: 2890,
    category: 'Electronics',
    description: 'Premium noise-cancelling headphones with excellent comfort and sound quality.',
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500',
    images: [
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    specifications: {
      noiseCancellation: 'Active',
      battery: '24 hours',
      bluetooth: 'v5.3',
      driver: '40mm',
      weight: '240g'
    },
    tags: ['headphones', 'noise-cancelling', 'wireless', 'comfort'],
    isFeatured: false,
    sold: 450,
    color: 'Black',
    size: 'One Size'
  },

  // Fashion - 12 products
  {
    name: 'Premium Cotton T-Shirt',
    brand: 'Calvin Klein',
    price: 1999,
    discountPercentage: 30,
    stock: 150,
    ratings: 4.5,
    numReviews: 567,
    category: 'Fashion',
    description: 'Classic cotton t-shirt with perfect fit and premium quality fabric.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500'
    ],
    specifications: {
      material: '100% Cotton',
      weight: '150gsm',
      care: 'Machine wash cold'
    },
    tags: ['tshirt', 'casual', 'cotton', 'men'],
    isFeatured: true,
    sold: 650,
    color: 'White',
    size: 'M'
  },
  {
    name: 'Slim Fit Jeans',
    brand: 'Levi\'s',
    price: 3499,
    discountPercentage: 25,
    stock: 120,
    ratings: 4.7,
    numReviews: 1234,
    category: 'Fashion',
    description: 'Classic slim fit denim jeans with authentic blue color and superior comfort.',
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500'
    ],
    specifications: {
      material: '98% Cotton, 2% Elastane',
      fit: 'Slim',
      rise: 'Mid-rise',
      inseam: '32 inches'
    },
    tags: ['jeans', 'denim', 'casual', 'men'],
    isFeatured: true,
    sold: 890,
    color: 'Blue',
    size: '32'
  },
  {
    name: 'Formal Blazer',
    brand: 'Tommy Hilfiger',
    price: 7999,
    discountPercentage: 35,
    stock: 45,
    ratings: 4.6,
    numReviews: 456,
    category: 'Fashion',
    description: 'Professional formal blazer perfect for business meetings and events.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359498b933f?w=500',
    images: [
      'https://images.unsplash.com/photo-1505236858219-8359498b933f?w=500',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500'
    ],
    specifications: {
      material: '85% Polyester, 15% Wool',
      fit: 'Regular',
      buttons: 'Two button',
      pockets: 'Notch lapel'
    },
    tags: ['blazer', 'formal', 'business', 'men'],
    isFeatured: false,
    sold: 280,
    color: 'Black',
    size: 'L'
  },
  {
    name: 'Summer Dress',
    brand: 'Zara',
    price: 4999,
    discountPercentage: 20,
    stock: 80,
    ratings: 4.8,
    numReviews: 1120,
    category: 'Fashion',
    description: 'Elegant summer dress perfect for casual outings and warm weather.',
    image: 'https://images.unsplash.com/photo-1595777707802-51b50fe5395c?w=500',
    images: [
      'https://images.unsplash.com/photo-1595777707802-51b50fe5395c?w=500',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    specifications: {
      material: '100% Linen',
      style: 'A-line',
      length: 'Knee-length',
      sleeves: 'Sleeveless'
    },
    tags: ['dress', 'summer', 'casual', 'women'],
    isFeatured: false,
    sold: 420,
    color: 'Light Blue',
    size: 'S'
  },
  {
    name: 'Wool Sweater',
    brand: 'Gucci',
    price: 12999,
    discountPercentage: 15,
    stock: 35,
    ratings: 4.9,
    numReviews: 789,
    category: 'Fashion',
    description: 'Premium wool sweater with luxurious feel and sophisticated style.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    specifications: {
      material: '100% Virgin Wool',
      weight: 'Medium',
      fit: 'Slim',
      care: 'Hand wash'
    },
    tags: ['sweater', 'wool', 'premium', 'unisex'],
    isFeatured: false,
    sold: 195,
    color: 'Navy',
    size: 'M'
  },
  {
    name: 'Denim Jacket',
    brand: 'Wrangler',
    price: 4499,
    discountPercentage: 28,
    stock: 90,
    ratings: 4.6,
    numReviews: 834,
    category: 'Fashion',
    description: 'Classic denim jacket perfect for layering and casual style.',
    image: 'https://images.unsplash.com/photo-1506629082632-c06b8b9264b4?w=500',
    images: [
      'https://images.unsplash.com/photo-1506629082632-c06b8b9264b4?w=500',
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500'
    ],
    specifications: {
      material: '100% Cotton',
      fit: 'Classic',
      buttons: 'Metal buttons',
      pockets: '4 pockets'
    },
    tags: ['jacket', 'denim', 'casual', 'unisex'],
    isFeatured: false,
    sold: 540,
    color: 'Medium Blue',
    size: 'L'
  },
  {
    name: 'Polo Shirt',
    brand: 'Ralph Lauren',
    price: 3999,
    discountPercentage: 22,
    stock: 110,
    ratings: 4.7,
    numReviews: 1089,
    category: 'Fashion',
    description: 'Classic polo shirt with embroidered logo and premium cotton.',
    image: 'https://images.unsplash.com/photo-1596215326571-35882a06dae6?w=500',
    images: [
      'https://images.unsplash.com/photo-1596215326571-35882a06dae6?w=500',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500'
    ],
    specifications: {
      material: '100% Cotton Pique',
      fit: 'Custom Fit',
      collar: 'Collar',
      sleeves: 'Short sleeves'
    },
    tags: ['polo', 'casual', 'premium', 'men'],
    isFeatured: false,
    sold: 620,
    color: 'Red',
    size: 'M'
  },
  {
    name: 'Cargo Pants',
    brand: 'Timberland',
    price: 5499,
    discountPercentage: 18,
    stock: 75,
    ratings: 4.5,
    numReviews: 567,
    category: 'Fashion',
    description: 'Durable cargo pants with multiple pockets and comfortable fit.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500',
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500'
    ],
    specifications: {
      material: '100% Cotton Canvas',
      pockets: '6 pockets + cargo',
      fit: 'Relaxed',
      inseam: '32 inches'
    },
    tags: ['pants', 'cargo', 'outdoor', 'men'],
    isFeatured: false,
    sold: 380,
    color: 'Khaki',
    size: '32'
  },
  {
    name: 'Leather Blazer',
    brand: 'Hugo Boss',
    price: 14999,
    discountPercentage: 25,
    stock: 28,
    ratings: 4.8,
    numReviews: 612,
    category: 'Fashion',
    description: 'Premium leather blazer for a sophisticated and edgy look.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500'
    ],
    specifications: {
      material: '100% Genuine Leather',
      fit: 'Tailored',
      lining: 'Silk lining',
      buttons: 'Two button'
    },
    tags: ['blazer', 'leather', 'premium', 'unisex'],
    isFeatured: true,
    sold: 145,
    color: 'Black',
    size: 'M'
  },
  {
    name: 'Hoodie',
    brand: 'Nike',
    price: 3999,
    discountPercentage: 30,
    stock: 160,
    ratings: 4.6,
    numReviews: 1456,
    category: 'Fashion',
    description: 'Comfortable cotton blend hoodie perfect for casual wear.',
    image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500',
    images: [
      'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500',
      'https://images.unsplash.com/photo-1535656713121-3a32128eae28?w=500'
    ],
    specifications: {
      material: '80% Cotton, 20% Polyester',
      weight: 'Medium',
      drawstring: 'Yes',
      pockets: 'Kangaroo pocket'
    },
    tags: ['hoodie', 'casual', 'comfortable', 'unisex'],
    isFeatured: false,
    sold: 780,
    color: 'Black',
    size: 'M'
  },

  // Footwear - 12 products
  {
    name: 'Running Shoes',
    brand: 'Nike',
    price: 7999,
    discountPercentage: 20,
    stock: 120,
    ratings: 4.7,
    numReviews: 1820,
    category: 'Footwear',
    description: 'High-performance running shoes with advanced cushioning technology.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1542409847-87d2e6907374?w=500'
    ],
    specifications: {
      technology: 'Air Max',
      material: 'Mesh + Rubber',
      weight: '280g',
      cushioning: 'Responsive'
    },
    tags: ['shoes', 'running', 'sports', 'men'],
    isFeatured: true,
    sold: 650,
    color: 'Black/White',
    size: '9'
  },
  {
    name: 'Casual Sneakers',
    brand: 'Adidas',
    price: 5999,
    discountPercentage: 25,
    stock: 140,
    ratings: 4.8,
    numReviews: 2134,
    category: 'Footwear',
    description: 'Versatile casual sneakers suitable for everyday wear and outdoor activities.',
    image: 'https://images.unsplash.com/photo-1572821328656-ce1f2e4f8acb?w=500',
    images: [
      'https://images.unsplash.com/photo-1572821328656-ce1f2e4f8acb?w=500',
      'https://images.unsplash.com/photo-1620799141408-edc17a6db8c0?w=500'
    ],
    specifications: {
      technology: 'Boost',
      material: 'Textile + Rubber',
      weight: '320g',
      sole: 'Rubber outsole'
    },
    tags: ['sneakers', 'casual', 'comfortable', 'unisex'],
    isFeatured: true,
    sold: 820,
    color: 'White',
    size: '9'
  },
  {
    name: 'Leather Formal Shoes',
    brand: 'Clarks',
    price: 6999,
    discountPercentage: 15,
    stock: 85,
    ratings: 4.6,
    numReviews: 945,
    category: 'Footwear',
    description: 'Premium leather formal shoes perfect for business and formal occasions.',
    image: 'https://images.unsplash.com/photo-1533487856490-52e3c187294a?w=500',
    images: [
      'https://images.unsplash.com/photo-1533487856490-52e3c187294a?w=500',
      'https://images.unsplash.com/photo-1532096122291-4b8f3c5c7b5f?w=500'
    ],
    specifications: {
      material: '100% Genuine Leather',
      sole: 'Leather sole',
      style: 'Oxford',
      comfort: 'Memory foam insole'
    },
    tags: ['shoes', 'formal', 'leather', 'men'],
    isFeatured: false,
    sold: 420,
    color: 'Brown',
    size: '9'
  },
  {
    name: 'Basketball Shoes',
    brand: 'Jordan',
    price: 12999,
    discountPercentage: 18,
    stock: 60,
    ratings: 4.9,
    numReviews: 1567,
    category: 'Footwear',
    description: 'High-performance basketball shoes with excellent ankle support and grip.',
    image: 'https://images.unsplash.com/photo-1585487000714-ac8e2f3e75aa?w=500',
    images: [
      'https://images.unsplash.com/photo-1585487000714-ac8e2f3e75aa?w=500',
      'https://images.unsplash.com/photo-1590755692152-6fbe6c8cdd8f?w=500'
    ],
    specifications: {
      technology: 'Air Jordan XXXVIII',
      material: 'Leather + Mesh',
      weight: '420g',
      cushioning: 'Air cushioning'
    },
    tags: ['shoes', 'basketball', 'sports', 'men'],
    isFeatured: false,
    sold: 380,
    color: 'Red/Black',
    size: '10'
  },
  {
    name: 'Flip Flops',
    brand: 'Havaianas',
    price: 999,
    discountPercentage: 40,
    stock: 200,
    ratings: 4.5,
    numReviews: 2340,
    category: 'Footwear',
    description: 'Comfortable and stylish flip flops perfect for summer and beach.',
    image: 'https://images.unsplash.com/photo-1572821328656-ce1f2e4f8acb?w=500',
    images: [
      'https://images.unsplash.com/photo-1572821328656-ce1f2e4f8acb?w=500'
    ],
    specifications: {
      material: 'Rubber',
      sole: 'Non-slip',
      style: 'Classic',
      weight: '150g'
    },
    tags: ['flipflops', 'casual', 'summer', 'unisex'],
    isFeatured: false,
    sold: 1200,
    color: 'Yellow',
    size: 'One Size'
  },
  {
    name: 'Hiking Boots',
    brand: 'Salomon',
    price: 9999,
    discountPercentage: 22,
    stock: 45,
    ratings: 4.8,
    numReviews: 834,
    category: 'Footwear',
    description: 'Durable hiking boots with excellent grip and ankle support for outdoor adventures.',
    image: 'https://images.unsplash.com/photo-1490496768836-7c6f1c9b4b30?w=500',
    images: [
      'https://images.unsplash.com/photo-1490496768836-7c6f1c9b4b30?w=500',
      'https://images.unsplash.com/photo-1476566821498-c4db4ef13e67?w=500'
    ],
    specifications: {
      material: 'Waterproof Leather',
      sole: 'Vibram sole',
      height: 'Mid-cut',
      weight: '480g'
    },
    tags: ['boots', 'hiking', 'outdoor', 'men'],
    isFeatured: false,
    sold: 210,
    color: 'Brown',
    size: '9'
  },
  {
    name: 'Ballet Pointe Shoes',
    brand: 'Bloch',
    price: 4499,
    discountPercentage: 10,
    stock: 30,
    ratings: 4.9,
    numReviews: 456,
    category: 'Footwear',
    description: 'Professional ballet pointe shoes with superior arch support and comfort.',
    image: 'https://images.unsplash.com/photo-1514632046557-375d-330c07?w=500',
    images: [
      'https://images.unsplash.com/photo-1514632046557-375d-330c07?w=500'
    ],
    specifications: {
      material: 'Satin + Reinforced box',
      weight: '120g per pair',
      archSupport: 'Professional',
      flexibility: 'Medium'
    },
    tags: ['ballet', 'dance', 'professional', 'women'],
    isFeatured: false,
    sold: 95,
    color: 'Pink',
    size: '6'
  },
  {
    name: 'Converse Chuck Taylor All Stars',
    brand: 'Converse',
    price: 3999,
    discountPercentage: 20,
    stock: 150,
    ratings: 4.7,
    numReviews: 2156,
    category: 'Footwear',
    description: 'Iconic canvas sneakers perfect for casual and retro style.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
      'https://images.unsplash.com/photo-1554917519-ead146152fbe?w=500'
    ],
    specifications: {
      material: 'Canvas',
      sole: 'Rubber',
      style: 'High-top',
      weight: '350g'
    },
    tags: ['sneakers', 'casual', 'retro', 'unisex'],
    isFeatured: false,
    sold: 890,
    color: 'White',
    size: '8'
  },
  {
    name: 'Loafers',
    brand: 'Cole Haan',
    price: 5999,
    discountPercentage: 18,
    stock: 70,
    ratings: 4.6,
    numReviews: 612,
    category: 'Footwear',
    description: 'Comfortable leather loafers suitable for both casual and semi-formal occasions.',
    image: 'https://images.unsplash.com/photo-1530268729831-4ca8167d632d?w=500',
    images: [
      'https://images.unsplash.com/photo-1530268729831-4ca8167d632d?w=500'
    ],
    specifications: {
      material: 'Genuine Leather',
      sole: 'Leather sole with grip',
      style: 'Penny loafer',
      comfort: 'Cushioned insole'
    },
    tags: ['loafers', 'casual', 'comfortable', 'men'],
    isFeatured: false,
    sold: 320,
    color: 'Black',
    size: '9'
  },
  {
    name: 'Sandals',
    brand: 'Birkenstock',
    price: 3499,
    discountPercentage: 15,
    stock: 110,
    ratings: 4.8,
    numReviews: 1789,
    category: 'Footwear',
    description: 'Comfortable and ergonomic sandals perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500',
    images: [
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500'
    ],
    specifications: {
      material: 'Suede + EVA',
      sole: 'EVA sole',
      archSupport: 'Contoured',
      weight: '200g'
    },
    tags: ['sandals', 'comfortable', 'casual', 'unisex'],
    isFeatured: false,
    sold: 620,
    color: 'Brown',
    size: 'One Size'
  },

  // Watches - 10 products
  {
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    price: 34999,
    discountPercentage: 12,
    stock: 60,
    ratings: 4.8,
    numReviews: 2134,
    category: 'Watches',
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and cellular connectivity.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    specifications: {
      display: '1.9" LTPO AMOLED',
      processor: 'S9 SiP',
      battery: '18 hours',
      waterResistance: '50m'
    },
    tags: ['smartwatch', 'fitness', 'apple', 'premium'],
    isFeatured: true,
    sold: 320,
    color: 'Midnight',
    size: '45mm'
  },
  {
    name: 'Rolex Submariner',
    brand: 'Rolex',
    price: 999999,
    discountPercentage: 0,
    stock: 3,
    ratings: 5.0,
    numReviews: 12,
    category: 'Watches',
    description: 'Iconic luxury diving watch with Swiss precision and timeless design.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500'
    ],
    specifications: {
      material: 'Stainless Steel',
      movment: 'Swiss automatic',
      waterResistance: '300m',
      diameter: '40mm'
    },
    tags: ['watch', 'luxury', 'swiss', 'diving'],
    isFeatured: true,
    sold: 8,
    color: 'Silver',
    size: '40mm'
  },
  {
    name: 'Samsung Galaxy Watch 6',
    brand: 'Samsung',
    price: 22999,
    discountPercentage: 15,
    stock: 80,
    ratings: 4.6,
    numReviews: 1456,
    category: 'Watches',
    description: 'Feature-rich Android smartwatch with excellent display and health features.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    specifications: {
      display: '1.3" Super AMOLED',
      processor: 'Exynos W920',
      battery: '40 hours',
      waterResistance: '50m'
    },
    tags: ['smartwatch', 'android', 'fitness', 'samsung'],
    isFeatured: false,
    sold: 210,
    color: 'Graphite',
    size: '40mm'
  },
  {
    name: 'Omega Seamaster',
    brand: 'Omega',
    price: 450000,
    discountPercentage: 0,
    stock: 5,
    ratings: 4.9,
    numReviews: 34,
    category: 'Watches',
    description: 'Precision Swiss sports watch with iconic design and exceptional accuracy.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500'
    ],
    specifications: {
      material: 'Stainless Steel',
      movment: 'Swiss automatic',
      waterResistance: '300m',
      diameter: '42mm'
    },
    tags: ['watch', 'luxury', 'swiss', 'sports'],
    isFeatured: false,
    sold: 12,
    color: 'Blue',
    size: '42mm'
  },
  {
    name: 'Fossil Smartwatch',
    brand: 'Fossil',
    price: 12999,
    discountPercentage: 25,
    stock: 90,
    ratings: 4.5,
    numReviews: 923,
    category: 'Watches',
    description: 'Stylish hybrid smartwatch combining classic design with smart features.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    specifications: {
      display: 'Hybrid AMOLED',
      processor: 'Snapdragon Wear 4100+',
      battery: '2-3 days',
      waterResistance: '30m'
    },
    tags: ['smartwatch', 'hybrid', 'fashion', 'casual'],
    isFeatured: false,
    sold: 180,
    color: 'Brown',
    size: 'One Size'
  },
  {
    name: 'Casio G-Shock',
    brand: 'Casio',
    price: 5999,
    discountPercentage: 20,
    stock: 120,
    ratings: 4.7,
    numReviews: 2340,
    category: 'Watches',
    description: 'Rugged digital watch known for durability and reliability.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    specifications: {
      material: 'Resin case and band',
      movment: 'Quartz',
      battery: ''
    },
    tags: ['watch', 'digital', 'rugged', 'sports'],
    isFeatured: false,
    sold: 450,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Seiko Automatic Watch',
    brand: 'Seiko',
    price: 18999,
    discountPercentage: 10,
    stock: 50,
    ratings: 4.8,
    numReviews: 678,
    category: 'Watches',
    description: 'Japanese precision automatic watch with elegant design and reliable movement.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500'
    ],
    specifications: {
      material: 'Stainless Steel',
      movment: 'Automatic',
      waterResistance: '100m',
      diameter: '42mm'
    },
    tags: ['watch', 'automatic', 'seiko', 'elegant'],
    isFeatured: false,
    sold: 125,
    color: 'Silver',
    size: '42mm'
  },
  {
    name: 'Fitbit Charge 6',
    brand: 'Fitbit',
    price: 14999,
    discountPercentage: 18,
    stock: 70,
    ratings: 4.6,
    numReviews: 1123,
    category: 'Watches',
    description: 'Advanced fitness tracker with heart rate monitoring and sleep tracking.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    specifications: {
      display: 'AMOLED',
      battery: '7+ days',
      waterResistance: '50m',
      sensors: 'Heart rate, SpO2, temp'
    },
    tags: ['fitness', 'tracker', 'health', 'smartwatch'],
    isFeatured: false,
    sold: 240,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Titan Chronograph',
    brand: 'Titan',
    price: 8999,
    discountPercentage: 30,
    stock: 85,
    ratings: 4.5,
    numReviews: 834,
    category: 'Watches',
    description: 'Stylish chronograph watch with precision movement and modern design.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500'
    ],
    specifications: {
      material: 'Stainless Steel',
      movment: 'Quartz chronograph',
      waterResistance: '50m',
      diameter: '42mm'
    },
    tags: ['watch', 'chronograph', 'stylish', 'casual'],
    isFeatured: false,
    sold: 210,
    color: 'Black',
    size: '42mm'
  },

  // Beauty & Personal Care - 9 products
  {
    name: 'Skincare Moisturizer',
    brand: 'Cetaphil',
    price: 799,
    discountPercentage: 15,
    stock: 200,
    ratings: 4.7,
    numReviews: 3456,
    category: 'Beauty & Personal Care',
    description: 'Gentle dermatologist-recommended moisturizer suitable for all skin types.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '100ml',
      skinType: 'All types',
      ingredients: 'Hyaluronic acid, glycerin'
    },
    tags: ['skincare', 'moisturizer', 'beauty', 'dermatologist'],
    isFeatured: true,
    sold: 890,
    color: 'White',
    size: '100ml'
  },
  {
    name: 'Face Wash',
    brand: 'Neutrogena',
    price: 349,
    discountPercentage: 20,
    stock: 250,
    ratings: 4.6,
    numReviews: 2890,
    category: 'Beauty & Personal Care',
    description: 'Gentle face wash that removes oil and makeup without over-drying.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '150ml',
      skinType: 'Oily, combination',
      foaming: 'Gentle foam'
    },
    tags: ['skincare', 'cleanser', 'beauty', 'daily'],
    isFeatured: false,
    sold: 1450,
    color: 'Clear',
    size: '150ml'
  },
  {
    name: 'Sunscreen SPF 50',
    brand: 'Coppertone',
    price: 599,
    discountPercentage: 25,
    stock: 180,
    ratings: 4.8,
    numReviews: 2134,
    category: 'Beauty & Personal Care',
    description: 'High-SPF sunscreen providing broad spectrum protection against UV rays.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      spf: '50+',
      size: '200ml',
      waterResistant: '80 minutes'
    },
    tags: ['sunscreen', 'protection', 'uv', 'outdoor'],
    isFeatured: false,
    sold: 650,
    color: 'Cream',
    size: '200ml'
  },
  {
    name: 'Hair Shampoo',
    brand: 'L\'Oreal',
    price: 449,
    discountPercentage: 18,
    stock: 220,
    ratings: 4.7,
    numReviews: 2567,
    category: 'Beauty & Personal Care',
    description: 'Professional-grade shampoo for healthy, shiny hair.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '250ml',
      hairType: 'All types',
      ingredients: 'Keratin, proteins'
    },
    tags: ['shampoo', 'hair', 'professional', 'beauty'],
    isFeatured: false,
    sold: 780,
    color: 'Clear',
    size: '250ml'
  },
  {
    name: 'Lip Balm',
    brand: 'Burt\'s Bees',
    price: 299,
    discountPercentage: 10,
    stock: 300,
    ratings: 4.8,
    numReviews: 3123,
    category: 'Beauty & Personal Care',
    description: 'Natural lip balm with beeswax and essential oils for moisturized lips.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '4.25g',
      natural: '100% Natural',
      flavor: 'Original'
    },
    tags: ['lipbalm', 'natural', 'beauty', 'moisturizing'],
    isFeatured: false,
    sold: 1200,
    color: 'Natural',
    size: '4.25g'
  },
  {
    name: 'Lipstick',
    brand: 'MAC',
    price: 1999,
    discountPercentage: 12,
    stock: 100,
    ratings: 4.9,
    numReviews: 1890,
    category: 'Beauty & Personal Care',
    description: 'Premium lipstick with intense color and long-lasting formula.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      weight: '3g',
      finish: 'Matte',
      shade: 'Ruby Woo'
    },
    tags: ['lipstick', 'makeup', 'premium', 'beauty'],
    isFeatured: false,
    sold: 340,
    color: 'Ruby Red',
    size: '3g'
  },
  {
    name: 'Nail Polish',
    brand: 'OPI',
    price: 599,
    discountPercentage: 20,
    stock: 150,
    ratings: 4.6,
    numReviews: 1234,
    category: 'Beauty & Personal Care',
    description: 'High-quality nail polish with vibrant colors and long-lasting shine.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '15ml',
      finish: 'Glossy',
      color: 'Coral Pink'
    },
    tags: ['nailpolish', 'makeup', 'colorful', 'beauty'],
    isFeatured: false,
    sold: 420,
    color: 'Coral Pink',
    size: '15ml'
  },
  {
    name: 'Face Mask',
    brand: 'Peel Off',
    price: 499,
    discountPercentage: 30,
    stock: 180,
    ratings: 4.7,
    numReviews: 2156,
    category: 'Beauty & Personal Care',
    description: 'Detoxifying peel-off face mask for deep cleansing and pore minimization.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '100ml',
      type: 'Peel-off',
      benefit: 'Detoxifying'
    },
    tags: ['facemask', 'skincare', 'detox', 'beauty'],
    isFeatured: false,
    sold: 580,
    color: 'Black',
    size: '100ml'
  },
  {
    name: 'Perfume',
    brand: 'Dior',
    price: 6999,
    discountPercentage: 15,
    stock: 50,
    ratings: 4.9,
    numReviews: 1567,
    category: 'Beauty & Personal Care',
    description: 'Luxurious fragrance with exotic notes and long-lasting scent.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500'
    ],
    specifications: {
      size: '50ml',
      type: 'Eau de Parfum',
      notes: 'Floral, woody, musk'
    },
    tags: ['perfume', 'fragrance', 'luxury', 'beauty'],
    isFeatured: true,
    sold: 180,
    color: 'Clear',
    size: '50ml'
  },

  // Home & Kitchen - 9 products
  {
    name: 'Stainless Steel Cookware Set',
    brand: 'Calphalon',
    price: 7999,
    discountPercentage: 30,
    stock: 40,
    ratings: 4.7,
    numReviews: 1234,
    category: 'Home & Kitchen',
    description: '10-piece stainless steel cookware set with non-stick coating.',
    image: 'https://images.unsplash.com/photo-1584622750953-41706a4b34c4?w=500',
    images: [
      'https://images.unsplash.com/photo-1584622750953-41706a4b34c4?w=500'
    ],
    specifications: {
      pieces: '10',
      material: 'Stainless steel',
      coating: 'Non-stick',
      induction: 'Yes'
    },
    tags: ['cookware', 'kitchen', 'stainless-steel', 'cooking'],
    isFeatured: true,
    sold: 210,
    color: 'Silver',
    size: 'One Size'
  },
  {
    name: 'Coffee Maker',
    brand: 'Nespresso',
    price: 8999,
    discountPercentage: 20,
    stock: 65,
    ratings: 4.8,
    numReviews: 2345,
    category: 'Home & Kitchen',
    description: 'Automatic coffee maker with espresso and cappuccino functionality.',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500'
    ],
    specifications: {
      capacity: '1L',
      power: '1260W',
      temperature: 'Adjustable',
      features: 'Frother included'
    },
    tags: ['coffee', 'maker', 'kitchen', 'appliance'],
    isFeatured: false,
    sold: 380,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Microwave Oven',
    brand: 'Samsung',
    price: 9999,
    discountPercentage: 18,
    stock: 35,
    ratings: 4.6,
    numReviews: 1567,
    category: 'Home & Kitchen',
    description: '25L microwave oven with multiple cooking modes and sensor reheat.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500'
    ],
    specifications: {
      capacity: '25L',
      power: '900W',
      modes: '10+',
      material: 'Stainless steel'
    },
    tags: ['microwave', 'kitchen', 'appliance', 'cooking'],
    isFeatured: false,
    sold: 180,
    color: 'Stainless Steel',
    size: '25L'
  },
  {
    name: 'Blender',
    brand: 'Vitamix',
    price: 19999,
    discountPercentage: 15,
    stock: 30,
    ratings: 4.9,
    numReviews: 1023,
    category: 'Home & Kitchen',
    description: 'Professional-grade blender for smoothies, soups, and nut butters.',
    image: 'https://images.unsplash.com/photo-1584618674220-4473a4a27208?w=500',
    images: [
      'https://images.unsplash.com/photo-1584618674220-4473a4a27208?w=500'
    ],
    specifications: {
      power: '1400W',
      speed: 'Variable, 10 speeds',
      capacity: '2L',
      motor: '10-year warranty'
    },
    tags: ['blender', 'kitchen', 'professional', 'appliance'],
    isFeatured: false,
    sold: 125,
    color: 'Black',
    size: '2L'
  },
  {
    name: 'Cutlery Set',
    brand: 'Zwilling',
    price: 4999,
    discountPercentage: 25,
    stock: 55,
    ratings: 4.7,
    numReviews: 789,
    category: 'Home & Kitchen',
    description: '7-piece knife set with German stainless steel and ergonomic handles.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500',
    images: [
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500'
    ],
    specifications: {
      pieces: '7',
      material: 'German stainless steel',
      edge: 'Sharp edge retention',
      storage: 'Wooden block included'
    },
    tags: ['knives', 'cutlery', 'kitchen', 'german'],
    isFeatured: false,
    sold: 210,
    color: 'Silver',
    size: 'One Size'
  },
  {
    name: 'Dishes & Bowls Set',
    brand: 'Ceramic',
    price: 2499,
    discountPercentage: 20,
    stock: 100,
    ratings: 4.6,
    numReviews: 1456,
    category: 'Home & Kitchen',
    description: '16-piece ceramic dinnerware set with modern design.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500'
    ],
    specifications: {
      pieces: '16',
      material: 'Ceramic',
      design: 'Modern',
      microwave: 'Safe'
    },
    tags: ['dishes', 'dinnerware', 'kitchen', 'ceramic'],
    isFeatured: false,
    sold: 320,
    color: 'White',
    size: 'One Size'
  },
  {
    name: 'Water Bottle',
    brand: 'Hydro Flask',
    price: 3499,
    discountPercentage: 15,
    stock: 150,
    ratings: 4.8,
    numReviews: 2123,
    category: 'Home & Kitchen',
    description: 'Insulated water bottle keeping drinks hot or cold for 24 hours.',
    image: 'https://images.unsplash.com/photo-1602143407151-7e406dc6ffde?w=500',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7e406dc6ffde?w=500'
    ],
    specifications: {
      capacity: '710ml',
      material: 'Double-wall insulation',
      insulation: '24 hours cold / 12 hours hot',
      color: 'Multiple options'
    },
    tags: ['bottle', 'insulated', 'outdoor', 'hydration'],
    isFeatured: false,
    sold: 420,
    color: 'Blue',
    size: '710ml'
  },
  {
    name: 'Utensils Set',
    brand: 'OXO',
    price: 1999,
    discountPercentage: 18,
    stock: 120,
    ratings: 4.5,
    numReviews: 912,
    category: 'Home & Kitchen',
    description: '6-piece cooking utensil set with heat-resistant handles.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500',
    images: [
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500'
    ],
    specifications: {
      pieces: '6',
      material: 'Silicone + Stainless steel',
      heatResistant: '230°C',
      handle: 'Ergonomic grip'
    },
    tags: ['utensils', 'cooking', 'kitchen', 'tools'],
    isFeatured: false,
    sold: 280,
    color: 'Black',
    size: 'One Size'
  },

  // Sports & Fitness - 9 products
  {
    name: 'Dumbbell Set',
    brand: 'Powerlifting Pro',
    price: 4999,
    discountPercentage: 20,
    stock: 70,
    ratings: 4.7,
    numReviews: 1234,
    category: 'Sports & Fitness',
    description: '20kg dumbbell set with ergonomic handles for home gym.',
    image: 'https://images.unsplash.com/photo-1597217055304-a61e40b89a70?w=500',
    images: [
      'https://images.unsplash.com/photo-1597217055304-a61e40b89a70?w=500'
    ],
    specifications: {
      weight: '20kg (2x10kg)',
      material: 'Cast iron',
      grip: 'Hexagon grip',
      sets: 'One pair'
    },
    tags: ['dumbbells', 'fitness', 'workout', 'gym'],
    isFeatured: true,
    sold: 310,
    color: 'Black',
    size: '20kg'
  },
  {
    name: 'Yoga Mat',
    brand: 'Manduka',
    price: 2999,
    discountPercentage: 15,
    stock: 140,
    ratings: 4.8,
    numReviews: 2567,
    category: 'Sports & Fitness',
    description: 'Premium eco-friendly yoga mat with excellent grip and cushioning.',
    image: 'https://images.unsplash.com/photo-1517836134047-7d1f9e486761?w=500',
    images: [
      'https://images.unsplash.com/photo-1517836134047-7d1f9e486761?w=500'
    ],
    specifications: {
      material: 'Natural rubber',
      thickness: '6mm',
      size: '173 x 61 cm',
      eco: 'Eco-friendly'
    },
    tags: ['yoga', 'mat', 'fitness', 'eco-friendly'],
    isFeatured: false,
    sold: 520,
    color: 'Purple',
    size: 'One Size'
  },
  {
    name: 'Stationary Bike',
    brand: 'Peloton',
    price: 99999,
    discountPercentage: 10,
    stock: 15,
    ratings: 4.9,
    numReviews: 1023,
    category: 'Sports & Fitness',
    description: 'Premium smart stationary bike with interactive classes and metrics.',
    image: 'https://images.unsplash.com/photo-1608889469537-0054526029e2?w=500',
    images: [
      'https://images.unsplash.com/photo-1608889469537-0054526029e2?w=500'
    ],
    specifications: {
      display: '22" touchscreen',
      resistance: '100 levels',
      programs: '1000+',
      connectivity: 'Wifi enabled'
    },
    tags: ['bike', 'fitness', 'smart', 'exercise'],
    isFeatured: false,
    sold: 85,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Jump Rope',
    brand: 'Crossrope',
    price: 1999,
    discountPercentage: 25,
    stock: 200,
    ratings: 4.6,
    numReviews: 1890,
    category: 'Sports & Fitness',
    description: 'Speed jump rope perfect for cardio and HIIT training.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500'
    ],
    specifications: {
      length: 'Adjustable',
      material: 'Steel cable',
      handles: 'Weighted',
      bearing: 'Smooth rotation'
    },
    tags: ['jumprope', 'cardio', 'fitness', 'training'],
    isFeatured: false,
    sold: 620,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Resistance Bands',
    brand: 'TheraBand',
    price: 1499,
    discountPercentage: 20,
    stock: 180,
    ratings: 4.7,
    numReviews: 2134,
    category: 'Sports & Fitness',
    description: 'Set of 5 resistance bands for strength training and physical therapy.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500',
    images: [
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500'
    ],
    specifications: {
      sets: '5 bands',
      resistance: 'Light to heavy',
      material: 'Latex free',
      length: '1.5m each'
    },
    tags: ['resistance', 'bands', 'training', 'fitness'],
    isFeatured: false,
    sold: 410,
    color: 'Multicolor',
    size: 'One Size'
  },
  {
    name: 'Fitness Tracker',
    brand: 'Garmin',
    price: 14999,
    discountPercentage: 18,
    stock: 80,
    ratings: 4.8,
    numReviews: 1567,
    category: 'Sports & Fitness',
    description: 'GPS fitness tracker with heart rate monitor and sleep tracking.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    specifications: {
      gps: 'Yes',
      battery: '11 days',
      waterResistant: '5ATM',
      monitor: 'Wrist-based HR'
    },
    tags: ['fitness', 'tracker', 'gps', 'health'],
    isFeatured: false,
    sold: 290,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Cricket Bat',
    brand: 'Sanspareils Greenlands',
    price: 3999,
    discountPercentage: 15,
    stock: 50,
    ratings: 4.5,
    numReviews: 678,
    category: 'Sports & Fitness',
    description: 'Professional cricket bat with excellent balance and power.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500'
    ],
    specifications: {
      material: 'English willow',
      weight: '1.2kg',
      size: 'Full size',
      type: 'T20'
    },
    tags: ['cricket', 'bat', 'sports', 'game'],
    isFeatured: false,
    sold: 120,
    color: 'Natural',
    size: 'Full'
  },
  {
    name: 'Basketball',
    brand: 'Spalding',
    price: 1999,
    discountPercentage: 10,
    stock: 120,
    ratings: 4.6,
    numReviews: 1234,
    category: 'Sports & Fitness',
    description: 'Official size and weight basketball for professional play.',
    image: 'https://images.unsplash.com/photo-1546519638-68711109b10b?w=500',
    images: [
      'https://images.unsplash.com/photo-1546519638-68711109b10b?w=500'
    ],
    specifications: {
      size: 'Size 7',
      material: 'Rubber',
      weight: '600g',
      grip: 'Enhanced grip'
    },
    tags: ['basketball', 'sports', 'ball', 'game'],
    isFeatured: false,
    sold: 280,
    color: 'Orange',
    size: 'One Size'
  },

  // Books - 9 products
  {
    name: 'The Lean Startup',
    brand: 'Penguin Books',
    price: 499,
    discountPercentage: 20,
    stock: 150,
    ratings: 4.8,
    numReviews: 2456,
    category: 'Books',
    description: 'Essential guide to building successful startups with agile methodology.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Eric Ries',
      pages: '320',
      year: '2011',
      language: 'English'
    },
    tags: ['business', 'startups', 'entrepreneurship', 'self-help'],
    isFeatured: true,
    sold: 450,
    color: 'Multi',
    size: 'Paperback'
  },
  {
    name: 'Atomic Habits',
    brand: 'Penguin Books',
    price: 399,
    discountPercentage: 25,
    stock: 180,
    ratings: 4.9,
    numReviews: 3456,
    category: 'Books',
    description: 'Transform your life with tiny changes and habit-building strategies.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'James Clear',
      pages: '352',
      year: '2018',
      language: 'English'
    },
    tags: ['self-help', 'habits', 'productivity', 'personal-growth'],
    isFeatured: false,
    sold: 680,
    color: 'Multi',
    size: 'Paperback'
  },
  {
    name: 'Deep Work',
    brand: 'Grand Central Publishing',
    price: 599,
    discountPercentage: 15,
    stock: 120,
    ratings: 4.7,
    numReviews: 1890,
    category: 'Books',
    description: 'Focus your energy on intellectually demanding tasks for better results.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Cal Newport',
      pages: '296',
      year: '2016',
      language: 'English'
    },
    tags: ['productivity', 'focus', 'work', 'self-help'],
    isFeatured: false,
    sold: 310,
    color: 'Multi',
    size: 'Paperback'
  },
  {
    name: 'The Art of Thinking Clearly',
    brand: 'Penguin Books',
    price: 549,
    discountPercentage: 18,
    stock: 110,
    ratings: 4.6,
    numReviews: 1567,
    category: 'Books',
    description: 'Better thinking, smarter decisions, and logical analysis.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Rolf Dobelli',
      pages: '416',
      year: '2013',
      language: 'English'
    },
    tags: ['psychology', 'thinking', 'personal-growth', 'logic'],
    isFeatured: false,
    sold: 240,
    color: 'Multi',
    size: 'Paperback'
  },
  {
    name: 'Educated',
    brand: 'Scribner',
    price: 679,
    discountPercentage: 12,
    stock: 95,
    ratings: 4.9,
    numReviews: 2123,
    category: 'Books',
    description: 'Inspiring memoir about education, family, and self-discovery.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Tara Westover',
      pages: '352',
      year: '2018',
      language: 'English'
    },
    tags: ['memoir', 'biography', 'inspiring', 'education'],
    isFeatured: false,
    sold: 380,
    color: 'Multi',
    size: 'Hardcover'
  },
  {
    name: 'Thinking Fast and Slow',
    brand: 'Farrar, Straus and Giroux',
    price: 699,
    discountPercentage: 10,
    stock: 85,
    ratings: 4.8,
    numReviews: 1834,
    category: 'Books',
    description: 'Understanding the two systems of thought and decision-making.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Daniel Kahneman',
      pages: '512',
      year: '2011',
      language: 'English'
    },
    tags: ['psychology', 'thinking', 'behavior', 'cognitive'],
    isFeatured: false,
    sold: 210,
    color: 'Multi',
    size: 'Paperback'
  },
  {
    name: 'Sapiens',
    brand: 'Harper',
    price: 649,
    discountPercentage: 15,
    stock: 100,
    ratings: 4.9,
    numReviews: 2567,
    category: 'Books',
    description: 'Journey through human history from the Stone Age to modernity.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Yuval Noah Harari',
      pages: '464',
      year: '2014',
      language: 'English'
    },
    tags: ['history', 'anthropology', 'education', 'non-fiction'],
    isFeatured: true,
    sold: 420,
    color: 'Multi',
    size: 'Paperback'
  },
  {
    name: 'The 7 Habits of Highly Effective People',
    brand: 'Free Press',
    price: 599,
    discountPercentage: 20,
    stock: 130,
    ratings: 4.7,
    numReviews: 2890,
    category: 'Books',
    description: 'Principles for personal and professional excellence.',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500',
    images: [
      'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500'
    ],
    specifications: {
      author: 'Stephen R. Covey',
      pages: '432',
      year: '1989',
      language: 'English'
    },
    tags: ['personal-development', 'habits', 'leadership', 'self-help'],
    isFeatured: false,
    sold: 510,
    color: 'Multi',
    size: 'Paperback'
  },

  // Accessories - 8 products
  {
    name: 'Leather Backpack',
    brand: 'Fossil',
    price: 4999,
    discountPercentage: 20,
    stock: 70,
    ratings: 4.7,
    numReviews: 1234,
    category: 'Accessories',
    description: 'Premium leather backpack perfect for travel and everyday use.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      material: 'Genuine leather',
      capacity: '30L',
      compartments: '4 main + side pockets',
      warranty: '2 years'
    },
    tags: ['backpack', 'leather', 'travel', 'accessories'],
    isFeatured: true,
    sold: 280,
    color: 'Brown',
    size: 'One Size'
  },
  {
    name: 'Sunglasses',
    brand: 'Ray-Ban',
    price: 5999,
    discountPercentage: 15,
    stock: 100,
    ratings: 4.8,
    numReviews: 2345,
    category: 'Accessories',
    description: 'Classic aviator sunglasses with UV protection and premium build.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'
    ],
    specifications: {
      frameType: 'Aviator',
      uvProtection: '100% UVA+UVB',
      lensType: 'Polarized',
      material: 'Metal frame'
    },
    tags: ['sunglasses', 'uv-protection', 'accessories', 'outdoor'],
    isFeatured: false,
    sold: 410,
    color: 'Gold',
    size: 'One Size'
  },
  {
    name: 'Belt',
    brand: 'Gucci',
    price: 7999,
    discountPercentage: 10,
    stock: 50,
    ratings: 4.9,
    numReviews: 890,
    category: 'Accessories',
    description: 'Luxury leather belt with premium gold buckle.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      material: 'Genuine leather',
      buckle: 'Gold plated',
      width: '4cm',
      sizes: 'Adjustable'
    },
    tags: ['belt', 'leather', 'luxury', 'fashion'],
    isFeatured: false,
    sold: 145,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Scarf',
    brand: 'Hermès',
    price: 9999,
    discountPercentage: 8,
    stock: 35,
    ratings: 4.9,
    numReviews: 567,
    category: 'Accessories',
    description: 'Silk scarf with elegant design and premium quality.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      material: '100% Silk',
      size: '90x90cm',
      pattern: 'Floral',
      care: 'Hand wash'
    },
    tags: ['scarf', 'silk', 'luxury', 'fashion'],
    isFeatured: false,
    sold: 98,
    color: 'Red',
    size: '90x90cm'
  },
  {
    name: 'Wallet',
    brand: 'Coach',
    price: 3999,
    discountPercentage: 22,
    stock: 90,
    ratings: 4.6,
    numReviews: 1123,
    category: 'Accessories',
    description: 'Premium leather wallet with RFID protection and multiple card slots.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      material: 'Genuine leather',
      cardSlots: '12+',
      rfid: 'Protected',
      size: 'Standard'
    },
    tags: ['wallet', 'leather', 'accessories', 'casual'],
    isFeatured: false,
    sold: 210,
    color: 'Brown',
    size: 'One Size'
  },
  {
    name: 'Watch Band',
    brand: 'Apple',
    price: 3499,
    discountPercentage: 18,
    stock: 120,
    ratings: 4.7,
    numReviews: 1456,
    category: 'Accessories',
    description: 'Premium silicone Apple Watch band with comfortable fit.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      material: 'Silicone',
      waterResistant: 'Yes',
      compatible: 'Apple Watch Series 1-9',
      color: 'Multiple options'
    },
    tags: ['band', 'watch', 'accessories', 'tech'],
    isFeatured: false,
    sold: 340,
    color: 'Black',
    size: 'One Size'
  },
  {
    name: 'Phone Case',
    brand: 'Spigen',
    price: 1299,
    discountPercentage: 25,
    stock: 200,
    ratings: 4.8,
    numReviews: 2890,
    category: 'Accessories',
    description: 'Rugged phone case with excellent protection and slim design.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      material: 'TPU + Polycarbonate',
      protection: 'Military grade',
      slim: 'Ultra slim',
      compatible: 'iPhone 15 Pro Max'
    },
    tags: ['phonecase', 'protection', 'accessories', 'tech'],
    isFeatured: false,
    sold: 620,
    color: 'Black',
    size: 'iPhone 15 Pro Max'
  },
  {
    name: 'USB-C Cable',
    brand: 'Anker',
    price: 599,
    discountPercentage: 30,
    stock: 250,
    ratings: 4.7,
    numReviews: 3456,
    category: 'Accessories',
    description: 'High-speed USB-C cable with fast charging and data transfer.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    specifications: {
      length: '2m',
      speed: 'USB 3.0',
      charging: '100W',
      durability: 'Reinforced connector'
    },
    tags: ['cable', 'usbc', 'accessories', 'tech'],
    isFeatured: false,
    sold: 980,
    color: 'Black',
    size: '2m'
  }
];

const seedProducts = async () => {
  try {
    console.log('🌱 Seeding products...');
    
    for (const productData of productsData) {
      await Product.findOrCreate({
        where: { name: productData.name },
        defaults: productData
      });
    }
    
    console.log(`✅ Successfully seeded ${productsData.length} products!`);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  }
};

module.exports = seedProducts;

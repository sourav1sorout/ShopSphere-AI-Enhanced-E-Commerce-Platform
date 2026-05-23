const { sequelize } = require('./config/db');
const { Product } = require('./models');

const fetchProducts = async () => {
  console.log('Fetching products from DummyJSON...');
  try {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    return data.products;
  } catch (err) {
    console.error('Failed to fetch from DummyJSON:', err);
    return [];
  }
};

const mapCategory = (dummyCategory) => {
  // Map dummyjson categories to our categories
  const categoryMap = {
    'smartphones': 'Electronics',
    'laptops': 'Electronics',
    'fragrances': 'Beauty & Personal Care',
    'skincare': 'Beauty & Personal Care',
    'groceries': 'Home & Kitchen',
    'home-decoration': 'Home & Kitchen',
    'furniture': 'Home & Kitchen',
    'tops': 'Fashion',
    'womens-dresses': 'Fashion',
    'womens-shoes': 'Footwear',
    'mens-shirts': 'Fashion',
    'mens-shoes': 'Footwear',
    'mens-watches': 'Watches',
    'womens-watches': 'Watches',
    'womens-bags': 'Accessories',
    'womens-jewellery': 'Accessories',
    'sunglasses': 'Accessories',
    'automotive': 'Accessories',
    'motorcycle': 'Accessories',
    'lighting': 'Home & Kitchen',
  };
  return categoryMap[dummyCategory] || 'Accessories';
};

const runSeeder = async () => {
  try {
    // Connect and sync DB
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected');
    await sequelize.sync(); // ensure tables exist

    const dummyProducts = await fetchProducts();
    if (!dummyProducts.length) {
      console.log('No products fetched. Exiting.');
      process.exit(1);
    }

    // Clear existing products
    await Product.destroy({ where: {} });
    console.log('Cleared existing products.');

    const productsToInsert = dummyProducts.map(p => {
      return {
        name: p.title,
        description: p.description,
        price: p.price,
        discountPercentage: p.discountPercentage || 0,
        category: mapCategory(p.category),
        brand: p.brand || 'Generic',
        image: p.thumbnail,
        images: p.images || [p.thumbnail],
        stock: p.stock || 50,
        ratings: p.rating || 4.0,
        numReviews: p.reviews ? p.reviews.length : Math.floor(Math.random() * 100),
        isFeatured: Math.random() > 0.8, // 20% chance to be featured
        sold: Math.floor(Math.random() * 500),
        tags: p.tags || [],
        specifications: {
          weight: p.weight ? `${p.weight}g` : undefined,
          dimensions: p.dimensions ? `${p.dimensions.width}x${p.dimensions.height}x${p.dimensions.depth}` : undefined,
          warrantyInformation: p.warrantyInformation,
          shippingInformation: p.shippingInformation,
          returnPolicy: p.returnPolicy
        }
      };
    });

    await Product.bulkCreate(productsToInsert);
    console.log(`✅ Successfully seeded ${productsToInsert.length} products.`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

runSeeder();

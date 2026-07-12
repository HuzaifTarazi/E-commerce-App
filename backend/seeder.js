import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shophub.com',
      password: 'admin123',
      role: 'admin',
    });

    const user = await User.create({
      name: 'John Doe',
      email: 'user@shophub.com',
      password: 'user123',
      role: 'user',
    });

    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        price: 149.99,
        category: 'Electronics',
        stock: 50,
        brand: 'AudioMax',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS.',
        price: 299.99,
        category: 'Electronics',
        stock: 30,
        brand: 'TechWear',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      },
      {
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket made from premium cotton blend.',
        price: 79.99,
        category: 'Clothing',
        stock: 100,
        brand: 'UrbanStyle',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with responsive cushioning for all terrains.',
        price: 119.99,
        category: 'Sports',
        stock: 75,
        brand: 'RunFast',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      },
      {
        name: 'JavaScript: The Good Parts',
        description: 'Essential guide to JavaScript programming by Douglas Crockford.',
        price: 29.99,
        category: 'Books',
        stock: 200,
        brand: "O'Reilly",
        image: 'https://images.unsplash.com/photo-1532012197268-da84d127e765?w=400',
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 handcrafted ceramic mugs, perfect for your morning coffee.',
        price: 34.99,
        category: 'Home',
        stock: 60,
        brand: 'HomeCraft',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
      },
      {
        name: 'Organic Face Serum',
        description: 'Natural vitamin C serum for brightening and anti-aging skincare.',
        price: 45.99,
        category: 'Beauty',
        stock: 40,
        brand: 'GlowNatural',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Non-slip eco-friendly yoga mat with carrying strap.',
        price: 49.99,
        category: 'Sports',
        stock: 80,
        brand: 'ZenFit',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
      },
      {
        name: 'Laptop Stand Adjustable',
        description: 'Ergonomic aluminum laptop stand for better posture and cooling.',
        price: 59.99,
        category: 'Electronics',
        stock: 45,
        brand: 'DeskPro',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      },
      {
        name: 'Cotton T-Shirt Pack',
        description: 'Pack of 3 premium cotton t-shirts in assorted colors.',
        price: 39.99,
        category: 'Clothing',
        stock: 150,
        brand: 'BasicWear',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      },
      {
        name: 'LED Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
        price: 54.99,
        category: 'Home',
        stock: 55,
        brand: 'LightUp',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof portable speaker with 360° sound and 12-hour battery.',
        price: 89.99,
        category: 'Electronics',
        stock: 65,
        brand: 'SoundWave',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      },
    ];

    await Product.insertMany(products);

    console.log('Database seeded successfully!');
    console.log('Admin: admin@shophub.com / admin123');
    console.log('User:  user@shophub.com / user123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();

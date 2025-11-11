import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  {
    name: 'Classic CNC Aluminum Hubcap - 15"',
    description: 'Premium CNC-machined aluminum hubcap with classic design. Perfect for vintage cars. Features mirror-polished finish and corrosion-resistant coating.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
    stock: 50,
    category: 'hubcaps'
  },
  {
    name: 'Sport CNC Aluminum Hubcap - 17"',
    description: 'High-performance CNC aluminum hubcap with sporty 5-spoke design. Lightweight and durable, ideal for performance vehicles.',
    price: 124.99,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
    stock: 35,
    category: 'hubcaps'
  },
  {
    name: 'Luxury CNC Aluminum Hubcap - 18"',
    description: 'Premium luxury hubcap featuring intricate CNC-machined patterns. Anodized finish available in multiple colors.',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500',
    stock: 25,
    category: 'hubcaps'
  },
  {
    name: 'Racing CNC Aluminum Hubcap - 16"',
    description: 'Ultra-lightweight racing hubcap with aerodynamic design. CNC-machined from aerospace-grade aluminum.',
    price: 179.99,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
    stock: 20,
    category: 'hubcaps'
  },
  {
    name: 'Custom CNC Hubcap - 20"',
    description: 'Custom-designed CNC aluminum hubcap for SUVs and trucks. Heavy-duty construction with powder-coated finish.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
    stock: 15,
    category: 'hubcaps'
  },
  {
    name: 'Hubcap Installation Kit',
    description: 'Professional-grade installation kit including all necessary tools and hardware for hubcap installation.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500',
    stock: 100,
    category: 'accessories'
  },
  {
    name: 'Aluminum Polish & Cleaner',
    description: 'Premium polish and cleaner specifically formulated for aluminum hubcaps. Restores shine and prevents oxidation.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1563258243-0a2a5e9e9c0a?w=500',
    stock: 150,
    category: 'accessories'
  },
  {
    name: 'Hubcap Center Caps Set',
    description: 'Set of 4 precision CNC-machined center caps with custom logo engraving option. Universal fit.',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1625991596162-9e8be8e2e97d?w=500',
    stock: 75,
    category: 'accessories'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@hubcapstore.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create demo user
    await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'demo123',
      role: 'user'
    });

    // Insert products
    await Product.insertMany(products);

    console.log('Data seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@hubcapstore.com');
    console.log('Password: admin123');
    console.log('\nDemo user credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: demo123');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

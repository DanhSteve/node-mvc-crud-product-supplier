require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/node_mvc_crud';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Xóa dữ liệu cũ
    await Product.deleteMany({});
    await Supplier.deleteMany({});

    // Tạo suppliers mẫu
    const suppliers = await Supplier.insertMany([
      { name: 'Supplier A', address: '123 Main St', phone: '0123456789' },
      { name: 'Supplier B', address: '456 Oak Ave', phone: '0987654321' },
      { name: 'Supplier C', address: '789 Pine Rd', phone: '0912345678' }
    ]);
    console.log('Suppliers seeded');

    // Tạo products mẫu, liên kết supplierId
    const products = [
      { name: 'Product 1', price: 10.5, quantity: 100, supplier: suppliers[0]._id },
      { name: 'Product 2', price: 20, quantity: 50, supplier: suppliers[1]._id },
      { name: 'Product 3', price: 15, quantity: 75, supplier: suppliers[2]._id },
      { name: 'Product 4', price: 5, quantity: 200, supplier: suppliers[0]._id }
    ];

    await Product.insertMany(products);
    console.log('Products seeded');

    mongoose.connection.close();
    console.log('Seed finished, connection closed');
  } catch (err) {
    console.error('Seed error:', err);
    mongoose.connection.close();
  }
}

seed();
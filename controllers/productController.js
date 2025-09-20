const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('supplier').sort({ name: 1 });
    res.render('products/index', { products });
  } catch (err) {
    req.flash('error_msg', 'Error loading products');
    res.redirect('/');
  }
};

exports.showNewForm = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/new', { product: {}, suppliers });
  } catch (err) {
    req.flash('error_msg', 'Error loading suppliers');
    res.redirect('/products');
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    const product = new Product({ name, price, quantity, supplier });
    await product.save();
    req.flash('success_msg', 'Product added successfully');
    res.redirect('/products');
  } catch (err) {
    let errors = [];
    if (err.name === 'ValidationError') {
      for (field in err.errors) {
        errors.push(err.errors[field].message);
      }
    } else {
      errors.push('Error creating product');
    }
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/new', { product: req.body, suppliers, errors });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/products');
    }
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/edit', { product, suppliers });
  } catch (err) {
    req.flash('error_msg', 'Error loading product');
    res.redirect('/products');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/products');
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.supplier = supplier;
    await product.save();
    req.flash('success_msg', 'Product updated successfully');
    res.redirect('/products');
  } catch (err) {
    let errors = [];
    if (err.name === 'ValidationError') {
      for (field in err.errors) {
        errors.push(err.errors[field].message);
      }
    } else {
      errors.push('Error updating product');
    }
    const suppliers = await Supplier.find().sort({ name: 1 });
    req.body._id = req.params.id;
    res.render('products/edit', { product: req.body, suppliers, errors });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product deleted successfully');
    res.redirect('/products');
  } catch (err) {
    req.flash('error_msg', 'Error deleting product');
    res.redirect('/products');
  }
};
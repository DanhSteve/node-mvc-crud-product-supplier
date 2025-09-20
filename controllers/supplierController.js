const Supplier = require('../models/Supplier');

exports.listSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('suppliers/index', { suppliers });
  } catch (err) {
    req.flash('error_msg', 'Error loading suppliers');
    res.redirect('/');
  }
};

exports.showNewForm = (req, res) => {
  res.render('suppliers/new', { supplier: {} });
};

exports.createSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const supplier = new Supplier({ name, address, phone });
    await supplier.save();
    req.flash('success_msg', 'Supplier added successfully');
    res.redirect('/suppliers');
  } catch (err) {
    let errors = [];
    if (err.name === 'ValidationError') {
      for (field in err.errors) {
        errors.push(err.errors[field].message);
      }
    } else {
      errors.push('Error creating supplier');
    }
    res.render('suppliers/new', { supplier: req.body, errors });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      req.flash('error_msg', 'Supplier not found');
      return res.redirect('/suppliers');
    }
    res.render('suppliers/edit', { supplier });
  } catch (err) {
    req.flash('error_msg', 'Error loading supplier');
    res.redirect('/suppliers');
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      req.flash('error_msg', 'Supplier not found');
      return res.redirect('/suppliers');
    }
    supplier.name = name;
    supplier.address = address;
    supplier.phone = phone;
    await supplier.save();
    req.flash('success_msg', 'Supplier updated successfully');
    res.redirect('/suppliers');
  } catch (err) {
    let errors = [];
    if (err.name === 'ValidationError') {
      for (field in err.errors) {
        errors.push(err.errors[field].message);
      }
    } else {
      errors.push('Error updating supplier');
    }
    req.body._id = req.params.id;
    res.render('suppliers/edit', { supplier: req.body, errors });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Supplier deleted successfully');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error_msg', 'Error deleting supplier');
    res.redirect('/suppliers');
  }
};
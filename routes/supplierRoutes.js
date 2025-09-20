const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/', supplierController.listSuppliers);
router.get('/new', supplierController.showNewForm);
router.post('/', supplierController.createSupplier);
router.get('/:id/edit', supplierController.showEditForm);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
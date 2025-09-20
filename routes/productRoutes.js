const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listProducts);
router.get('/new', productController.showNewForm);
router.post('/', productController.createProduct);
router.get('/:id/edit', productController.showEditForm);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
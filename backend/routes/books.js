const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');

/* POST request */
router.post('/', bookCtrl.createBook);

/* GET request */
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);

/* PUT request */
router.put('/:id', bookCtrl.modifyBook);

/* DELETE request */
router.delete('/:id', bookCtrl.deleteBook);

  module.exports = router;
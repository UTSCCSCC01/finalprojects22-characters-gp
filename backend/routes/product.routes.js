const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// import Product Model
const Product = require('../models/Product');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // callback(null, "../../frontend/public/uploads");
        callback(null, '~/../../frontend/public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.post('/', upload.single('productImage'), (req, res, next) => {
    const newProduct = {
          productPrice: req.body.productPrice,
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productImage: req.file.originalname,
         
      }

    Product.create(newProduct, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
          console.log(item);
          res.json(item);
        }
    });
});


// Get all products
router.get('/', (req, res) => {
  Product.find({ deleted: false }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get single product
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Update product
router.put('/:id', upload.single("productImage"), (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Delete product
router.delete('/:id', (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ 
        msg: data 
      })
    }
  })
});

module.exports = router;
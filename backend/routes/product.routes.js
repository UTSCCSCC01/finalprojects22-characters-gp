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
        callback(null, '~/../../frontend/public/uploads');
    },
    // filename: (req, file, callback) => {
    //     callback(null, file.originalname);
    // }
})

const upload = multer({storage: storage});

//Create Product
router.post('/', upload.single('productImage'), (req, res, next) => {
    const newProduct = {
          productPrice: req.body.productPrice,
          productName: req.body.productName,
          productType: req.body.productType,
          productDescription: req.body.productDescription,
          productImage: req.file.filename,
          productInventoryAmount: req.body.productInventoryAmount,
          productStory: req.body.productStory,
          productCharacter: req.body.productCharacter
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
  const query = req.query;
  query.deleted = false;
  Product.find(query, (error, data) => {
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
router.put('/:id', (req, res, next) => {
  let update = { $set: req.body };
  console.log(req.body)
  Product.findByIdAndUpdate(req.params.id, update, (err, results) => {
    if (err) {
      res.status(400).json(`Error: ${err}`)
    } else {
      console.log("Product changed")
      res.sendStatus(200)
    }
  })

});

// Chang product image
router.put('/image/:id', upload.single("productImage"), (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {$set: {productImage: req.file.filename}}, (err, results) => {
    if (results) {
    console.log(results, req.body)
      fs.unlink(path.join('~/../../frontend/public/uploads/', results.productImage), function (err) {
        if (err) return;

        console.log('File deleted!');
        res.sendStatus(200);
      });
    }
    if (err) res.status(400).json(`Error: ${err}`)
  })

});

// Upload image without deleting
router.post('/image/:id', upload.single("productImage"), (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {$set: {productImage: req.file.filename}}, (err, results) => {
    if (results) {
      res.sendStatus(200);
    console.log(results, req.body)
    }
    if (err) res.status(400).json(`Error: ${err}`)
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
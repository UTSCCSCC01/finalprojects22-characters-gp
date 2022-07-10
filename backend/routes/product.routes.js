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
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

//Create Product
router.post('/', upload.single('productImage'), (req, res, next) => {
    const newProduct = {
          productPrice: req.body.productPrice,
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productImage: req.file.originalname,
          productInventoryAmount: req.body.productInventoryAmount,
<<<<<<< Updated upstream

          productStory: req.body.productStory,

          productCharacter: req.body.productCharacter

=======
          productStory: req.body.productStory,
          productCharacter: req.body.productCharacter
>>>>>>> Stashed changes
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

  Product.findById(req.params.id)
    .then(product => {
      fs.unlink(path.join('~/../../frontend/public/uploads/', product.productImage), function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      product.productName = req.body.productName;
      product.productPrice = req.body.productPrice;
      product.productDescription = req.body.productDescription;
      product.productInventoryAmount = req.body.productInventoryAmount;
      product.productImage = req.file.originalname;
      product.productCharacter = req.body.productCharacter;

      product
        .save()
        .then(() => res.json("the product is updated successfuly"))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))

});

// Delete product
router.delete('/:id', (req, res, next) => {

  //Delete the image from the uploads folder
  Product.findById(req.params.id)
    .then(product => {
      fs.unlink(path.join('~/../../frontend/public/uploads/', product.productImage), function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    })
  
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
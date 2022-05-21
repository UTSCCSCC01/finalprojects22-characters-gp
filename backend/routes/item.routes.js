let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Item Model
let itemSchema = require('../models/Item');
// CREATE Item
router.route('/create-item').post((req, res, next) => {
  itemSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});
// READ Item
router.route('/').get((req, res) => {
  itemSchema.find({ deleted: false }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// READ Deleted Items
router.route('/deleted-items').get((req, res) => {
  itemSchema.find({ deleted: true }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get Single Item
router.route('/edit-item/:id').get((req, res) => {
  itemSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Item
router.route('/update-item/:id').put((req, res, next) => {
  itemSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
    }
  })
})
// Delete Item
router.route('/delete-item/:id').delete((req, res, next) => {
  itemSchema.findByIdAndUpdate(req.params.id, {
    $set: {
        deleted: true,
        deleteMessage: req.body.deleteMessage
    }
  },(error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
// Undelete Item
router.route('/undelete-item/:id').put((req, res, next) => {
    itemSchema.findByIdAndUpdate(req.params.id, {
      $set: {
          deleted: false,
          deleteMessage: ''
      }
    },(error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
module.exports = router;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// import Submission Model
const Submission = require('../models/Submission');

// Create submission
router.post('/', (req, res, next) => {
  Submission.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});
// Get all submissions
router.get('/', (req, res) => {
  Submission.find({ deleted: false }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get single submission
router.get('/:id', (req, res, next) => {
  Submission.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Update submission
router.put('/:id', (req, res, next) => {
  Submission.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Delete submission
router.delete('/:id', (req, res, next) => {
  Submission.findByIdAndDelete(req.params.id, (error, data) => {
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




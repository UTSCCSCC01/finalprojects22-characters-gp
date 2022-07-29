const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// import Story Model
const Story = require('../models/Story');

// Create story
router.post('/', (req, res, next) => {
  Story.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});
// Get all stories
router.get('/', (req, res, next) => {
  const query = req.query;
  query.deleted = false;
  Story.find(query).
    populate('author', 'firstName lastName email').
    exec((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
});
// Get single story
router.get('/:id', (req, res, next) => {
  Story.findById(req.params.id).
    populate('author', 'firstName lastName email').
    exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
  })
});
// Update story
router.put('/:id', (req, res, next) => {
  Story.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Delete story
router.delete('/:id', (req, res, next) => {
  Story.findByIdAndDelete(req.params.id, (error, data) => {
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




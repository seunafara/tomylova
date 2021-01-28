const express = require('express');
const Content = require('../../models/Content');
const router = express.Router();
const Letter = require('../../models/Letter');

/**
 * @route GET api/content/
 * @desc Fetch random content
 * @access Public
 */

router.get('/', (req, res) => {
   // Get the count of all users
   Content.countDocuments().exec(function (err, count) {
      // Get a random entry
      var random = Math.floor(Math.random() * count);

      Content.findOne()
         .skip(random)
         .exec(function (err, content) {
            // Tada! random user
            return res.status(200).json({
               success: true,
               content,
            });
         });
   });
});

/**
 * @route POST api/content/create
 * @desc create a new content
 * @access Public - disable in production when contents have been loaded
 */

router.post('/create', (req, res) => {
   let { content } = req.body;
   if (content) {
      let newLetter = new Content({
         content,
      });

      newLetter.save().then((user) => {
         return res.status(200).json({
            success: true,
            message: 'Content added',
         });
      });
   }
});

/**
 * @route POST api/content/lcreate
 * @desc create a new letter
 * @access Public
 */

router.post('/lcreate', (req, res) => {
   let { name, content, font, gradient } = req.body;

   if (!name || !content) {
      return res.status(400).json({
         success: false,
      });
   }

   let newLetter = new Letter({
      name,
      content,
      font,
      gradient,
   });

   newLetter.save().then((letter) => {
      return res.status(200).json({
         success: true,
         letter,
      });
   });
});

/**
 * @route POST api/content/letter/:id
 * @desc Find a letter
 * @access Public
 */

router.get('/letter/:id', (req, res) => {
   Letter.findOne({ share_id: req.params.id })
      .populate('content')
      .then((letter) => {
         if (letter) {
            return res.status(200).json({
               success: true,
               letter,
            });
         } else {
            return res.status(404).json({
               success: false,
            });
         }
      });
});

module.exports = router;

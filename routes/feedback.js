const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const validations = [
  check('name')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Name must be at least 4 characters long'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage('Please enter a valid email address'),
  check('title')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Please enter a title at least 4 characters long'),
  check('message')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Please enter a message at least 4 characters long'),
];
module.exports = ({ feedbackService }) => {
  router.get('/', async (req, res, next) => {
    try {
      const errors = req.session.feedback ? req.session.feedback.errors : false;
      const successMessage = req.session.feedback ? req.session.feedback.message : false;
      req.session.feedback = {};

      const feedback = await feedbackService.getList();
      return res.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', validations, async (req, res, next) => {
    try {
      const { name, email, title, message } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.feedback = {
          errors: errors.array(),
        };
        return res.redirect('/feedback');
      }
      await feedbackService.addEntry(name, email, title, message);
      req.session.feedback = {
        message: 'Thank you for your feedback!',
      };
      return res.redirect('/feedback');
    } catch (err) {
      return next(err);
    }
  });
  router.post('/api', validations, async (req, res, next) => {
    try {
      const { name, email, title, message } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.feedback = {
          errors: errors.array(),
        };
        return res.json({ errors: errors.array() });
      }
      await feedbackService.addEntry(name, email, title, message);
      const feedback = await feedbackService.getList();
      req.session.feedback = {
        message: 'Thank you for your feedback!',
      };
      return res.json({ feedback, message: 'Thank you for your feedback!' });
    } catch (err) {
      return next(err);
    }
  });
  return router;
};

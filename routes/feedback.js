const express = require('express');
const router = express.Router();
module.exports = ({ feedbackService }) => {
  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      return res.json(feedback);
    } catch (err) {
      return next(err);
    }
  });
  router.post('/', (req, res, next) => {
    try {
      res.send('Form posted');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

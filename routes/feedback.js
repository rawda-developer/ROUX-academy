const express = require('express');
const router = express.Router();
module.exports = ({ feedbackService }) => {
  router.get('/', async (req, res) => {
    const feedback = await feedbackService.getList();
    return res.json(feedback);
  });
  router.post('/', (req, res) => {
    res.send('Form posted');
  });

  return router;
};

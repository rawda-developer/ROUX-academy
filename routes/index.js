const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
module.exports = (params) => {
  router.get('/', (req, res) => {
    if (!req.session.visitCount) {
      req.session.visitCount = 0;
    }
    req.session.visitCount++;
    res.render('pages/index', {
      pageTitle: 'Home',
    });
    console.log(`Number of visits is ${req.session.visitCount}`);
  });
  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};

const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
module.exports = (params) => {
  router.get('/', async (req, res, next) => {
    try {
      const { speakerService } = params;
      const topSpeakers = await speakerService.getListShort();
      const artworks = await speakerService.getAllArtwork();
      res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};

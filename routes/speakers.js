const express = require('express');
const router = express.Router();
module.exports = ({ speakerService }) => {
  router.get('/', async (req, res) => {
    const speakers = await speakerService.getList();
    return res.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
    });
  });
  router.get('/:shortname', async (req, res) => {
    const { shortname } = req.params;
    const speaker = await speakerService.getSpeaker(shortname);
    const artworks = await speakerService.getAllArtwork();
    res.render('layout', {
      pageTitle: 'Speaker',
      template: 'speaker',
      speaker,
      artworks,
    });
  });
  return router;
};

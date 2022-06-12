const express = require('express');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const port = process.env.PORT || 3000;
const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');
app.use(express.static(path.join(__dirname, './static')));
app.use(
  cookieSession({
    name: 'session',
    keys: ['kfmkgtmotgit', 'fkwwo45i243i98tugrjgk'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours)
  })
);
app.set('trust proxy', 1); // trust first proxy cookies on (nginx)
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

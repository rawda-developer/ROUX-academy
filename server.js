const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const routes = require('./routes');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use('/', routes());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

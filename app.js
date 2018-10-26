const path = require('path');
const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3000;
const routes = require('./routes');

app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(PORT, () => 'Process running in port ' + PORT);
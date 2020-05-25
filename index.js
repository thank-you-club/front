const express = require('express');
var secure = require('express-force-https');
const app = express();
if (process.env.NODE_ENV === 'production') {
  // app.use(secure);
}
const history = require('connect-history-api-fallback');
app.use(history());
app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/dist'));
app.listen(app.get('port'));
console.log(`app is running on port ${app.get('port')}`);

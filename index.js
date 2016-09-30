var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/parse', function(req, res) {
  var text = req.body.emails;
  var emails = _.uniqBy(extractEmails(text), e => e);
  res.setHeader('Content-disposition', 'attachment; filename=emails.csv');
  res.send(emails.join("\n"));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

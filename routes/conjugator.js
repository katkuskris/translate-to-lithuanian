var express = require('express');
var router = express.Router();
var Verb = require('./conjugatorTool')


/* GET conjugator page. */
router.get('/', function (req, res, next) {
  res.render('conjugator', { title: 'Lithuanian Conjugation Tool', source: 'javascripts/conjugator.js' });
});

router.post('/', function (req, res, next) {
  console.log("body:", req.body)
  let verb = req.body.verb
  res.send({ verb: new Verb(verb) });
});

// var testVerb = new Verb('daryti')
// console.log(testVerb)

module.exports = router;


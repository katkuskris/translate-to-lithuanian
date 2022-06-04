var express = require('express');
var router = express.Router();
var Verb = require('./conjugatorTool')
var verbs = require('../verbs.json')
var tables = require('../views/conjugationTable')

router.get('/', function (req, res, next) {
  res.render('conjugator', { title: 'Lithuanian Conjugation Tool', source: 'javascripts/conjugator.js' });
});

router.post('/', function (req, res, next) {
  console.log("body:", req.body)
  res.setHeader('Content-Type', 'text/html');
  if (Object.keys(verbs).includes(req.body.verb)) {
    let verb = new Verb(req.body.verb)
    res.status(200).send(tables(verb));
  } else {
    res.status(500)
  }

});

module.exports = router;


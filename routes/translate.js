var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
var sdk = require("microsoft-cognitiveservices-speech-sdk");

var subscriptionKey = process.env.TRANSLATION_KEY;
var endpoint = "https://api.cognitive.microsofttranslator.com";

var location = process.env.REGION;


/* request translation from api */
router.post('/', async function (req, res) {
  var translationBody = {
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region': location,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      'api-version': '3.0',
      'from': req.body["lg-in"],
      'to': req.body["lg-out"]
    },
    data: [{
      'text': req.body.phrase
    }],
    responseType: 'json'
  }
  axios(translationBody)
    .then(function (response) {
      console.log('data retrieved!')
      data = response.data[0].translations[0].text;
      res.send({ "translation": data })
    })
})

module.exports = router;

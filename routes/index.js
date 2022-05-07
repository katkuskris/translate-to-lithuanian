var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
var sdk = require("microsoft-cognitiveservices-speech-sdk");

var subscriptionKey = process.env.TRANSLATION_KEY;
var endpoint = "https://api.cognitive.microsofttranslator.com";

var location = process.env.REGION;

// Adapted from Microsoft Translator documentation
// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs
router.post('/translator', async function (req, res) {
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
      // 'from': 'en',
      'to': 'lt'
    },
    data: [{
      'text': req.body.phrase
    }],
    responseType: 'json'
  }
  axios(translationBody)
    .then(function (response) {
      data = response.data[0].translations[0].text;
      res.send({ "translation": data })
    })
})

router.post('/tts', async function (req, res) {
  var key = process.env.TTS_KEY;
  var region = process.env.REGION;
  var audioFile = "spech.wav";

  const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

  // The language of the voice that speaks.
  speechConfig.speechSynthesisVoiceName = "lt-LT-LeonasNeural";

  // Create the speech synthesizer.
  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(req.body.phrase,
    function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
      } else {
        console.error("Speech synthesis canceled, " + result.errorDetails +
          "\nDid you set the speech resource key and region values?");
      }
      synthesizer.close();
      synthesizer = null;
    },
    function (err) {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = null;
    });
  console.log("Now synthesizing to: " + audioFile);
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lithuanian Translation Tool' });
});

module.exports = router;

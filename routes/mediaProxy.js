const express = require('express');
const router = express.Router();
const axios = require('axios').default;

/* GET home page. */
router.get('/*', async function (req, res, next) {
  try {
    let mediaURL = req.params[0];
    console.log('Proxying media: ', mediaURL);
    mediaURL = fixMediaUrl(mediaURL);

    axios
      .get(mediaURL, {
        responseType: 'arraybuffer',
      })
      .then(response => {
        const buffer = Buffer.from(response.data, 'base64');
        res.send(buffer);
      })
      .catch(ex => {
        res.status(500).json({
          error: ex.message,
        });
      });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

function fixMediaUrl(url) {
  if (url.startsWith('ams3.digitaloceanspaces.com/ukrainefield-storage/')) {
    url = url.replace('ams3.digitaloceanspaces.com/ukrainefield-storage/', 'https://ukrainefield-storage.ams3.digitaloceanspaces.com/');
  }
  return url;
}

module.exports = router;

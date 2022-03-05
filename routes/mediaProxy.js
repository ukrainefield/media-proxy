const express = require('express');
const router = express.Router();
const axios = require('axios').default;

/* GET home page. */
router.get('/*', async function (req, res, next) {
  try {
    const mediaURL = req.params[0];
    console.log('Proxying media: ', mediaURL);

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

module.exports = router;

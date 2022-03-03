const express = require('express');
const app = express();
const axios = require('axios').default;
const PORT = process.env.PORT || 4000;

app.use(express.static('dist'));

app.get('/proxy/media/*', async (req, res) => {
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

app.listen(PORT);
console.log(`Running on  http://localhost:${PORT}`);

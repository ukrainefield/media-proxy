const express = require('express');
const app = express();
const axios = require('axios').default;
const PORT = process.env.PORT || 4000;
const path = require('path');
const mediaProxyRouter = require('./routes/mediaProxy');
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({
  includeMethod: true,
  includeStatusCode: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});
app.use(metricsMiddleware);
app.use(express.static('dist'));

app.use('/proxy/media', mediaProxyRouter);

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT);
console.log(`Running on  http://localhost:${PORT}`);

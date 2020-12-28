const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json()); // parses incoming JSON and makes it available to req.body

app.use('/api', routes); // specifies middleware only to be used if the requested route starts with a certain path

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

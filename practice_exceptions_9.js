const express = require("express");
const app = express();

app.get("/error", (req, res) => {
  throw "Something went wrong";
});

app.use((err, req, res, next) => {
  //res.status(500).send({ error: err.message });
  res.status(500).send({ error: err });
});

app.listen(3000);

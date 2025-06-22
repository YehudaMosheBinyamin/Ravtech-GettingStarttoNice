//const express = express();
const { promisify } = require("util");
const express = require("express");
const app = express();
const asyncHandler = (func) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get(
  "/delayed-greeting",
  asyncHandler(async function (req, res) {
    console.log(req.params);
    if ("fail" in req.params && req.params["fail"] === "true") {
      await promisify(setTimeout(1000));
      throw new Error("Intentional failure");
      //error.catch((err) => {
      //  return res.send(err.message);
      //});
    }
    let promise = await promisify(setTimeout(2000));
    promise.then((res) => {
      return res.json({ greeting: "Hello" });
    });
  })
);
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
app.listen(3000);

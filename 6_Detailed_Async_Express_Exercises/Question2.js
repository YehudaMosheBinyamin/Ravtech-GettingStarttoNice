const express = require("express");
const { fs } = require("fs/promises");
let app = express();
app.get("/file-stats", async (req, res) => {
  let tryRead = await fs.promises.access("data.txt");
});
app.listen(3000);

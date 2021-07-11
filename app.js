const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("哈搂握的");
});

app.listen(3000, () => {
  console.log("App is running on port 3000.");
});

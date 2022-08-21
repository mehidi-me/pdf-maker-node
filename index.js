const express = require("express");
var bodyParser = require("body-parser");
const htmlPdf = require("html-pdf-chrome");

var app = express();
app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { html } = req.body;
  let buff = new Buffer.from(html, "base64").toString("utf-8");
  // async
  const pdf = await htmlPdf.create(buff);
  const res2 = await pdf.toBase64();
  //console.log(res2);
  res.send(res2);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

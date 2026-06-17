const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const publicDir = __dirname;

app.disable("x-powered-by");

app.use(express.static(publicDir, {
  extensions: ["html"],
  maxAge: "1h"
}));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`NgeGameYukz server running on port ${port}`);
});

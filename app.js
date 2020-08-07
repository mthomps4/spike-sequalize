const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  let message = "Hello World!";
  const shouldTransform = process.env.MESSAGE_STYLE === 'uppercase'

  if (shouldTransform) {
    message = message.toUpperCase();
  }

  res.json({message});
});

app.get("/port", (req, res) => {
  res.json({ port });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

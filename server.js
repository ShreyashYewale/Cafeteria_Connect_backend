require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

//DB Connection code

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("OOPS DB not connected");
  });

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

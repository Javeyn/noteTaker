let express = require("express");
let path = require("path");
const fs=require("fs");
const util=require("util");

let app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
})
);

app.use(express.static("public"))
app.use(express.json());

app.listen(PORT, function () {
    console.log("Now Serving you on localhost:" + PORT);
  })
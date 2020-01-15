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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  })
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  })

app.listen(PORT, function () {
    console.log("Now Serving you on localhost:" + PORT);
  })
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

//this is the route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  })

//this is the route for the note taker page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  })

//TODO
//make the function that retrieves notes data from api
    //look into read file async
    //look into app.write???

//create note data api
    //just make a new one and link the notes to that

//make the function that adds the notes
    //this is where app.post goes. find good syntax.
    
//make the function that deletes the notes
    //this is where app.delete goes. 




app.listen(PORT, function () {
    console.log("Now Serving you on localhost:" + PORT);
  })
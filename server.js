const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const app = express();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
var currentId = 1;

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
//make the function that retrieves notes data from api **DONE**
//look into read file async **DONE** util.promisify is the boilerplate needed to make those work
//look into app.write??? **DONE** It's app.post, coupled with writeFileAsync
app.get("/api/notes", function (req, res) {

    readFileAsync("./notes.json", "utf8").then(function (data) {
        console.log("this", data);
        var savedData = JSON.parse(data)
        return res.json(savedData);
    })

});

//create note data api
//just make a new one and link the notes to that--**DONE**

//make the function that adds the notes
//this is where app.post goes. find good syntax.
app.post("/api/notes", function (req, res) {
    readFileAsync("./notes.json", "utf8").then(function (data) {
        var savedData = JSON.parse(data)

        var newNote = req.body;
        // this is how we got the notes to save with an ID, that way we could actually delete items

        //this says that if there is more than one item in the saved data,
        // to make this next item's ID increase incrementally based on the ID of the item before it

        if (savedData.length > 0) {
            currentId = savedData[savedData.length - 1].id + 1
            newNote.id = currentId
            console.log(currentId);
            savedData.push(newNote)
            writeFileAsync("./notes.json", JSON.stringify(savedData))
            res.json(true)
        }
        //if that item has no ID, the else function will give it an ID called currentID, which I set up top as 1.
        else {
            newNote.id = currentId
            console.log(currentId);
            savedData.push(newNote)
            writeFileAsync("./notes.json", JSON.stringify(savedData))
            res.json(true)
        }
    });
},
)
//make the function that deletes the notes
//this is where app.delete goes. 
app.delete("/api/notes/:id", function (req, res) {
    readFileAsync("./notes.json", "utf8").then(function (data) {
        var savedData = JSON.parse(data)
        var removeIndex = savedData.map(function (item) { return item.id; }).indexOf(parseInt(req.params.id));
        savedData.splice(removeIndex, 1);
        writeFileAsync("./notes.json", JSON.stringify(savedData))
        res.json(req.params.id)
    })
});



app.listen(PORT, function () {
    console.log("Now Serving you on localhost:" + PORT);
})

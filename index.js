const express = require("express");
const path = require("path");

app = express();
app.set("view engine", "ejs")

console.log("Folder index.js", __dirname);
console.log("Folder curent de lucru", process.cwd());
console.log("Cale fisier", __filename);

app.get("/cale/:a/:b", function(req, res)
{
    res.send(parseInt(req.params.a) + parseInt(req.params.b));
    console.log("Am primit un request get pe /cale");
});

// app.get("/cale2", function(req, res)
// {
//     res.write("ceva\n");
//     res.write("altceva");
//     res.end;
// })

app.get("/", function(req, res)
{
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:a/:b", function(req, res)
{
    console.log(parseInt(req.params.a) + parseInt(req.params.b));
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/resurse", express.static(path.join(__dirname, "resurse")));

app.listen(8080);
console.log("serverul e pornit");
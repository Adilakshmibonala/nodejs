var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.send("hello!");
});

app.get("/date", (request, response) => {
    let date = new Date();
    response.send(`Today's date is ${date}`);
  });

app.listen(8080, 10.21);
console.log("Listening on port" + 8080);

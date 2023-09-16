// var express = require("express");
// var app = express();
// app.use(express.static(__dirname + "/public"));

// app.get("/", function(request, response){
//     response.send("hello!");
// });

// app.get("/date", (request, response) => {
//     let date = new Date();
//     response.send(`Today's date is ${date}`);
//   });

// app.listen(8080, 10.21);
// console.log("Listening on port" + 8080);


// const greetings = (name) => {
//   console.log(`Hello ${name}`);
// }

// greetings("Adi");

// const { add, sub } = require("./calculator");
// const { add, sub } = calculator;
// console.log(add(9, 9));
// console.log(sub(9, 9));


// const path = require('path');
// const filePath = path.join("users", "adi", "notes.txt", "lakshmi");

// console.log(filePath);

// const addDays = require("date-fns/addDays");
// const res = addDays(new Date(2021, 1, 20), 3);
// console.log(res);


const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { de } = require("date-fns/locale");
const app = express()
app.use(express.json())


const dbPath = path.join(__dirname, "database/mydb.db")
const initilizeDBandServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () => {
          console.log("Server running at http://localhost:3000/");
        });
    }
    catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

initilizeDBandServer();


app.get("/", (request, response) => {
  response.send("Hello World!");
//   console.log(request);
});

app.get("/date", (request, response) => {
  const date = new Date();
  response.send(`Today's date is ${date}`);
});

app.get("/users", async (request, response) => {
    const usersQuery = `
    select * from user;
    `;
    const users = await db.all(usersQuery);
    response.send(users);
});

app.get("/users/:userId/", async (request, response) => {
    const { userId } = request.params;
    console.log("userId", userId);
  const usersQuery = `
    select * from user where id=${userId};
    `;
  const users = await db.get(usersQuery);
  response.send(users);
});


app.post("/users/", async (request, response) => {
    const details = request.body;
    console.log("details", details);
    const { userId, name, age } = details;
    const usersQuery = `
    insert into user (id, name, age) values (${userId}, '${name}', ${age})
     `;
    const user = await db.run(usersQuery);
    response.send({ Response: userId });
});


app.put("/users/:userId/", async (request, response) => {
    const details = request.body;
    console.log("details", details);
    const { userId, name, age } = details;
    
    const userQuery = `
    update user set name='${name}', age=${age} where id=${userId}
    `
    const user = await db.run(userQuery);
    response.send({ Response: userId });
});

app.delete("/users/:userId/", async (request, response) => {
    const {userId} = request.params;
    console.log("userId", userId);
    const userQuery = `
    delete from user where id=${userId}
    `;
    const user = await db.run(userQuery);
    response.send({ Response: userId });
});

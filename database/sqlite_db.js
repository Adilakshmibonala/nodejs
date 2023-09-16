const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");
db.run(
  "create table if not exists user (id integer primary key, name text, age integer);"
);

db.run("INSERT INTO user (id, name, age) VALUES (1, 'adi', 24);");
db.run("INSERT INTO user (id, name, age) VALUES (2, 'lakshmi', 26);");
db.run("INSERT INTO user (id, name, age) VALUES (3, 'saru', 28);");

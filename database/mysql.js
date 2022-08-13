import mysql from "mysql";

const connection = mysql.createConnection({
  host: "110.12.198.139",
  user: "newbie",
  password: "0000",
  database: "trip",
});

connection.connect();

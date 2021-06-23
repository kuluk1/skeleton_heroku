import express from "express";
const { Client } = require("pg");

const app = express();
const { DATABASE_URL } = process.env;

app.get("/", (_, res) => {
  console.log(process.env.DATABASE_URL);
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  client
    .connect()
    .then(() => client.query("SELECT * FROM hellotable"))
    .then((result: { rows: { name: any }[] }) => {
      res.send(`${result.rows[0].name}\n`);
      client.end();
    })
    .catch((err: any) => {
      console.log(err);
      res.send("ERROR");
      client.end();
    });

  // res.send('Hello World!')
});

app.get("/ping", (_, res) => {
  res.send("pong");
});
export default app;

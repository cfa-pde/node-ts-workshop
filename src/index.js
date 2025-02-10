import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [
  { type: "admin", name: "Jane" },
  { type: "staff", name: "Joe" },
];

app.get("/users", (req, res) => {
  res.send(JSON.stringify(users));
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

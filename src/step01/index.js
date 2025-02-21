import express from "express";
import bodyParser from "body-parser";
import buildUserService from "./user-service.js";

const run = () => {
  // set up Express
  const app = express();
  const port = 3000;

  // set up Express middleware that will parse JSON payloads for us:
  app.use(bodyParser.json());

  const userService = buildUserService();

  app.get("/users", (req, res) => {
    const users = userService.getAll();
    res.send(JSON.stringify(users));
  });

  app.get("/users/:id", (req, res) => {
    const user = userService.getById(req.params.id);

    if (!user) {
      return res.status(404);
    }

    res.send(JSON.stringify(user));
  });

  app.post("/users", (req, res) => {
    const userData = req.body;
    const createdUser = userService.create(userData);
    res.send(JSON.stringify(createdUser));
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default run;

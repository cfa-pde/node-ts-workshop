import express from "express";
import bodyParser from "body-parser";
import buildUserService from "./user-service.js";

const run = async () => {
  const userService = await buildUserService();

  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  app.get("/users", async (req, res) => {
    const users = await userService.getAll();
    res.send(JSON.stringify(users));
  });

  app.get("/users/:id", async (req, res) => {
    const user = await userService.getById(req.params.id);

    if (!user) {
      res.status(404);
    }

    res.send(JSON.stringify(user));
  });

  app.post("/users", async (req, res) => {
    const serialisedUser = req.body;
    await userService.create(serialisedUser);
    res.send(JSON.stringify());
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default run;

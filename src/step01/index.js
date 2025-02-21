import express from "express";
import bodyParser from "body-parser";
import { save, getById, getAll } from "./in-memory-db.js";

const run = () => {
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  const randomInt = () => Math.floor(Math.random() * 100000);

  const createAdmin = (user) => save({ id: `ADMIN_${randomInt()}`, ...user });
  const createGuest = (user) => save({ id: `GUEST_${randomInt()}`, ...user });

  const createUser = (user) => {
    if (user.type === "admin") {
      createAdmin(user);
    }
    if (user.type === "guest") {
      createGuest(user);
    }
  };

  app.get("/users", (req, res) => {
    res.send(JSON.stringify(getAll()));
  });

  app.get("/users/:id", (req, res) => {
    const user = getById(req.params.id);

    if (!user) {
      res.status(404);
    }

    res.send(JSON.stringify(user));
  });

  app.post("/users", (req, res) => {
    const serialisedUser = req.body;
    res.send(JSON.stringify(createUser(serialisedUser)));
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default run;

import express from "express";
import bodyParser from "body-parser";
import { randomInt } from "../utils.js";
import { init } from "./file-system-db.js";

const run = async () => {
  const userDB = await init("users");

  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  const createAdmin = (user) =>
    userDB.save({ id: `ADMIN_${randomInt()}`, ...user });
  const createGuest = (user) =>
    userDB.save({ id: `GUEST_${randomInt()}`, ...user });

  const createUser = (user) => {
    if (user.type === "admin") {
      return createAdmin(user);
    }
    if (user.type === "guest") {
      return createGuest(user);
    }
  };

  app.get("/users", async (req, res) => {
    const users = await userDB.getAll();
    res.send(JSON.stringify(users));
  });

  app.get("/users/:id", (req, res) => {
    const user = userDB.getById(req.params.id);

    if (!user) {
      res.status(404);
    }

    res.send(JSON.stringify(user));
  });

  app.post("/users", async (req, res) => {
    const serialisedUser = req.body;
    await createUser(serialisedUser);
    res.send(JSON.stringify());
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default run;

import { randomInt } from "../utils.js";

export const createAdmin = (user) => {
  if (user.type !== "admin") {
    throw new Error("invalid user: type mismatch!");
  }
  if (!user.name) {
    throw new Error("invalid user: no name!");
  }
  return { id: `ADMIN_${randomInt()}`, ...user };
};

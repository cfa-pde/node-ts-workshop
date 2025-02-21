import { randomInt } from "../utils.js";

export const createGuest = (user) => {
  if (user.type !== "guest") {
    throw new Error("invalid user: type mismatch!");
  }
  if (!user.name) {
    throw new Error("invalid user: no name!");
  }
  return { id: `GUEST_${randomInt()}`, ...user };
};

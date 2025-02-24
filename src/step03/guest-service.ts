import { randomInt } from "../utils";
import { User } from "./types";

export type Guest = User & {
  type: "guest";
};

export const createGuest = (user: Guest) => {
  return { id: `GUEST_${randomInt()}`, ...user };
};

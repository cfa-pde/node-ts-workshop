import { randomInt } from "../utils";
import { User } from "./types";

export type Admin = User & {
  type: "admin";
};

export const createAdmin = (user: Admin) => {
  return { id: `ADMIN_${randomInt()}`, ...user };
};

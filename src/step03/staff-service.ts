import { randomInt } from "../utils";
import { User } from "./types";

export type Staff = User & {
  type: "staff";
};

export const createStaff = (user: Staff) => {
  return { id: `STAFF_${randomInt()}`, ...user };
};

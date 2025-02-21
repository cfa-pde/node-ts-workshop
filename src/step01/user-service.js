import { randomInt } from "../utils.js";
import { save, getById, getAll } from "./in-memory-db.js";

const buildUserService = () => {
  const createAdmin = (user) => save({ id: `ADMIN_${randomInt()}`, ...user });
  const createGuest = (user) => save({ id: `GUEST_${randomInt()}`, ...user });

  const createUser = (user) => {
    if (user.type === "admin") {
      return createAdmin(user);
    }
    return createGuest(user);
  };

  return {
    create: createUser,
    getAll,
    getById,
  };
};

export default buildUserService;

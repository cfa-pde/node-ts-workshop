import { randomInt } from "../utils.js";
import { init } from "./file-system-db.js";

const preloadedUsers = [
  { id: "ADMIN_46576", type: "admin", name: "Jane" },
  { id: "GUEST_18377", type: "guest", name: "Joe" },
];

const buildUserService = async () => {
  const db = await init("users", preloadedUsers);

  const createAdmin = (user) =>
    db.save({ id: `ADMIN_${randomInt()}`, ...user });
  const createGuest = (user) =>
    db.save({ id: `GUEST_${randomInt()}`, ...user });

  const createUser = (user) => {
    if (user.type === "admin") {
      return createAdmin(user);
    }
    if (user.type === "guest") {
      return createGuest(user);
    }
  };

  return {
    create: createUser,
    getAll: db.getAll,
    getById: db.getById,
  };
};

export default buildUserService;

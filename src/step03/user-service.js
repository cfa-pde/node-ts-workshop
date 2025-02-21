import { init } from "./file-system-db.js";
import { createAdmin } from "./admin-service.js";
import { createGuest } from "./guest-service.js";

const preloadedUsers = [
  { id: "ADMIN_46576", type: "admin", name: "Jane" },
  { id: "GUEST_18377", type: "guest", name: "Joe" },
];

const buildUserService = async () => {
  const db = await init("users", preloadedUsers);

  const createUser = (user) => {
    if (!user.type) {
      throw new Error("invalid user: type does not exist!");
    }

    if (user.type === "admin") {
      return db.save(createAdmin(user));
    }

    return db.save(createGuest(user));
  };

  return {
    create: createUser,
    getAll: db.getAll,
    getById: db.getById,
  };
};

export default buildUserService;

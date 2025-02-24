import { init, UserWithId } from "./file-system-db";
import { Admin, createAdmin } from "./admin-service";
import { createGuest, Guest } from "./guest-service";
import { createStaff, Staff } from "./staff-service";

const preloadedUsers: UserWithId[] = [
  { id: "ADMIN_46576", type: "admin", name: "Jane" },
  { id: "GUEST_18377", type: "guest", name: "Joe" },
  { id: "STAFF_23217", type: "staff", name: "Mary" },
];

type User = Guest | Admin | Staff;

const buildUserService = async () => {
  const db = await init("users", preloadedUsers);

  const createUser = (user: User) => {
    if (!user.type) {
      throw new Error("invalid user: type does not exist!");
    }

    if (user.type === "admin") {
      return db.save(createAdmin(user));
    }

    if (user.type === "guest") {
      return db.save(createGuest(user));
    }

    return db.save(createStaff(user));
  };

  return {
    create: createUser,
    getAll: db.getAll,
    getById: db.getById,
  };
};

export default buildUserService;

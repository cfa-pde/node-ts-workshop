const users = [
  { id: "ADMIN_46576", type: "admin", name: "Jane" },
  { id: "GUEST_18377", type: "guest", name: "Joe" },
];

export const save = (record) => {
  users.push(record);
  return record;
};

export const getAll = () => users;

export const getById = (id) => users.find(({ id: userId }) => userId === id);

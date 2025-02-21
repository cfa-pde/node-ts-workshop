import fs from "node:fs/promises";
import { existsSync } from "node:fs";

const preloadedUsers = [
  { id: "ADMIN_46576", type: "admin", name: "Jane" },
  { id: "GUEST_18377", type: "guest", name: "Joe" },
];

const dbPath = "./db";
const createTablePath = (tableName) => `${dbPath}/${tableName}.json`;

// explain the event-loop, promises, async/await, using the file-system;
// can be illustrated with sync and async node functions
const createDbDirectory = async () => {
  if (!existsSync(dbPath)) {
    await fs.mkdir(dbPath);
  }
};

const createTable = async (tablePath) => {
  if (!existsSync(tablePath)) {
    await fs.writeFile(tablePath, JSON.stringify(preloadedUsers));
  }
};

const getAll = (path) => async () => {
  const serializedRecords = await fs.readFile(path);
  return JSON.parse(serializedRecords);
};

const getById = (path) => async (id) => {
  const users = await getAll(path)();
  return users.find(({ id: userId }) => userId === id);
};

const save = (path) => async (record) => {
  const records = await getAll(path)();
  return fs.writeFile(path, JSON.stringify([...records, record]));
};

export const init = async (tableName) => {
  const tablePath = createTablePath(tableName);

  await createDbDirectory();
  await createTable(tablePath);

  return {
    save: save(tablePath),
    getAll: getAll(tablePath),
    getById: getById(tablePath),
  };
};

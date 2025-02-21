import fs from "node:fs/promises";
import { existsSync } from "node:fs";

const dbPath = "./db";
const createTablePath = (tableName) => `${dbPath}/${tableName}.json`;

const createDbDirectory = async () => {
  if (!existsSync(dbPath)) {
    await fs.mkdir(dbPath);
  }
};

const createTable = async (tablePath, seed = []) => {
  if (!existsSync(tablePath)) {
    await fs.writeFile(tablePath, JSON.stringify(seed));
  }
};

const getAll = (path) => async () => {
  const serializedRecords = await fs.readFile(path);
  return JSON.parse(serializedRecords);
};

const getById = (path) => async (id) => {
  if (typeof id !== "string") {
    throw new Error("invalid id: not a string!");
  }
  const records = await getAll(path)();
  return records.find(({ id: recordId }) => recordId === id);
};

const save = (path) => async (record) => {
  if (!record.id) {
    throw new Error("invalid record: no id!");
  }
  const records = await getAll(path)();
  return fs.writeFile(path, JSON.stringify([...records, record]));
};

export const init = async (tableName, seed) => {
  const tablePath = createTablePath(tableName);

  await createDbDirectory();
  await createTable(tablePath, seed);

  return {
    save: save(tablePath),
    getAll: getAll(tablePath),
    getById: getById(tablePath),
  };
};

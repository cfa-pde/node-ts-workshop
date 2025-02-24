import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { User } from "./types";

const dbPath = "./db";
const createTablePath = (tableName: string) => `${dbPath}/${tableName}.json`;

export type UserWithId = User & { id: string };

const createDbDirectory = async () => {
  if (!existsSync(dbPath)) {
    await fs.mkdir(dbPath);
  }
};

const createTable = async (tablePath: string, seed: UserWithId[] = []) => {
  if (!existsSync(tablePath)) {
    await fs.writeFile(tablePath, JSON.stringify(seed));
  }
};

const getAll = (path: string) => async () => {
  const serializedRecords = await fs.readFile(path);
  return JSON.parse(serializedRecords.toString()) as UserWithId[];
};

const getById = (path: string) => async (id: string) => {
  if (typeof id !== "string") {
    throw new Error("invalid id: not a string!");
  }
  const records = await getAll(path)();
  return records.find(({ id: recordId }) => recordId === id);
};

const save = (path: string) => async (record: UserWithId) => {
  if (!record.id) {
    throw new Error("invalid record: no id!");
  }
  const records = await getAll(path)();
  return fs.writeFile(path, JSON.stringify([...records, record]));
};

export const init = async (tableName: string, seed: UserWithId[]) => {
  const tablePath = createTablePath(tableName);

  await createDbDirectory();
  await createTable(tablePath, seed);

  return {
    save: save(tablePath),
    getAll: getAll(tablePath),
    getById: getById(tablePath),
  };
};

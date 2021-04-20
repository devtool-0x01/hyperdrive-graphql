export const {
  PORT = 4000,
  DB_NAME = "./test.db",
  DB_USER = "",
  DB_PASSWORD = "",
  DB_HOST = "",
} = process.env;

export const IS_PROD = process.env.NODE_ENV === "production";

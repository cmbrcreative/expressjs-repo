require("dotenv").config();

module.exports = {
  type: "postgres",
  logging: false,
  synchronize: true,
  url: process.env.DATABASE_URL,
  ssl: process.env.DYNO ? { rejectUnauthorized: false } : false,
  entities: ["src/entity/**/*.js"],
  seeds: ["src/database/seeds/**/*.js"],
  factories: ["src/database/factories/**/*.js"],
  migrations: ["src/database/migrations/**/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/database/migrations",
  },
};

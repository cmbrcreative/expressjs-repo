import { createConnection, ConnectionOptions } from "typeorm";

import { User } from "src/entity/User";

// The database connection options
const options: ConnectionOptions = {
  type: "postgres",
  logging: false,
  synchronize: true,
  url: process.env.DATABASE_URL,
  ssl: process.env.DYNO ? { rejectUnauthorized: false } : false,
  entities: [User],
};

export default async function init() {
  // Create ORM database connection
  const connection = await createConnection(options);

  // Run migrations as needed
  await connection.runMigrations();

  // Return connection inst
  return connection;
}

const config = new URL(process.env.DATABASE_URL || "postgres://postgres:kelvin123@127.0.0.1:5432/binar_final_project");

const {
  DB_USER = config.username,
  DB_PASSWORD = config.password,
  DB_NAME = config.pathname.replace("/", ""),
  DB_HOST = config.hostname,
  DB_PORT = "5434",
} = process.env;

// console.log(DB_USER,
//     DB_PASSWORD,
//     DB_NAME,
//     DB_HOST,
//     DB_PORT);

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    // ssl: true,
    // dialectOptions: {
    //     ssl: {
    //       require: true,
    //       rejectUnauthorized: false,
    //     },
    //   },
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    port: DB_PORT,
    storage: "node_modules/test.sqlite",
    dialect: "sqlite",
    logging: false,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    ssl: true,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    dialect: "postgres",
  },
};

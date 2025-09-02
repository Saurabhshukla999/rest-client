const { RequestHistory } = require("./entities/RequestHistory");
const { SqliteDriver } = require("@mikro-orm/sqlite");

module.exports = {
  driver: SqliteDriver,
  dbName: "data.db",
  entities: [RequestHistory],
  debug: true
};

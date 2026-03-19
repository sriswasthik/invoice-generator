const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;

// const { PrismaClient } = require("@prisma/client");
// const Database = require("better-sqlite3");
// const PrismaBetterSQLite3 = require("@prisma/adapter-better-sqlite3").default;

// const db = new Database("./prisma/dev.db");

// const adapter = new PrismaBetterSQLite3(db);

// const prisma = new PrismaClient({
//   adapter
// });

// module.exports = prisma;
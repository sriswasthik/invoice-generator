const {
  PrismaClient
} = require(
  "@prisma/client"
);

// =====================================
// PRISMA CLIENT
// =====================================

const globalForPrisma =
  global;

// Prevent multiple Prisma instances
// during development hot reload

const prisma =
  globalForPrisma.prisma ||

  new PrismaClient({

    log: [

      "error",

      "warn"

    ]

  });

// Save instance globally in dev

if (
  process.env.NODE_ENV !==
  "production"
) {

  globalForPrisma.prisma =
    prisma;
}

module.exports =
  prisma;
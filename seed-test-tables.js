const { seedTestTable } = require("./backend/MVC/utils/db-utils.js");

async function seedTables() {
  try {
    await seedTestTable("events");
    await seedTestTable("users");
    console.log("Tables seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log("Error seeding test tables");
    process.exit(1);
  }
}

seedTables();

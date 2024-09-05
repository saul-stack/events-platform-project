const eventsAndUsersPool = require("../connection");

const seedDatabase = async () => {
  try {
    await eventsAndUsersPool.query(`
      DROP TABLE IF EXISTS events;
    `);
    console.log("Drop 'events' table \u2714");

    await eventsAndUsersPool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        day_of_week VARCHAR(50) NOT NULL,
        time TIME NOT NULL,
        description TEXT,
        advance_price DECIMAL(5, 2),
        door_price DECIMAL(5, 2),
        total_tickets INT,
        tickets_available INT,
        is_seated BOOLEAN NOT NULL,
        is_ticketed BOOLEAN NOT NULL,
        is_recurring BOOLEAN NOT NULL
      );
    `);

    console.log("Create empty 'events' table with columns \u2714");
    console.log("Table data purged successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    eventsAndUsersPool.end();
  }
};

seedDatabase();

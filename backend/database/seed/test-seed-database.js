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
    console.log("Create 'events' table \u2714");

    const result = await eventsAndUsersPool.query(
      "SELECT COUNT(*) FROM events"
    );
    const rowCount = result.rows[0].count;
    console.log(
      `Table 'events' has been created with data columns. Number of entries in the table: ${rowCount}`
    );
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    eventsAndUsersPool.end();
  }
};

seedDatabase();

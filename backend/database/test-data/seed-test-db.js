const eventsAndUsersPool = require("../connection");
const fs = require("fs").promises;

const seedDatabase = async () => {
  try {
    const eventsData = await fs.readFile("./data/test-data.json", "utf-8");
    const seedData = JSON.parse(eventsData);
    await eventsAndUsersPool.query(`
      DROP TABLE IF EXISTS events;
    `);
    console.log("Drop 'events' table \u2714");

    await eventsAndUsersPool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        day_of_week VARCHAR(50) NOT NULL,
        time TIME NOT NULL,
        description TEXT,
        advance_price DECIMAL(5, 2),
        door_price DECIMAL(5, 2),
        tickets_total INT,
        tickets_sold INT,
        is_seated BOOLEAN NOT NULL,
        is_ticketed BOOLEAN NOT NULL,
        is_recurring BOOLEAN NOT NULL
      );
    `);
    console.log("Create empty 'events' table with columns \u2714");

    for (const event of seedData) {
      await eventsAndUsersPool.query(
        `INSERT INTO events (
          title, date, day_of_week, time, description, advance_price, door_price, tickets_total, tickets_sold, is_seated, is_ticketed, is_recurring
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          event.title,
          event.date,
          event.day_of_week,
          event.time,
          event.description,
          event.advance_price,
          event.door_price,
          event.tickets_total,
          event.tickets_sold,
          event.is_seated,
          event.is_ticketed,
          event.is_recurring,
        ]
      );
    }

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
    await eventsAndUsersPool.end();
  }
};

seedDatabase();

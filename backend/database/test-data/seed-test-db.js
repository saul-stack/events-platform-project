const eventsAndUsersPool = require("../connection");
const fs = require("fs").promises;
const path = require("path");

const fetchData = async () => {
  const filePath = path.join(__dirname, "./data/test-data.json");
  try {
    const eventsData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(eventsData);
  } catch (err) {
    console.error("Error reading data file:", err);
    throw err;
  }
};

const seedDatabase = async (data) => {
  try {
    for (const event of data) {
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
      `Seed table 'events' with ${rowCount} entries from test-data.json \u2714`
    );
  } catch (err) {
    console.error("Error seeding database:", err);
    throw err;
  } finally {
    await eventsAndUsersPool.end();
  }
};

fetchData()
  .then((data) => seedDatabase(data))
  .catch((err) => {
    console.error("Error in fetchData or seedDatabase:", err);
  })
  .then(() => {
    console.log("Seed table data \u2714.");
  })
  .catch((err) => {
    console.log(err);
  });

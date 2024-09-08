const eventsAndUsersPool = require("../connection");

const purgeDatabase = async (table) => {
  const dropQuery = `DROP TABLE IF EXISTS ${table};`;
  try {
    await eventsAndUsersPool.query(dropQuery);

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
  } catch (err) {
    throw err;
  } finally {
    await eventsAndUsersPool.end();
  }
};

purgeDatabase("events")
  .then(() => {
    console.log("Purge table data \u2714.");
  })
  .catch((err) => {
    console.error("Error purging database:", err);
  });

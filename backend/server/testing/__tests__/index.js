const server = require("../../server.js");
const request = require("supertest");
const db = require("../../../database/connection.js");

const {
  fetchTable,
  fetchTableEntry,
} = require("../../../MVC/utils/db-utils.js");
const { seedTestTable } = require("../../../MVC/utils/db-utils.js");

const newEvent = {
  "title": "POST Test Event",
  "date": "2022-12-31",
  "time": "18:00:00",
  "description": "This is a test event created by a POST request.",
  "event_type": "test",
  "advance_price": 0.0,
  "door_price": 0.0,
  "tickets_total": 0,
  "tickets_sold": 0,
  "is_seated": true,
  "is_ticketed": false,
  "is_recurring": false,
  "image_url": "https://via.placeholder.com/150",
};

const newUser = {
  "first_name": "Test",
  "last_name": "User",
  "user_name": "TestUser123",
  "events_watched": [1],
  "events_booked": [2, 4],
  "email": "post@test.com",
  "role": "user",
  "hashed_password": "password",
};

module.exports = {
  server,
  request,
  db,
  fetchTable,
  fetchTableEntry,
  seedTestTable,
  newEvent,
  newUser,
};

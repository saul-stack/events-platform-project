const server = require("../../server.js");
const request = require("supertest");
const db = require("../../../database/connection.js");

const {
  fetchTable,
  fetchTableEntry,
} = require("../../../database/db-utils.js");
const { seedTestTable } = require("../../../database/db-utils.js");

const newEvent = {
  "title": "POST Test Event",
  "date": "2022-12-31",
  "day_of_week": "Saturday",
  "time": "18:00:00",
  "description": "This is a test event created by a POST request.",
  "advance_price": "10.0",
  "door_price": "15.0",
  "tickets_total": "100",
  "tickets_sold": "0",
  "is_seated": "true",
  "is_ticketed": "true",
  "is_recurring": "false",
};

module.exports = {
  server,
  request,
  db,
  fetchTable,
  fetchTableEntry,
  seedTestTable,
  newEvent,
};

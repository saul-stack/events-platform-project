const server = require("../../server.js");
const request = require("supertest");
const db = require("../../../database/connection.js");

const {
  fetchTable,
  fetchTableEntry,
} = require("../../../database/db-utils.js");
const { seedTestTable } = require("../../../database/db-utils.js");

module.exports = {
  server,
  request,
  db,
  fetchTable,
  fetchTableEntry,
  seedTestTable,
};

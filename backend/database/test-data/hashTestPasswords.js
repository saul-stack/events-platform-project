const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const filePath = path.join(__dirname, "./users-test-data.json");

const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const hashPasswords = async (entries) => {
  const saltRounds = 10;
  for (let entry of entries) {
    if (entry.hashed_password) {
      entry.hashed_password = await bcrypt.hash(
        entry.hashed_password,
        saltRounds
      );
    }
  }
};

const updateJson = async () => {
  await hashPasswords(data.entries);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Passwords hashed and JSON file updated.");
};

updateJson();

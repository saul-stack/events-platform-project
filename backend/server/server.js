const dotenv = require("dotenv").config({ path: "../.env.development" });

const axios = require("axios");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
const express = require("express");
const server = express();

server.use(express.json());

const bodyParser = require("body-parser");
const cors = require("cors");

const { getAllEndpoints } = require("../MVC/controllers/api.controllers.js");
const {
  postToEvents,
  getEvents,
  getEventById,
  deleteEventById,
  patchEventById,
} = require("../MVC/controllers/events.controllers.js");

const {
  getAllUsers,
  postToUsers,
  getUserById,
  deleteUserById,
  patchUserById,
  getUserByUsername,
  logUserIn,
} = require("../MVC/controllers/users.controllers.js");

const {
  handleStripeRequest,
} = require("../MVC/controllers/payment.controller.js");

const rejectRequestMethod = (req, res) => {
  const METHOD = req.method;
  const ENDPOINT = req.originalUrl;
  console.error(` ${METHOD} Method Not Allowed on ${ENDPOINT}`);
  return res
    .status(405)
    .json({ error: `${METHOD} Method Not Allowed on ${ENDPOINT}` });
};

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/api", getAllEndpoints);
server.delete("/api", rejectRequestMethod);
server.put("/api", rejectRequestMethod);
server.post("/api", rejectRequestMethod);
server.patch("/api", rejectRequestMethod);

server.get("/api/events", getEvents);
server.post("/api/events", postToEvents);
server.delete("/api/events", rejectRequestMethod);
server.put("/api/events", rejectRequestMethod);
server.patch("/api/events", rejectRequestMethod);

server.get("/api/events/:id", getEventById);
server.delete("/api/events/:id", deleteEventById);
server.patch("/api/events/:id", patchEventById);
server.post("/api/events/:id", rejectRequestMethod);
server.put("/api/events/:id", rejectRequestMethod);

server.get("/api/users", getAllUsers);
server.delete("/api/users", rejectRequestMethod);
server.put("/api/users", rejectRequestMethod);
server.patch("/api/users", rejectRequestMethod);
server.post("/api/users", postToUsers);

server.get("/api/users/:id", getUserById);
server.delete("/api/users/:id", deleteUserById);
server.post("/api/users/:id", rejectRequestMethod);
server.put("/api/users/:id", rejectRequestMethod);
server.patch("/api/users/:id", patchUserById);

server.get("/api/users/username/:username", getUserByUsername);

server.post("/api/login", logUserIn);

server.post("/api/create-checkout-session", async (req, res) => {
  const response = req.body;
  const event = response;

  const lineItems = [
    {
      price_data: {
        currency: "gbp",
        product_data: {
          name: event.products[0].title,
        },
        unit_amount: event.products[0].advance_price * 100,
      },
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `https://events-platform-project.onrender.com/success?eventId=${event.products[0].id}`,
      cancel_url: `https://events-platform-project.onrender.com/failure`,
    });

    return res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return res.status(500).send("Internal Server Error");
  }
});

const url1 = `https://events-platform-project.onrender.com`;
const url2 = `https://events-platform-project-xt77.onrender.com/api`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url1)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        } for URL1`
      );
      return axios.get(url2);
    })
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        } for URL2`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

module.exports = server;

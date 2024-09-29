const { sendStripePayment } = require("../models/payment.model");

exports.handleStripeRequest = (req, res) => {
  try {
    sendStripePayment(req, res);
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

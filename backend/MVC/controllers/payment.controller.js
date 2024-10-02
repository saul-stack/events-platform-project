const { createCheckoutSession } = require("../models/payment.model");

exports.handleStripeRequest = async (req, res) => {
  try {
    response = await createCheckoutSession(req, res);
    return response;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { event } = req.body;
  const HOMEPAGE_URL = process.env.HOMEPAGE_URL || "http://localhost:5173";

  const lineItems = [
    {
      price_data: {
        currency: "gbp",
        product_data: {
          name: event.title,
        },
        unit_amount: event.advance_price * 100,
      },
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${HOMEPAGE_URL}/success?eventId=${event.id}`,
      cancel_url: `${HOMEPAGE_URL}/failure`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { createCheckoutSession };

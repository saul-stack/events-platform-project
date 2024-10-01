const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req) => {
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
  console.log(lineItems, "<<<<<<<<here");
  console.log(`${HOMEPAGE_URL}/success?eventId=${event.id}`, "<<<<<<<<here");

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${HOMEPAGE_URL}/success?eventId=${event.id}`,
      cancel_url: `${HOMEPAGE_URL}/failure`,
    });

    return { id: session.id };
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = { createCheckoutSession };

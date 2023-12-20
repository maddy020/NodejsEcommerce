const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const productCheckout = async (req, res) => {
  try {
    const product = JSON.parse(req.body.productInfo);
    const user = req.user;

    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.username,
    });

    // Iterate over the product array and create a new array of objects - named lineItems
    const lineItems = product.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.img],
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      };
    });

    // Create a new session for the checkout page
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      line_items: lineItems,
      phone_number_collection: {
        enabled: true,
      },
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      mode: "payment",
      success_url: "https://e-commerce-jtkx.onrender.com/success",
      cancel_url: "https://e-commerce-jtkx.onrender.com/cancel",
    });

    // Redirect the user to the checkout page
    res.redirect(303, session.url);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in the product checkout route", error);
  }
};

const successPage = (req, res) => {
  try {
    res.render("payment/success");
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in the success page route", error);
  }
};

const failurePage = (req, res) => {
  try {
    res.render("payment/cancel");
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong in the cancel page route", error);
  }
};

module.exports = { productCheckout, successPage, failurePage };

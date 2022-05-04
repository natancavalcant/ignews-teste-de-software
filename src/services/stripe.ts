import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    appInfo: {
      name: 'Ig.news',
      version: '0.1.0',
    },
    apiVersion: "2020-08-27"
  }
)
const event = stripe.webhooks.constructEvent(
  req.body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);

switch (event.type) {
  case 'payment_intent.succeeded':
    handleSuccessfulPayment(event.data.object);
    break;
  // Handle other events
} 
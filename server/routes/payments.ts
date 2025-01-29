router.post('/payment-intents', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: { farmId: req.body.farmId }
  });
  
  res.json({ clientSecret: paymentIntent.client_secret });
}); 
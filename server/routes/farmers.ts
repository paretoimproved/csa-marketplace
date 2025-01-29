router.post('/onboard', async (req, res) => {
  const account = await stripe.accounts.create({
    type: 'express',
    business_type: 'individual',
    capabilities: {
      transfers: { requested: true }
    },
    metadata: {
      userId: req.user.id,
      farmId: req.body.farmId
    }
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.BASE_URL}/onboarding/retry`,
    return_url: `${process.env.BASE_URL}/dashboard`,
    type: 'account_onboarding'
  });

  await prisma.farmProfile.create({
    data: {
      ...req.body,
      stripeAccountId: account.id,
      userId: req.user.id
    }
  });

  res.json({ accountLink });
}); 
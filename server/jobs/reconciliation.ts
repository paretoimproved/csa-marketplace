const reconcilePayments = async () => {
  const payments = await stripe.charges.list({
    created: { gte: unixTimeYesterday }
  });
  
  await prisma.$transaction(
    payments.data.map(charge => 
      prisma.payment.updateMany({
        where: { stripeId: charge.id },
        data: { status: charge.status }
      })
    )
  );
}; 
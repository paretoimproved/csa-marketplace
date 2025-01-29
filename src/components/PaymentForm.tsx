const stripe = useStripe();
const elements = useElements();

const handleSubmit = async () => {
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { return_url: window.location.href },
  });
  
  if (error) showError(error.message);
}; 
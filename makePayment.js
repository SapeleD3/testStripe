require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env._STRIPE_SECRET_KEY);

const charges = async (requestBody) => {
  const { cardNumber, cvc, expMonth, expYear, customerName, customerEmail } =
    requestBody;

  try {
    // create a unique token for the card input
    const cardToken = await stripe.tokens.create({
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc,
      },
    });

    console.log('TOKEN', cardToken);

    const customer = await stripe.customers.create({
      name: customerName,
      email: customerEmail,
      source: cardToken?.id,
    });

    console.log('CUSTOMER', customer);
    const charge = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      customer: customer?.id,
      description: 'complete test',
    });

    console.log(charge);

    return charge;
  } catch (error) {
    console.log('error making charge', error);
  }
};

module.exports = charges;

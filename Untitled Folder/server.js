
if(process.env.NODE_ENV !== 'production'){

    require('dotenv').config();  

}

const stripe = require('stripe')(process.env.SCRET_KEY);
const express = require('express');
const app = express();
app.use(express.static('.'));

const PORT = process.env.PORT || 9000;

app.post('/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(PORT, () => console.log(`>>>-Run-page--> http://localhost:${PORT}`));

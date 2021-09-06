const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const stripe = require('stripe')('sk_test_51IPsghGSVElWPp0sE0f2J3LiluLdLaahf5xwlbTUf2xDMuGjALa1PKS35WtIEwu5EYIB5rXsQIjnMD1JeWQcGAnz00YjorFMI2');
const uuid = require('uuid');
const model = require("./model")

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
  console.log('Inside get method');
  res.send('Server works!');
})

app.get("/recommend", (req, res) => {
  let userId = req.query.userId
  console.log('here'+ userId)
    recs = model.recommend(userId)
          .then((recs) => {
              res.send(recs)
          })
          .catch((err) => {
            console.log(err);
          })
})

// app.post('/checkout', async (req, res) => {
//   // Use an existing Customer ID if this is a returning customer.
//   const amount = req.body.amount;
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     {customer: customer.id},
//     {apiVersion: '2020-08-27'}
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: 'ron',
//     customer: customer.id,
//   });
//   res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id
//   });
// });

app.post('/checkout', async (req, res) => {
  const amount = req.body.amount;
  const email = req.body.email;
  console.log(amount);
    const customer = await stripe.customers.create({
      email: email,
      //source: tokenId,
    });
 
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2020-08-27'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'ron',
      customer: customer.id,
      payment_method_types: ["card"],
      // source: customer.default_source.id,
      confirmation_method: 'automatic',
      description: 'Test payment',
    });
  
    const paymentConfirm = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      { payment_method: "pm_card_visa" }
    );
    //res.status(200).send(paymentConfirm);
  
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id
  });


  // stripe.charges
  //   .create({
  //     amount: amount * 100, // Unit: cents
  //     currency: 'ron',
  //     source: tokenId,
  //     description: 'Test payment',
  //   })
  //   .then(result => res.send(result))
  //   .catch(error => console.log(error));
});

app.get('/do', (req, res) => {
  console.log('Inside do route');
  res.send('Server do!');
});

//listen
app.listen(5000, () => console.log(`Listening on port 5000`));

// //init Firebase database
// admin.initializeApp();
// export const db = admin.firestore();

// // Loads env variables
// require('dotenv').config();

// // Initalizes express server
// const app = express();

// // specifies what port to run the server on
// const PORT = process.env.PORT || 3001;

// // Adds json parsing middleware to incoming requests
// app.use(express.json());

// // makes the app aware of routes in another folder
// app.use('/caritas', routes);

// // console.log that your server is up and running
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
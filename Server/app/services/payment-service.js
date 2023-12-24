import braintree from 'braintree';
import dotenv from 'dotenv';
dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

export const processPayment = async(paymentMethodNonce)=>{
    const payment =  await gateway.transaction.sale({
        amount:'19.99',
        paymentMethodNonce,
        options:{
            submitForSettlement: true,
        },
    })
    return payment;
}

export const generateClientToken = async() => {
    console.log("calling this")
    let clientToken;
    gateway.clientToken.generate({}).then(response => {
        clientToken = response.clientToken
      });
    console.log("🚀 ~ file: payment-service.js:26 ~ generateClientToken ~ client:", clientToken)
    return clientToken;
  };
  

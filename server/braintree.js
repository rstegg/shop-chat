const braintree = require('braintree');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'your_merchant_id',
  publicKey: 'your_public_key',
  privateKey: 'your_private_key'
});

// gateway.transaction.sale({
//   amount: '5.00',
//   paymentMethodNonce: 'nonce-from-the-client',
//   options: {
//     submitForSettlement: true
//   }
// }, function (err, result) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//
//   if (result.success) {
//     console.log('Transaction ID: ' + result.transaction.id);
//   } else {
//     console.error(result.message);
//   }
// });

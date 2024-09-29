var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');

var instance = new Razorpay({ key_id: 'rzp_test_8wJ8hJbfU6qm8H', key_secret: 'U9Iyp9JXpin4p3gsYUXeQJe4' })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId', (req, res, next)=>{
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    // res.send({orderId: order.id})
    res.send(order)
  });
})


router.post('/api/payment/verify', (req, res)=>{
  const razorpayOrderId= req.body.response.razorpay_order_id;
  const razorpayPaymentId= req.body.response.razorpay_payment_id;
  const signature= req.body.response.razorpay_signature;
  const secret='U9Iyp9JXpin4p3gsYUXeQJe4'
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);



})
module.exports = router;

// rzp_test_8wJ8hJbfU6qm8H
// U9Iyp9JXpin4p3gsYUXeQJe4
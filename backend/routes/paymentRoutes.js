const express = require("express");
const router = express.Router();
const paypalClient = require("../services/paypalService");
const paypal = require("@paypal/checkout-server-sdk");

router.post("/create-order", async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: { currency_code: "USD", value: req.body.amount }
      }]
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/capture-order", async (req, res) => {
  try {
    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

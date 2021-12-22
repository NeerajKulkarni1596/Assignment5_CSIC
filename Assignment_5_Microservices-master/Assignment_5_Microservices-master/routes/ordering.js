const router = require('express').Router();

const {
    orderList,
    orderDetailsWithId
} = require('../controllers/orderingController');

router.get('/customers/:customerId/orders/:orderId', orderDetailsWithId);
router.get('/customers/:customerId/orders', orderList);

module.exports = router;
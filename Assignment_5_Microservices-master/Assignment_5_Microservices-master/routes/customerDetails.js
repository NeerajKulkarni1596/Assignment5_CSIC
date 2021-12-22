const router = require('express').Router();

const {
    customerDetailsList,
    customerDetailsWithId
} = require('../controllers/customerController');


router.get('/customers/:customerId', customerDetailsWithId);
router.get('/customers', customerDetailsList);

module.exports = router;
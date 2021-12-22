const colors = require('colors');

const {
    customerDetailsListService,
    customerDetailsWithIdService
} = require('../services/custService');

const customerDetailsList = (req, res) => {
    let customerList = customerDetailsListService();
    console.log(new Date(), "Customer details list response:", colors.green(customerList));

    if (customerList.success) {
        res
        .status(201)
        .json(customerList);
    }
    else if (!customerList.success && customerList.message == 'No customer details present!') {
        res
        .status(404)
        .json(customerList);
    }
    else {
        res
        .status(400)
        .json(customerList);
    }
};

const customerDetailsWithId = (req, res) => {
    console.log(new Date(), "Customer ID:", req.params.customerId);

    let customerDetails = customerDetailsWithIdService(req.params.customerId);
    console.log(new Date(), "Customer Details by Id response:", colors.green(customerDetails));

    if (customerDetails.success) {
        res
        .status(201)
        .json(customerDetails);
    }
    else if (!customerDetails.success && customerDetails.message == 'No customer ID provided!' || customerDetails.message == 'No customer found with provided ID!') {
        res
        .status(404)
        .json(customerDetails);
    }
    else {
        res
        .status(400)
        .json(customerDetails);
    }
};

module.exports = {
    customerDetailsList,
    customerDetailsWithId
};
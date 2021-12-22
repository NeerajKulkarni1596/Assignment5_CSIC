const colors = require('colors');

const {
    orderListService,
    orderDetailsWithIdService
} = require('../services/orderingServices');

const orderList = (req, res) => {
    console.log(new Date(), "Customer ID:", req.params.customerId);

    let orderDataList = orderListService(req.params.customerId);
    console.log(new Date(), "Order list response:", colors.green(orderDataList));

    if (orderDataList.success) {
        res
        .status(201)
        .json(orderDataList);
    }
    else if (!orderDataList.success && orderDataList.message == 'No customer ID provided!' || orderDataList.message == 'No customer found with provided ID!' || orderDataList.message == 'No order list found!') {
        res
        .status(404)
        .json(orderDataList);
    }
    else {
        res
        .status(400)
        .json(orderDataList);
    }
};

const orderDetailsWithId = (req, res) => {
    console.log(new Date(), "Customer ID:", req.params.customerId);
    console.log(new Date(), "Order ID:", req.params.orderId);

    let orderData = orderDetailsWithIdService(req.params.customerId, req.params.orderId);
    console.log(new Date(), "Order Details by Id:", colors.green(orderData));

    if (orderData.success) {
        res
        .status(201)
        .json(orderData);
    }
    else if (!orderData.success && orderData.message == 'No customer ID provided!' || orderData.message == 'No order ID provided!' || orderData.message == 'No customer found with provided ID!' || orderData.message == 'No order list found!' || orderData.message == 'No order found with provided ID!') {
        res
        .status(404)
        .json(orderData);
    }
    else {
        res
        .status(400)
        .json(orderData);
    }
};

module.exports = {
    orderList,
    orderDetailsWithId
};
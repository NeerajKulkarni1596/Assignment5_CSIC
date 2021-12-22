const colors = require('colors');

// Function to validate order ID
const validateingOrderIdProvided = (orderId) => {
    console.log(new Date(), "Customer ID:", colors.yellow(orderId));

    if (!orderId) return {
        success: false,
        message: 'No order ID provided!'
    }

    return {
        success: true,
        message: 'Order ID provided!'
    }
}

module.exports = validateingOrderIdProvided;
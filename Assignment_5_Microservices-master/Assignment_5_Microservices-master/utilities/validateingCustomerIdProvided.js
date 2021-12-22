const colors = require('colors');

// Function to validate customer ID
const validateingCustomerIdProvided = (customerId) => {
    console.log(new Date(), "Customer ID:", colors.yellow(customerId));

    if (!customerId) return {
        success: false,
        message: 'No customer ID provided!'
    }

    return {
        success: true,
        message: 'Customer ID provided!'
    }
}

module.exports = validateingCustomerIdProvided;
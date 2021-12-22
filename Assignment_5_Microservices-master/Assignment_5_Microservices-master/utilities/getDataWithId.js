const colors = require('colors');

// Function to get customer or order data by it's ID
const getDataWithId = (keyword, id, data) => {

    let result = {};

    if (keyword == 'customer') {
        // Search for customer with provided ID from list of all customer
        let customerData = data.customers.find(customer => customer.customer_id == id);

        console.log(new Date(), "Details of customer with provided ID:", colors.blue(customerData));

        if (!customerData) return {
            success: false,
            message: 'No customer found with provided ID!'
        };

        result = customerData;
    }

    if (keyword == 'order') {
        // Search for order with provided ID from list of all order
        let orderData = data.find(order => order.order_id == id);

        console.log(new Date(), "Details of customer with provided ID:", colors.blue(orderData));

        if (!orderData) return {
            success: false,
            message: 'No order found with provided ID!'
        };

        result = orderData;
    }

    return {
        success: true,
        message: 'Data found!',
        data: result
    };
}

module.exports = getDataWithId;
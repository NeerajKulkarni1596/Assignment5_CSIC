const colors = require('colors');

// Function to validate if order list exist of customer exist
const validateingOrderListExist = (customerData) => {
    let customerOrderList = customerData.orders;

    console.log(new Date(), "Order list of the customer:", colors.green(customerOrderList));

    if (!customerOrderList.length) return {
        success: false,
        message: 'No order list found!'
    }

    return {
        success: true,
        message: 'Order list found!',
        data: customerOrderList
    }
}

module.exports = validateingOrderListExist;
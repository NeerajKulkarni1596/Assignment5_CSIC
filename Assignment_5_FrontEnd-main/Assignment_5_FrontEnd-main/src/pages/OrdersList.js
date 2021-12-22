import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RenderError from './RenderError';

const OrdersList = () => {
    const [state_ol, setState_ol] = useState(0);
    const { custId } = useParams();
    const [data_ol, setData_ol] = useState([]);
    const [customerID_ol, setCustomerID_ol] = useState("");
    const [errorMessage_ol, setErrorMessage_ol] = useState("");

    const orderListDisplay = (id) => axios({
        method: 'get',
        url: `http://localhost:8080/customers/${id}/orders`,
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const GetOrderList = (ID) => {
        orderListDisplay(ID)
            .then(response => {
                let data_ol = response.data;
                console.log("Data received:", data_ol);

                if (data_ol.success) {
                    setState_ol(1);
                    setData_ol(data_ol.data);
                    setCustomerID_ol(custId)
                }
                else {
                    setState_ol(2);
                    setErrorMessage_ol(data_ol.message);
                }
            })
    }

    const buildTable = (arr) => {
        const rows = arr.map((row) => {
            return (
                <tr key={parseInt(row.order_id)} style={{ backgroundColor: parseInt(row.order_id) % 2 ? '#F0FFF2' : 'white' }}>
                    <td>{row.product_name} </td>
                    <td>{row.category}</td>
                    <td>{row.product}</td>
                    <td>{row.cost}</td>
                    <td>{row.place}</td>
                    <td>{row.shipment === true ? "Yes" : "No"}</td>
                    <td>{row.purchase_date}</td>
                    <td>{row.delivery_date}</td>
                    <td>{row.delivery_status === true ? "Delivered" : "Not Delivered"}</td>
                </tr>
            )
        })

        return (
            <table cellPadding="5" cellSpacing="5">
                <tr>
                    <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>Orders list of customer with ID: {customerID_ol}</td>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Product Cost</th>
                    <th>Place of delivery</th>
                    <th>Product Shipped</th>
                    <th>Purchase Date</th>
                    <th>Delivery Date</th>
                    <th>Delivery Status</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        GetOrderList(custId);
    }, [])

    return (
        <div>
            {state_ol === 1 ? buildTable(data_ol) : <RenderError errorMsg={errorMessage_ol} />}
        </div>
    )
}

export default OrdersList;

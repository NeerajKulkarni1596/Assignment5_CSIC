import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import RenderError from './RenderError';

const OrderById = () => {
    const { cId, oId } = useParams();
    const [state, setState] = useState(0);
    const [data, setData] = useState({});
    const [orderId, setOrderId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const displaySelectedOrder = (cid, oid) => axios({
        method: 'get',
        url: `http://localhost:8080/customers/${cid}/orders/${oid}`,
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const functionToGetOrderDetails = (CID, OID) => {
        displaySelectedOrder(CID, OID)
            .then(response => {
                let data = response.data;
                console.log("Data received:", data);
                console.log('HTTP status:', data.success);

                if (data.success) {
                    setState(1);
                    setData(data.data);
                    setOrderId(data.data.order_id)
                }
                else {
                    setState(2);
                    console.log('This is being displayed:', data.message);
                    setErrorMsg(data.message);
                }
            })
    };

    const renderData = () => {
        return (
            <div>
                <table cellPadding="5">
                    <tr>
                        <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>
                            Details of order with ID: {orderId}
                        </td>
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
                        <td>{data.product_name} </td>
                        <td>{data.category}</td>
                        <td>{data.product}</td>
                        <td>{data.cost}</td>
                        <td>{data.place}</td>
                        <td>{data.shipment === true ? "Yes" : "No"}</td>
                        <td>{data.purchase_date}</td>
                        <td>{data.delivery_date}</td>
                        <td>{data.delivery_status === true ? "Delivered" : "Not Delivered"}</td>
                    </tbody>
                </table>
            </div>
        )
    };

    useEffect(() => {
        console.log("Customer Id:", cId, "Order Id:", oId);
        functionToGetOrderDetails(cId, oId);
    }, []);

    return (
        state === 1 ? (renderData()) : (<RenderError errorMsg={errorMsg}/>)
    )
}

export default OrderById;

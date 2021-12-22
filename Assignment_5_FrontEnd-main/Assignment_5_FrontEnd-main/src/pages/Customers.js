import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RenderError from './RenderError';

const Customers_nsk = () => {
    const [errorMessage_cus, setErrorMessage_cus] = useState("");
    const [state_nsk, setStae_cus] = useState(0);
    const [datFor_cus, setData_cus] = useState([]);

    const displayAllCustomers = () => axios({
        method: 'get',
        url: 'http://localhost:8080/customers',
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const customerDetails = () => {
        displayAllCustomers()
            .then(response => {
                let data = response.data;
                console.log("Data received:", data);

                if (data.success) {
                    setStae_cus(1);
                    setData_cus(data.data);
                }
                else {
                    setStae_cus(2);
                    setErrorMessage_cus(data.message);
                }
            })
    }

    const buildingTable = (arr) => {
        const rows = arr.map((row) => {
            return (
                <tr key={parseInt(row.customer_id)} style={{ backgroundColor: parseInt(row.customer_id) % 2 ? '#F0FFF2' : 'white' }}>
                    <td>{row.firstName} </td>
                    <td>{row.lastName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.emailAddress}</td>
                </tr>
            )
        })

        return (
            <table cellPadding="5" cellSpacing="5">
                <tr>
                    <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>Customers List</td>
                </tr>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        customerDetails();
    }, [])

    return (
        <div>
            {state_nsk === 1 ? buildingTable(datFor_cus) : <RenderError errorMessage_cus={errorMessage_cus} />}
        </div>
    )
}

export default Customers_nsk;
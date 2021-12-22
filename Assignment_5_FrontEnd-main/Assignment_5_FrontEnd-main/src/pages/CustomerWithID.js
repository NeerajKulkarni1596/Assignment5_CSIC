import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RenderError from './RenderError';

const CustomerWithID = () => {
    const { custId } = useParams();
    const [state_cbi, setstate_cbi] = useState(0);
    const [data_cbi, setData_cbi] = useState({});
    const [customerID_cbi, setCustomerID_cbi] = useState("");
    const [errorMessage_cbi, setErrorMessage_cbi] = useState("");

    const displayCustomerSelected = (id) => axios({
        method: 'get',
        url: `http://localhost:8080/customers/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const GetCustomerDetails = (ID) => {
        displayCustomerSelected(ID)
            .then(response => {
                let data_cbi = response.data;
                console.log("Data received:", data_cbi);

                if (data_cbi.success) {
                    setstate_cbi(1);
                    setData_cbi(data_cbi.data);
                    setCustomerID_cbi(data_cbi.data.customer_id)
                }
                else {
                    setstate_cbi(2);
                    setErrorMessage_cbi(data_cbi.message);
                }
            })
    }

    const dataRender = () => {
        return (
            <div>
                <table cellPadding="5">
                    <tr>
                        <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>
                            Details of customer with ID: {customerID_cbi}
                        </td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                    </tr>
                    <tbody>
                        <td>{data_cbi.firstName} </td>
                        <td>{data_cbi.lastName}</td>
                        <td>{data_cbi.phoneNumber}</td>
                        <td>{data_cbi.emailAddress}</td>
                    </tbody>
                </table>
            </div>
        )
    }

    useEffect(() => {
        GetCustomerDetails(custId);
    },[])

    return (
        state_cbi === 1 ? (dataRender()) : (<RenderError errorMessage_cbi={errorMessage_cbi}/>)
    )
};

export default CustomerWithID;

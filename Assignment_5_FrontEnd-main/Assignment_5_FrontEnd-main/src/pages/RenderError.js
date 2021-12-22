import React from 'react';

const renderingErrorMessage = ({ errorMsg }) => {
    return (
        <div style={{ padding: "10px", margin: "10px", justifyContent: "center", textAlign: "center" }}>{errorMsg}</div>
    )
};

export default renderingErrorMessage;
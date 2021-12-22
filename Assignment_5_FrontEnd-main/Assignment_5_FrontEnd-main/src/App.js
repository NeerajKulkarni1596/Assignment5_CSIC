import React from 'react';
import { Route } from 'react-router-dom';
import OrdersList from './pages/OrdersList';
import Home from './pages/Home';
import Customers_nsk from './pages/Customers';
import CustomerWithID from './pages/CustomerWithID';
import OrderById from './pages/OrderById';

const App = () => {
    return (
        <div>
            <Route path='/' exact component={Home}/>
            <Route path='/customers' exact component={Customers_nsk}/>
            <Route path='/customers/:custId' exact component={CustomerWithID}/>
            <Route path='/customers/:custId/orders' exact component={OrdersList} />
            <Route path='/customers/:cId/orders/:oId' component={OrderById} />
        </div>
    )
}

export default App;
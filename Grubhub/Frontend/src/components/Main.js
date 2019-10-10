import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import LoginForm from '../components/Login/login';
import CustomerSignUp from './Signup/customersignup'
import OwnerSignUp from './Signup/ownersignup';
import Account from './Update/Account/account';
// import Pastorders from './Orders/pastorders';
// import Upcomingorders from './Orders/upcomingorders'
import OwnerHome from './Update/home/Owner/ownerhome';
// import NewOrders from './Home/Owner/neworders';
// import PreparingOrders from './Home/Owner/preparingorders';
// import DeliveryOrders from './Home/Owner/deliveryorders';
// import PastOrders from './Home/Owner/pastorders';
import Menu from '../components/Signup/OwnerMenu/menu';
import EditItem from './Signup/OwnerMenu/edititem';
import EditSection from './Signup/OwnerMenu/editsection';

import restCard from '../components/Search/restCards';
import searchResults from '../components/Search/searchResults'
import RestaurantHome from '../components/Search/restaurants/restaurantHome'
import Cart from '../components/Search/cart/cart'
import PastOrders from '../components//Orders/userOrders/pastOrders'
import Home from '../components/Update/userhome/userhome'
import UpcomingOrders from '../components/Orders/userOrders/upcomingOrders'


class MainRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LoginForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/customersignup" component={CustomerSignUp} />
                <Route path="/ownersignup" component={OwnerSignUp} />
                <Route path="/account" component={Account} />
                {/* <Route path="/pastorders" component={Pastorders}/> */}
                {/* <Route path="/upcomingorders" component={Upcomingorders}/> */}
                <Route path="/ownerhome" component={OwnerHome} />
                {/* <Route path="/neworders" component={NewOrders}/> */}
                {/* <Route path="/preparing" component={PreparingOrders}/> */}
                {/* <Route path="/delivery" component={DeliveryOrders}/> */}
                {/* <Route path="/ownerpastorders" component={PastOrders}/> */}
                <Route path="/menu" component={Menu} />
                <Route path="/edititem" component={EditItem} />
                <Route path="/editsection" component={EditSection} />
                {/* abhilash */}
                <Route path="/userhome" component={Home} />
                <Route path="/restcard" component={restCard} />
                <Route path="/searchresults" component={searchResults} />
                {/* <Route path="/testcss" component={Testcss} /> */}
                <Route path="/resthome" component={RestaurantHome} />
                <Route path="/cart" component={Cart} />
                <Route path="/pastorders" component={PastOrders} />
                <Route path="/upcomingorders" component={UpcomingOrders} />
            </div>
        )
    }
}

export default MainRoutes;
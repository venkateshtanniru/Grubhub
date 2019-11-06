import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import Navbar from '../Navbar/navbar'
import { Link } from 'react-router-dom';
import rooturl from '../config/settings';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import './new.css'

class OwnerInbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageContent: "",
            messages: [],
            messageResult: [],
            redirectToHome: false
        }
    }
 
    
    componentWillMount() {

        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        var data = {


        };
        //console.log('component did mount');
        axios.post('http://'+rooturl+':3001/get-messages/', data)
            .then(response => {
                if (response.status === 200) {
                    //console.log(response.data);
                    this.setState({
                        messageResult: response.data
                    });
                    console.log('messages', this.state.messageResult);
                }
            });
    }

    handleClick(){
        swal("Successful","Message Sent!", "success")
    }


    render() {

        let redirectVar = null;
        if(localStorage.getItem("jwt")===null)  {
            redirectVar = <Redirect to="/login" />
        }
       
        return (
            <div>
                {redirectVar}
                <Navbar />
                <div className="row">
                    <div className="col-md-3">
                        <h3 className="font-weight-bold">Order ID:{localStorage.getItem("orderId")}</h3>
                        <h3 className="font-weight-bold">Restaurant Id:{localStorage.getItem("Restaurant")}</h3>
                        {/* <div class="temp">
                        <p>Need Extra Sauce</p>
                        </div> */}
                        <input type="text" placeholder="Reply"/>
                        <button class="button" type="submit" onClick={this.handleClick()}>Reply</button>                           
                    </div>
        
                </div>
            </div>
                
        );
    }

}

//export default OwnerInbox;

const mapStateToProps = state => ({
    loginStateStore : state.login
})

//export default Profile;
export default connect(mapStateToProps, {})(OwnerInbox);
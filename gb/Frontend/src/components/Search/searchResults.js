import React, { Component, PureComponent } from 'react';
import Navbar from '../Navbar/navbar';
import RestCard from './restCards';
import LeftPanel from './leftPanel';
import './cardstyles.css'
import { Redirect } from 'react-router-dom'
import rootUrl from '../config/settings';
import cookie from 'react-cookies';
import './cardstyles.css';
import { connect } from 'react-redux'
import { vRestaurant, cRestaurant }from'../../actions'
import { reduxForm } from 'redux-form'
import { array } from 'prop-types';




class searchResults extends Component {
    constructor() {
        super()
        this.state = {
            restSearchResults: "",
            restCuisineResults: "",
            uniquecuisines: "",
            currentPage: 1,
            todosPerPage: 3
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    componentDidMount() {
        if (localStorage.getItem("restaurantResults")) {
            let restResultsBySearch = localStorage.getItem("restaurantResults")
            let restDetails = JSON.parse(restResultsBySearch);
            this.setState({

                restSearchResults: restDetails
            })
            console.log(restDetails)
        }
        let cuisineDetails = JSON.parse(localStorage.getItem("restaurantResults"));
        let lookup = {};
        let items = cuisineDetails;
        let result = [];

        for (let item, i = 0; item = items[i++];) {
            let itemtype = item.cuisineName;

            if (!(itemtype in lookup)) {
                lookup[itemtype] = 1;
                result.push(itemtype);
            }
        }
        console.log(result)
        result.sort()
        this.setState({
            uniquecuisines : result
        })
        if (localStorage.getItem("restCuisineDetails")) {
            let restResultsBySearch = localStorage.getItem("restCuisineDetails")
            let restDetails = JSON.parse(restResultsBySearch);
            this.setState({

                restCuisineResults: restDetails
            })
        }
    }


    visitRestaurant = (restId) => {
        console.log("in VisitRestaurant method");
        console.log(restId)
        localStorage.setItem("Restaurant",restId)

        const data = {
            restId: restId,
            userEmail: localStorage.getItem('userEmail')
        }
        this.props.vRestaurant(data, response => {
                console.log(response)
                if (response.status === 200) {
                    let itemDetails = JSON.stringify(response.data)
                    console.log(response.data);

                    localStorage.setItem('itemsByRestaurant', itemDetails)
                    console.log("itemDetails:" + typeof itemDetails)
                    this.props.history.push('/resthome')
                }
                else {
                    console.log("Didn't fetch items data")
                }
            })

    }
    visitCuisine = (cuisineName) => {
        //e.preventDefault()
        console.log("in VisitCuisine method");
        console.log(cuisineName);

        //console.log(copyResults[id])
        let itemName = localStorage.getItem("itemName")
        const data = {
            cuisineName: cuisineName,
            itemName: itemName,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log(data)
        if (data.cuisineName) {
            this.props.cRestaurant(data, response => {
                    console.log(response)
                    if (response.status === 200) {
                        let restCuisineDetails = JSON.stringify(response.data)
                        console.log(response.data);

                        localStorage.setItem('restCuisineDetails', restCuisineDetails)
                        console.log("itemDetails:" + restCuisineDetails)
                        window.location.reload();
                        // this.props.history.push('/searchresults')
                    }
                    else {
                        console.log("Didn't fetch items data")
                    }
                })
        }
        else {
            alert("Please try again")
        }
    }


//    nextpage= (i)=>{
//     if (localStorage.getItem("restaurantResults")) {
//         let restResultsBySearch = localStorage.getItem("restaurantResults")
//         let restDails = JSON.parse(restResultsBySearch);
//         var newArr = [];
//         while(restDails.length) newArr.push(restDails.splice(0,2));
//         let restDetails=newArr[i]
//         this.setState({

//             restSearchResults: restDetails
//         })
//         console.log(restDetails)
//     }
          
//    }
//    prevpage= (i)=>{
//     if (localStorage.getItem("restaurantResults")) {
//         let restResultsBySearch = localStorage.getItem("restaurantResults")
//         let restDails = JSON.parse(restResultsBySearch);
//         var newArr = [];
//         while(restDails.length) newArr.push(restDails.splice(0,2));
//         let restDetails=newArr[i-1]
//         this.setState({

//             restSearchResults: restDetails
//         })
//         console.log(restDetails)
//     }
          
//    }




    render() {
        const {currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        
        let redirectVar = null;
           if(localStorage.getItem("jwt")===null)  {
            redirectVar = <Redirect to="/login" />
        }
        let route=null;
        if (this.state.restCuisineResults) {
            route = this.state.restCuisineResults
            localStorage.removeItem("restCuisineDetails")
        }
        else if (this.state.restSearchResults) {
            route = this.state.restSearchResults;
        }
        let currentTodos=null;
        let pageNumbers=[];
        if(route){
            console.log('route', route[0])
            currentTodos = route.slice(indexOfFirstTodo, indexOfLastTodo);    
            for (let i = 1; i <= Math.ceil(route.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
        }
        
        // array.fr om
        console.log('arr',typeof([1,2,3]))
        console.log([1,2,3,4,5,6,7,8,9,0].splice(indexOfFirstTodo, indexOfLastTodo))
        
        if (currentTodos) {
            const restCards = currentTodos.map((restaurant, index) => {
                return (
                    <RestCard
                        key={restaurant.restId}
                        restIndividual={restaurant}
                        visitRest={this.visitRestaurant.bind(this)}
                    />
                )
            })

            let cuisinePanel = this.state.uniquecuisines.map((cuisine, ind) => {
                return (
                    <LeftPanel
                        key={cuisine}
                        cuisineIndividual={cuisine}
                        visitCuisine={this.visitCuisine.bind(this)}
                    />
                )
            })

            const renderPageNumbers = pageNumbers.map(number => {
                return (
                    <button class="button" key={number} id={number} onClick={this.handleClick} >{number}</button>

                //   <li
                //     key={number}
                //     id={number}
                //     onClick={this.handleClick}
                //   >
                //     {number}
                //   </li>
                );
              });
            return (
                <div>
                    {redirectVar}
                    <Navbar />
                    <div>
                        <div className="restLeft" id="left">
                            <div className="list-group">
                                {cuisinePanel}
                            </div>
                        </div>
                        <div id="right">
                            <div id="search-results-text"><p><b>Your Search Results</b></p></div>
                            
                            <div className="card-group" >
                                {restCards}
                            </div>
                            <ul id="page-numbers">
                                {renderPageNumbers}
                            </ul>
                        </div>
                    </div>
             </div>
            );
        }
        
        else {
            return (
                <div>
                    <Navbar />
                    {redirectVar}
                    <h3>No Items found. </h3>
                </div>
            );
        }
    }
}



function mapStateToProps (state) {
    return {
      user: state.user
    }
  }
  
  // export default connect( mapStateToProps , {getProfile: getProfile, getUserImage:getUserImage})(Search);
  
  export default connect(
    mapStateToProps,
    { vRestaurant, cRestaurant }
  )(
    reduxForm({
      form: 'streamSearch'
      // validate: validate
    })(searchResults)
  )

import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Stack } from "react-bootstrap"
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../config';
import Collapse from 'react-bootstrap/Collapse';



class CustomerOrders extends Component {
    constructor(props) {
        super(props)

        this.computeTotal = this.computeTotal.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.onCheckFulfilled = this.onCheckFulfilled.bind(this);
        this.onCheckUnfulfilled = this.onCheckUnfulfilled.bind(this);
        this.getFilteredOrders = this.getFilteredOrders.bind(this);
        this.displayFilteredOrders = this.displayFilteredOrders.bind(this);
        this.state = {
            orders: [],
            filteredOrders: [],
            filterByFulfilled: false,
            filterByUnfulfilled: false,
            isOpen: false
        }
    }

    componentDidMount() {
        //find all orders purchased by users
        axios.get(config.backend + '/orders/')
            .then(res => {
                console.log("user orders: " + JSON.stringify(res.data) + "\n");
                console.log(res.data);
                this.setState({orders: res.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async onCheckFulfilled() {
        await this.setState({ filterByFulfilled: !(this.state.filterByFulfilled) });
        //check that both filters aren't applied simultaneously
        if (this.state.filterByFulfilled === true && this.state.filterByUnfulfilled === true) {
            this.setState({ filterByUnfulfilled: !(this.state.filterByUnfulfilled) });
        }
    }

    async onCheckUnfulfilled() {
        await this.setState({ filterByUnfulfilled: !(this.state.filterByUnfulfilled) });
        //check that both filters aren't applied simultaneously
        if (this.state.filterByFulfilled === true && this.state.filterByUnfulfilled === true) {
            this.setState({ filterByFulfilled: !(this.state.filterByFulfilled) });
        }
    }

    /*
    getPurchasedBy(userID){
        console.log(userID);

        axios.get(config.backend + '/users/' + userID)
            .then(res => {
                console.log("purchasedBy: ");
                console.log(res.data);
                console.log(res.data.email);
                return res.data.email;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    */

    computeTotal(order) {
        //retrieve array of products
        console.log("Compute total");
        console.log(JSON.stringify(order))

        let total = 0;
        const products = order.products
        for (let i = 0; i < products.length; i++) {
            let subtotal = (products[i].itemCount * products[i].productPrice) * 1.13
            total += subtotal;
            console.log(total)
        }
        return total;
    }

    clearFilters() {
        this.setState({ 
          filterByFulfilled: false,
          filterByUnfulfilled: false
        });
    }
    
    getFilteredOrders(){
        return this.state.orders.filter((order) => {
            console.log("filterOrder: " + order)
            if(this.state.filterByFulfilled && order.isFulfilled === true){
                return order
            }
            else if (this.state.filterByUnfulfilled && order.isFulfilled === false){
                return order
            }
        })
    }

    displayFilteredOrders(){
        return this.getFilteredOrders().map((order, i) => {
            let date = new Date(order.transactionDate);
            return (
                <tr key={i}>
                    <td>{order._id}</td>
                    <td>{order.purchasedBy._id}</td>
                    <td>{date.toString()}</td>
                    <td>$ {(this.computeTotal(order)).toFixed(2)}</td>
                    <td>
                        <Link to={{ pathname: '/OrderDetails/' + order._id }}>
                            View Details
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="d-flex justify-content-right align-items-center m-5">
                <Stack direction="vertical" gap={2}>
                    <div>
                        <h1>Customer Orders</h1>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <Button
                            size="sm"
                            className="filter-button"
                            variant="outline-dark"
                            onClick={() => this.setState({ isOpen: !(this.state.isOpen) })}
                            aria-controls="collapse-text"
                            aria-expanded={this.state.isOpen}>
                            Filter Orders
                        </Button>
                    </div>

                    <Collapse in={this.state.isOpen}>
                        <div id="collapse-text" >
                            <Form className="d-flex justify-content-right">
                                <Stack direction="vertical" gap={1}>
                                    <div className="d-inline-flex">
                                        <p style={{ paddingRight: '25px', fontWeight: 'bold' }}>Order Type:</p>
                                        <Form.Check inline
                                        label="Fulfilled"
                                        type="checkbox"
                                        onClick={this.onCheckFulfilled}
                                        checked={this.state.filterByFulfilled}
                                        />
                                        <Form.Check inline
                                        label="Unfulfilled"
                                        type="checkbox"
                                        onClick={this.onCheckUnfulfilled}
                                        checked={this.state.filterByUnfulfilled}
                                        />
                                    </div>
                                    <Button  
                                        className="d-flex justify-content-start p-0 m-0" 
                                        variant="link" 
                                        onClick={() => this.clearFilters()}>
                                        Clear All Filters
                                    </Button>
                                </Stack>
                            </Form>
                        </div>
                    </Collapse>

                    <hr style={{ border: '2px solid SlateGray' }}></hr>

                    <div>
                        
                        <Table responsive="md">
                            <thead>
                                <tr>
                                    <th className='text-muted'>Order Number</th>
                                    <th className='text-muted'>Customer ID</th>
                                    <th className='text-muted'>Placed On</th>
                                    <th className='text-muted'>Total Cost</th>
                                    <th>&emsp;&emsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we want to display a row of order information for every order*/}
                                {this.state.orders.length !== 0 && this.state.filterByFulfilled === false && this.state.filterByUnfulfilled === false ?
                                    Object.values(this.state.orders).map((order) => {
                                        const date = new Date(order.transactionDate);
                                        return (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.purchasedBy._id}</td>
                                                <td>{date.toString()}</td>
                                                <td>$ {(this.computeTotal(order)).toFixed(2)}</td>
                                                <td>
                                                    <Link to={{ pathname: '/OrderDetails/' + order._id }}>
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <>
                                        {(this.state.filterByFulfilled === true || this.state.filterByUnfulfilled === true) && (this.getFilteredOrders()).length !== 0 ? 
                                            <> 
                                            {this.displayFilteredOrders()} 
                                            </>
                                            :
                                            <>
                                            {this.state.orders.length === 0 ?
                                                <td colSpan={4} className='p-3'>
                                                <h4 className='text-muted m-3'>There are no previous customer orders ...</h4>
                                                </td>
                                                :
                                                <td colSpan={4} className='p-3'>
                                                <h4 className='text-muted m-3'>There are no matching customer orders ...</h4>
                                                </td>
                                            }
                                            </>
                                        }
                                    </>
                                }
                            </tbody>
                        </Table>
                    </div>
                </Stack>
            </div>
        )
    }
}

export default CustomerOrders
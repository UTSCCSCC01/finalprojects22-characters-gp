import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Stack } from "react-bootstrap"
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../config';


class OrderHistory extends Component {
    constructor(props) {
        super(props)

        this.computeTotal = this.computeTotal.bind(this);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        //find all orders purchased by User
        console.log(config.backend + '/orders/?purchasedBy=' + this.props.match.params.id)
        axios.get(config.backend + '/orders/?purchasedBy=' + this.props.match.params.id)
            .then(res => {
                //const orders = res.data;
                console.log("retrieved all users orders: " + JSON.stringify(res.data))
                //console.log("orders format: " + orders);
                console.log(res.data)
                this.setState({ orders: res.data })
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("this is orders:" + this.state.orders)
    }

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

    render() {
        return (
            <div className="d-flex justify-content-right align-items-center m-5">
                <Stack direction="vertical" gap={3}>
                    <div>
                        <h1>Order History</h1>
                    </div>

                    <div>
                        <Table responsive="md">
                            <thead>
                                <tr>
                                    <th className='text-muted'>Order Number</th>
                                    <th className='text-muted'>Placed On</th>
                                    <th className='text-muted'>Total Cost</th>
                                    <th>&emsp;&emsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we want to display a row of order information for every order that the user has*/}
                                {console.log("this is orders:" + this.state.orders)}
                                {this.state.orders !== [] ?
                                    Object.values(this.state.orders).map((order) => {
                                        const date = new Date(order.transactionDate);
                                        return (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
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
                                    <td colSpan={4} className='p-3'>
                                        <h4 className='text-muted'>Your have no previous orders ...</h4>
                                    </td>
                                }
                            </tbody>
                        </Table>
                    </div>
                </Stack>
            </div>
        )
    }
}

export default OrderHistory
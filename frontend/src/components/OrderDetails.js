import OrderDetailsItem from "./OrderDetailsItem";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import React, { Component } from "react";
import axios from 'axios';
import config from '../config'

/*
const getOrderId = () => {
  const location = useLocation()
  const { orderId } = location.state
}
*/

class OrderDetails extends Component {
    constructor(props) {
        super(props)

        this.onBack = this.onBack.bind(this);
        this.state = {
            transactionDate: '',
            products: [],
            billingInfo: {},
            shippingInfo: {},
            subtotal: 0,
            total: 0,
            tax: 0
        }
    }

    componentDidMount() {
        if(localStorage.getItem("user") === null){
            this.props.history.push({ pathname: '/login' })
        } else {
            axios.get(config.backend + '/orders/' + this.props.match.params.id)
                .then(res => {
                    this.setState({
                        ...res.data, transactionDate: new Date(res.data.transactionDate).toString(),
                        tax: res.data.subtotal * 0.13,
                        total: res.data.subtotal * 1.13
                    })
                    console.log(res.data)
                    console.log(this.state.shippingInfo.firstName)
                })
        }

    }

    onBack() {
        this.props.history.goBack();
    }

    render() {
        const userType = JSON.parse(localStorage.getItem("user")).type
        //console.log("userType: " + userType);
        return (
            <Container fluid>
                <Row>
                    <Col md={2} className="my-4">
                        <Button onClick={this.onBack} size="md" variant="light">&#60;&#60; Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="d-flex justify-content-center">
                        <div className="d-flex flex-column p-3">
                            <div className="d-inline-flex justify-content-center">
                                <h3 className="d-flex">Order #: </h3>
                                <h5 className="text-muted m-2">{this.props.match.params.id}</h5>
                            </div>
                            <div className="d-inline-flex">
                                {userType !== 3 ?
                                    <h3>Your order was placed on:</h3>
                                    :
                                    <h3>The order was placed on:</h3>
                                }
                                <h5 className="text-muted m-2">{this.state.transactionDate}</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="mb-4">
                    <Col md={12} className="d-flex-column">
                        <h4 className="d-flex justify-content-start m-3 p-1" style={{backgroundColor:"lightgrey"}}>Shipping Information</h4>
                        <div className="border border-light border-3 p-3">
                            <p className="d-flex justify-content-start">Shipping Address: </p>
                            <p className="d-flex justify-content-start">{this.state.shippingInfo.firstName} {this.state.shippingInfo.lastName}</p>
                            <p className="d-flex justify-content-start">{this.state.shippingInfo.address}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={12} className="d-flex-column">
                        <h4 className="d-flex justify-content-start m-3 p-1" style={{backgroundColor:"lightgrey"}}>Billing Information</h4>
                        <div className="d-flex border border-light border-3 p-3">
                            <Col md={6}>
                                <p className="d-flex justify-content-start">Billing Address: </p>
                                <p className="d-flex justify-content-start">{this.state.billingInfo.firstName} {this.state.billingInfo.lastName}</p>
                            <p className="d-flex justify-content-start">{this.state.billingInfo.address}</p>
                            </Col>
                            <Col md={6}>
                                <p className="d-flex justify-content-start">Payment Method: </p>
                                <p className="d-flex justify-content-start">{this.state.billingInfo.paymentMethod}</p>
                            </Col>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h4 className="d-flex justify-content-right m-3 p-1" style={{backgroundColor:"lightgrey"}}>Order Summary</h4>
                        <div className="d-flex-inline justify-content-center">
                            <Row>
                                <Col md={6}>Item <hr></hr></Col>
                                <Col>Price <hr></hr> </Col>
                                <Col>Quantity <hr></hr> </Col>
                                <Col>Subtotal <hr></hr> </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {Object.values(this.state.products).map((item) =>
                            <OrderDetailsItem
                                key={item.pid}
                                {...item}
                                itemCount={item.itemCount}
                            />
                    )}
                </Row>
                <Row>
                    <Card bg='light-grey' className='h-100 mb-4'>
                        <Card.Body className="d-inline-flex">
                                    <Col md={9}/>
                                    <Col md={3} className="d-flex-column pt-1">
                                        <h5 className="d-flex justify-content-start">Subtotal: ${this.state.subtotal.toFixed(2)}</h5>
                                        <h5 className="d-flex justify-content-start">Tax: ${this.state.tax.toFixed(2)}</h5>
                                        <hr></hr>
                                        <h5 className="d-flex justify-content-start">Total: ${this.state.total.toFixed(2)}</h5>
                                    </Col>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }
}

export default OrderDetails
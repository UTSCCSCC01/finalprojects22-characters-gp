import ShoppingCartItem from './ShoppingCartItem'
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';

import mockProducts from "./mockProducts.json";

class ShoppingCart extends Component {
    constructor() {
        super()
        this.handleCheckout = this.handleCheckout.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.updatePriceSummary = this.updatePriceSummary.bind(this);
        localStorage.setItem("cartProducts", JSON.stringify(mockProducts));
        this.state = {
            subtotal: 0.00,
            tax: 0.00,
            total: 0.00,
            itemCount: 0,
            cartProducts: JSON.parse(localStorage.getItem("cartProducts"))
        }
    }

    getItemCount(){

    }

    handleCheckout() {
        //if the cart is empty, then checkout should create a popup message 
    }
    updateCart(pid, increment, callback) {
        this.setState({
            cartProducts: { ...this.state.cartProducts, [pid]: { ...this.state.cartProducts[pid], quantity: this.state.cartProducts[pid].quantity + (increment ? 1 : -1) } }
        }, callback)
        localStorage.setItem("cartProducts", JSON.stringify(this.state.cartProducts));
        //if item doesn't exist in the 
        this.setState((state) => {
            return { itemCount: state.itemCount + (increment ? 1 : -1) }
        });
    }

    //this function is being called by ShoppingCartItem child component
    updatePriceSummary(itemPrice) {
        //update Tax (after total has been computed)
        this.updateTotal(itemPrice);
    }
    updateTotal(itemPrice) {
        this.setState((state) => {
            return {
                subtotal: state.subtotal + itemPrice,
                tax: (state.subtotal + itemPrice) * 0.13,
                total: (state.subtotal + itemPrice) * 1.13,
            }
        });
    }

    render() {
        return (
            <Container fluid>
                <Row style={{ padding: "5% 0%" }}>

                    <Col id="cartSummary" md={8}>
                        <Stack direction="horizontal" gap={2}>
                            <h1>My Cart: </h1>
                            <h4 className='text-muted'>{this.state.itemCount} items</h4>
                        </Stack>
                        <hr style={{border:'10px solid SlateGray'}}></hr>
                        <Row >
                            <Col md={6}>Item <hr></hr></Col>
                            <Col>Price <hr></hr> </Col>
                            <Col>Quantity <hr></hr> </Col>
                            <Col>Subtotal <hr></hr> </Col>
                        </Row>
                        <Stack direction='vertical' gap={2}>
                            {//create a card for every Item in the json object
                                Object.values(this.state.cartProducts).map((item) =>
                                    <ShoppingCartItem
                                        key={item.pid}
                                        {...item}
                                        updateCart={this.updateCart}
                                        updatePriceSummary={this.updatePriceSummary}
                                    />
                                )
                            }
                        </Stack>
                    </Col>

                    <Col id="totalSummary" md={4}>
                        <Card>
                            <div style={{ padding: "10%" }}>
                                <div id="summaryInfo"
                                    style={{
                                        padding: "5% 5% 10% 5%",
                                        textAlign: "left",
                                    }}>
                                    <h3>Summary</h3>
                                    <hr></hr>
                                    <h6 className='text-muted'>Subtotal: ${this.state.subtotal.toFixed(2)} </h6>
                                    <h6 className='text-muted'>Est. Tax: ${this.state.tax.toFixed(2)}</h6>
                                    <hr></hr>
                                    <h5>Total: ${this.state.total.toFixed(2)}</h5>
                                </div>
                                <Button id="checkout" className='w-100' variant="primary" size="lg"
                                    onClick={e => { this.state.itemCount === 0 ?
                                            alert("Add items to your cart before proceeding to checkout.")
                                            :
                                            this.handleCheckout()
                                    }}>
                                    Checkout
                                </Button>
                            </div>
                        </Card>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default ShoppingCart;
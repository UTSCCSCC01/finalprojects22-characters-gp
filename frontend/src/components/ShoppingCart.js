import ShoppingCartItem from './ShoppingCartItem'
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';

class ShoppingCart extends Component {
    constructor() {
        super()
        this.updateTotal = this.updateTotal.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.updatePriceSummary = this.updatePriceSummary.bind(this);
        this.getInitialValues = this.getInitialValues.bind(this);

        //localStorage.setItem("cartProducts", JSON.stringify(mockProducts));

        this.state = {
            subtotal: 0.00,
            tax: 0.00,
            total: 0.00,
            itemCount: 0,
            cartProducts: JSON.parse(localStorage.getItem("cartProducts"))
        }
    }

    componentDidMount() {
        let [count, subtotal] = this.getInitialValues()
        console.log('c, sub:', count, subtotal)
        this.setState((state) => {
            return {
                itemCount: count,
                subtotal: subtotal,
                tax: subtotal * 0.13,
                total: subtotal * 1.13
            }
        })
    }

    //initialize state values
    getInitialValues() {
        if (this.state.cartProducts === null) { return [0, 0] }

        let count = 0;
        let subtotal = 0;
        Object.values(this.state.cartProducts).forEach((item) => {
            count += item.quantity
            subtotal += item.price * item.quantity
        });
        return [count, subtotal];
    }

    updateCart(pid, newQuantity, callback) {
        let newCartItem = this.state.cartProducts[pid]
        let oldQuantity = newCartItem.quantity
        newCartItem.quantity = newQuantity
        newCartItem = newCartItem.quantity === 0 ? null : newCartItem
        this.setState(state => {
            {
                const copy = { ...state }
                if (newCartItem === null)
                    delete copy.cartProducts[pid]
                else
                    copy.cartProducts[pid] = newCartItem
                return copy
            }
        }, () => {
            callback()
            localStorage.setItem("cartProducts", JSON.stringify(this.state.cartProducts));
            this.setState((state) => {
                return { itemCount: state.itemCount + (newQuantity - oldQuantity) }
            });
        })
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
                        <hr style={{ border: '10px solid SlateGray' }}></hr>
                        <Row >
                            <Col md={6}>Item <hr></hr></Col>
                            <Col>Price <hr></hr> </Col>
                            <Col>Quantity <hr></hr> </Col>
                            <Col>Subtotal <hr></hr> </Col>
                        </Row>
                        <Stack direction='vertical' gap={2}>
                            {//create a card for every Item in the json object
                                this.state.cartProducts !== null && Object.keys(this.state.cartProducts).length !== 0 ?
                                    Object.values(this.state.cartProducts).map((item) =>
                                        <ShoppingCartItem
                                            key={item.pid}
                                            {...item}
                                            updateCart={this.updateCart}
                                            updatePriceSummary={this.updatePriceSummary}
                                        />
                                    )
                                    :
                                    <h4 className='text-muted'>Your cart is empty ...</h4>
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
                                    <h6 className='text-muted'>Subtotal: ${(Math.abs(this.state.subtotal)).toFixed(2)} </h6>
                                    <h6 className='text-muted'>Est. Tax: ${(Math.abs(this.state.tax)).toFixed(2)}</h6>
                                    <hr></hr>
                                    <h5>Total: ${(Math.abs(this.state.total)).toFixed(2)}</h5>
                                </div>
                                <Button id="checkout" className='w-100' variant="primary" size="lg"
                                    onClick={e => {
                                        this.state.itemCount === 0 ?
                                            alert("Add items to your cart before proceeding to checkout.")
                                            :
                                            alert("You have been redirected to the checkoutPage.")
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
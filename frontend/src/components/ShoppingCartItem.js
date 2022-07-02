import axios from 'axios';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';


class ShoppingCartItem extends Component {
    constructor(props) {
        super(props)
        this.updateSubtotal = this.updateSubtotal.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.state = {
            //initialize whatever the passed values are
            pid: props.pid,
            name: props.name,
            description: props.description,
            price: props.price,
            subtotal: props.price * this.props.quantity
        }
    }

    updateSubtotal() {
        this.setState({ subtotal: this.props.quantity * this.state.price });
        console.log(this.state.price);
        console.log(this.state.subtotal);
    }

    //update the quantity field in the JSON obj stored in localStorage, as well as the props 
    updateQuantity(incrementQuantity) {
        this.props.updateCart(this.state.pid, incrementQuantity, this.updateSubtotal)
    }

    onIncrement(e) {
        e.preventDefault();
        console.log("iterate start")
        this.updateQuantity(true);
        this.props.updatePriceSummary(this.state.price);
        console.log("iterate end")
    }

    onDecrement(e) {
        e.preventDefault();
        console.log("iterate start")
        this.updateQuantity(false);
        this.props.updatePriceSummary(-(this.state.price));
        console.log("iterate end")
    }

    removeItem(e) {
        e.preventDefault();


    }

    render() {
        const infoDiv= {
            display:'flex',
            flexFlow: 'column',
            height: '100%',
            justifyContent: 'center'}

        return (
            <Card bg='light' className='h-100'>
                <Row>

                    <Col id='item' md={6}>
                        <div className='m-1'>
                            <Row>
                                <Col md={6}> 
                                    <Card.Img height='200px' style={{backgroundColor:'red'}}>
                                    </Card.Img>
                                </Col>
                                <Col md={6}>
                                    <div style={infoDiv}>
                                        <h6><b>{this.state.name}</b></h6>
                                        <p>{this.state.description}</p>
                                    </div>
                                </Col>
                            </Row>          
                        </div>
                    </Col>

                    <Col id='price' md={2}>
                        <div className='m-1' style={infoDiv}> ${this.state.price.toFixed(2)} </div>
                    </Col>

                    <Col id='quantity' md={2}> 
                        <div className='m-1' style={infoDiv}>
                        <div className='d-flex align-items-center flex-column' style={{ gap: '.5rem'}}>
                            <div className='d-flex align-items-center justify-content-center' style={{ gap: '.5rem'}}>
                                <Button variant='secondary' size='sm' onClick={this.onDecrement}>-</Button>
                                    <div className='fs-3'> 
                                        <p style={{fontSize:'large'}}> {this.props.quantity}</p> 
                                    </div>
                                <Button variant='secondary' size='sm' onClick={this.onIncrement}>+</Button>
                            </div>
                            <Button variant='danger' size='sm' onClick={this.removeItem}>remove</Button>
                        </div>
                        </div>
                    </Col>

                    <Col id='subtotal' md={2}> <div className='m-1' style={infoDiv}> ${this.state.subtotal.toFixed(2)} </div>
                    </Col>

                </Row>
            </Card>
        )
    
    }
}

export default ShoppingCartItem;
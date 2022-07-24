import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import config from '../config';
import axios from 'axios';

class OrderDetailsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subtotal: 0
        }
    }

    componentDidMount() {
        this.setState({ subtotal: this.props.productPrice * this.props.itemCount })
    }


    render() {
        const infoDiv = {
            display: 'flex',
            flexFlow: 'column',
            height: '100%',
            justifyContent: 'center'
        }

        return (
            <Card bg='light' className='h-100 mb-2'>
                <Row>
                    <Col id='item' md={6}>
                        <div className='m-1'>
                            <Row>
                                <Col md={6}>
                                    <Card.Img height='200px'
                                        src={`~/../../uploads/${this.props.productImage}`}
                                        style={{ backgroundColor: 'red' }}>
                                    </Card.Img>
                                </Col>
                                <Col md={6}>
                                    <div style={infoDiv}>
                                        <h6><b>{this.props.productName}</b></h6>
                                        <p>{this.props.productDescription}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col id='price' md={2}>
                        <div className='m-1' style={infoDiv}> ${this.props.productPrice.toFixed(2)} </div>
                    </Col>

                    <Col id='quantity' md={2}>
                        <div className='m-1' style={infoDiv}>
                            <div className='d-flex align-items-center flex-column' style={{ gap: '.5rem' }}>
                                <p className="mb-0" style={{ fontSize: 'large' }}> {this.props.itemCount}</p>
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

export default OrderDetailsItem
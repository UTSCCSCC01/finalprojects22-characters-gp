import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import { Stack } from "react-bootstrap"
import { Alert } from "react-bootstrap"
import axios from 'axios';
import config from '../config'

class Checkout extends Component {
    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
        this.updateShippingFirstName = this.updateShippingFirstName.bind(this);
        this.updateShippingLastName = this.updateShippingLastName.bind(this);
        this.updateShippingAddress = this.updateShippingAddress.bind(this);
        this.updateBillingFirstName = this.updateBillingFirstName.bind(this);
        this.updateBillingLastName = this.updateBillingLastName.bind(this);
        this.updateBillingAddress = this.updateBillingAddress.bind(this);
        this.updatePaymentMethod = this.updatePaymentMethod.bind(this);
        this.state = {
            checkoutSuccess: false,
            shippingFirstName: '',
            shippingLastName: '',
            shippingAddress: '',
            billingFirstName: '',
            billingLastName: '',
            billingAddress: '',
            paymentMethod: ''
        }
    }

    updateShippingFirstName(e){
        this.setState({ shippingFirstName: e.target.value })
    }
    updateShippingLastName(e){
        this.setState({ shippingLastName: e.target.value })
    }
    updateShippingAddress(e){
        this.setState({ shippingAddress: e.target.value })
    }
    updateBillingFirstName(e){
        this.setState({ billingFirstName: e.target.value })
    }
    updateBillingLastName(e){
        this.setState({ billingLastName: e.target.value })
    }
    updateBillingAddress(e){
        this.setState({ billingAddress: e.target.value })
    }
    updatePaymentMethod(e){
        this.setState({ paymentMethod: e.target.value })
    }

    onBack(){
        this.props.history.push({ pathname: '/ShoppingCart' });
    }

    onSubmit(e) {
        e.preventDefault();

        //reformat products to be added to Order document
        const products = JSON.parse(localStorage.getItem("cartProducts")); 
        let orderProducts = [];
        for (var pid in products) {
            if (products.hasOwnProperty(pid)) {
                let formattedProduct = {pid : pid, itemCount: products[pid].quantity};
                orderProducts.push(formattedProduct);
                //console.log(pid + " -> " + products[pid]);
            }
        }
        console.log(orderProducts);
 
        const data = {
            transactionDate: Date.now(),
            purchasedBy: this.props.user._id,
            shippingInfo: {
                firstName: this.state.shippingFirstName,
                lastName: this.state.shippingLastName,
                address: this.state.shippingAddress
            },
            billingInfo: {
                firstName: this.state.billingFirstName,
                lastName: this.state.billingLastName,
                address: this.state.billingAddress,
                paymentMethod: this.state.paymentMethod
            },
            products: orderProducts
        }

        //store new object in database and print to console
        axios.post(config.backend + "/orders", data)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.data)
                console.log(data)
            });

        //reset Form state
        this.setState((state) => {
            return{
                shippingFirstName: '',
                shipppingLastName: '',
                shippingAddress: '',
                billingFirstName: '',
                billingLastName: '',
                billingAddress: '',
                paymentMethod: ''
            }
        })

        console.log(this.state.shippingFirstName)
        //change submissionSuccess state to show
        //successful submission message to user:
        this.setState((state) => {return {checkoutSuccess: true}});
    }

    render(){
        return(
            <div>
                <div className="m-5"style={{ display:"flex",justifyContent:"flex-start" }}>
                    <Button onClick={this.onBack} size="md" variant="light">&#60;&#60; Back</Button>
                </div>

                <Form className="d-flex justify-content-center mb-5" onSubmit={this.onSubmit}>
                    <div className="square border border-light border-3 p-3" style={{width:"50%"}}>
                        <Form.Group>
                            <h3 className="mt-2">Shipping Information</h3>
                            <Stack direction="vertical" gap={2}>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">First Name:</Form.Label>
                                    <Form.Control 
                                        required type="text" 
                                        placeholder="John"
                                        onChange={this.updateShippingFirstName}
                                        value={this.state.shippingFirstName}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">Last Name:</Form.Label>
                                    <Form.Control 
                                    required type="text" 
                                    placeholder="Doe"
                                    onChange={this.updateShippingLastName}
                                    value={this.state.shippingLastName}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">Shipping Address:</Form.Label>
                                    <Form.Control 
                                        required type="text" 
                                        placeholder="874 WaterFord Drive, Toronto ON, AK3 4U1"
                                        onChange={this.updateShippingAddress}
                                        value={this.state.shippingAddress}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                            </Stack>

                            <h3 className="mt-5">Billing Information</h3>
                            <Stack direction="vertical" gap={2}>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">First Name:</Form.Label>
                                    <Form.Control 
                                        required type="text" 
                                        placeholder="John"
                                        onChange={this.updateBillingFirstName}
                                        value={this.state.billingFirstName}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">Last Name:</Form.Label>
                                    <Form.Control 
                                        required type="text" 
                                        placeholder="Doe"
                                        onChange={this.updateBillingLastName}
                                        value={this.state.billingLastName}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">Shipping Address:</Form.Label>
                                    <Form.Control 
                                        required type="text" 
                                        placeholder="993 Elefor Street, Richmond ON, F31 2LW"
                                        onChange={this.updateBillingAddress}
                                        value={this.state.billingAddress}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                                <div className="d-inline-flex">
                                    <Form.Label className="text-nowrap m-2">Payment Method:</Form.Label>
                                    <Form.Control 
                                        required type="text" 
                                        placeholder="temp..."
                                        onChange={this.updatePaymentMethod}
                                        value={this.state.paymentMethod}/>
                                    <Form.Text className="text-muted"/>
                                </div>
                            </Stack>
                            <Button type="submit" size="lg" className="mt-3 mb-1">Checkout</Button>
                        </Form.Group>
                    </div>
                </Form>

                {this.state.checkoutSuccess === true &&
                    <Alert 
                        className="m-3 justify-content-center align-items-center" 
                        variant="success" 
                        onClose={() => this.setState({ checkoutSuccess: false })} 
                        dismissible
                        style={{width:"100%"}}>
                        <Alert.Heading>Payment successful. Your order is on the way!</Alert.Heading>
                    </Alert>
                } 
            </div>
        )
    }
}

export default Checkout;
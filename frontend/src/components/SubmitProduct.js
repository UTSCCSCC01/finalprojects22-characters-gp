import React, {Component, NumericInput, useState}  from 'react';
import { Alert, Button, Col, Card, Form, Row} from 'react-bootstrap';
import axios from 'axios';
import config from '../config'


export default class SubmitProduct extends Component {
    constructor(props) {
        super(props)

        //State
        this.state = {
            productName: '',
            productCharacter: '',
            productInventoryAmount: '',
            productPrice: '',
            productDescription: '',
            productImage: '',
            submissionSuccess: false,
            listOfCharacters: [],
        }


        //binding methods
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductCharacter = this.onChangeProductCharacter.bind(this);
        this.onChangeProductInventoryAmount = this.onChangeProductInventoryAmount.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onUploadImage = this.onUploadImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        axios.get(config.backend+"/users/?type=2")
        .then(res => {
            this.setState({
                listOfCharacters: res.data,
                productCharacter: res.data[0].email
            });
        }).catch((error) => {
            console.log(error);  
        });

    }

    onChangeProductName(e){
        this.setState({ productName: e.target.value });
    }
    onChangeProductCharacter(e){
        this.setState({ productCharacter: e.target.value });
    }
    onChangeProductInventoryAmount(e){
        this.setState({ productInventoryAmount: e.target.value });
    }
    onChangeProductDescription(e){
        this.setState({ productDescription: e.target.value });
    }
    onChangeProductPrice(e){
        this.setState({ 
            productPrice: e.target.value 
        });
    }

    onUploadImage(e) {
        this.setState({ productImage: e.target.files[0] });
    }
    
    onSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("productName", this.state.productName);
        formData.append("productCharacter", this.state.productCharacter);
        formData.append("productInventoryAmount", this.state.productInventoryAmount);
        formData.append("productPrice", this.state.productPrice);
        formData.append("productDescription", this.state.productDescription);
        formData.append("productImage", this.state.productImage);

        for (var key of formData.entries()) {
            console.log(key[0] + ': ' + key[1]);
        }
        //assume all other state fields are filled (by required attributes)   
        // const data = {
        //     productName: this.state.productName,
        //     productPrice: this.state.productPrice,
        //     productDescription: this.state.productDescription,
        // }

        //store new object in database and print to console
        axios.post(config.backend + "/products", formData)
        .then(res => console.log("res.formData =" + res.formData));

        //reset SubmitForm state
        this.setState({
            productName: '',
            productInventoryAmount: '',
            productPrice: '',
            productDescription: '',
            productImage: '',
            productCharacter: '',
        })
        //change submissionSuccess state to show
        //successful submission message to user:
        this.setState({ submissionSuccess: 'true' });
    }

    render(){
        if (this.props.user == null || this.props.user['type'] !== '3'){
            return (<h1>Invalid Permissions</h1>);
        }
        else {
            return(
                <Row className="justify-content-md-center mt-4">
                <Col md="8">
                <Card className="p-5">
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <Form.Label><h2>Add Character Product</h2></Form.Label>
                        <br/><br/>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Select Character Email
                            </Form.Label>
                            <Col sm="8">
                                <Form.Select required type="text" value={this.state.productCharacter} onChange={this.onChangeProductCharacter}>
                                    {this.state.listOfCharacters.map(opt => (
                                        <option key={opt.email} value={opt.email}>{opt.email}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="productName" className="justify-content-end">
                            <Form.Label column sm="4">
                                Product Name
                            </Form.Label>
                            <Col sm="8" >
                            <Form.Control required type="text"
                                placeholder="Name"
                                onChange={this.onChangeProductName} />
                            </Col>
                        </Form.Group>
                        <br/>
                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="productInventoryAmount">
                                <Form.Label>
                                    Inventory Amount
                                </Form.Label>
                                <Form.Control required type="number"
                                    placeholder="In Stock"
                                    onChange={this.onChangeProductInventoryAmount} />

                            </Form.Group>
                                <Form.Group as={Col} controlId="productPrice">
                                <Form.Label>
                                    Price
                                </Form.Label>
                                <Form.Control required type="number"
                                    min="0.00" step="0.05"
                                    placeholder="$"
                                    onChange={this.onChangeProductPrice}>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Form.Group as={Row} controlId="productDescription">
                            <Form.Label>
                                <h6>Product Description</h6>
                            </Form.Label>
                            <Col sm="12">
                                <Form.Control as="textarea"
                                    placeholder="Enter Description"
                                    required
                                    rows={8}
                                    onChange={this.onChangeProductDescription} />
                            </Col>
                        </Form.Group>
                        <br/>
                        <div className='from-group'>
                            <label htmlFor='file' style={{padding:20}}>Select Product Image:</label>

                            <input type="file"
                                filename="productImage"
                                // name="productImage"
                                className="form-control-file"
                                required
                                onChange={this.onUploadImage}>
                            </input>
                        </div>
                        <br/>
                        <Button size="md" block="block" type="submit">
                            Submit
                        </Button>
                        {this.state.submissionSuccess == 'true' && 
                            <Alert variant="success"  onClose={() => this.setState({ submissionSuccess: false})} dismissible>
                                <Alert.Heading>The product has been successfully submitted.</Alert.Heading>
                            </Alert>
                        }
                    </form>
                </Card>
                </Col>
                </Row>

            )
        }
    }

}
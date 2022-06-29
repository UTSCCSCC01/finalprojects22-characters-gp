import React, {Component, NumericInput, useState}  from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import config from '../config'


export default class SumbitProduct extends Component {
    constructor(props) {
        super(props)

        //State
        this.state = {
            productName: '',
            productPrice: '',
            productDescription: '',
            productImage: '',
            submissionSuccess: false,
        }


        //binding methods
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onUploadImage = this.onUploadImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeProductName(e){
        this.setState({ productName: e.target.value });
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
            productPrice: '',
            productDescription: '',
            productImage: ''
        })
        //change submissionSuccess state to show
        //successful submission message to user:
        this.setState({ submissionSuccess: 'true' });
    }

    render(){
        return(
            <form onSubmit={this.onSubmit} encType="multipart/form-data">

                <br></br>
                <Form.Group as={Row} controlId="productName">
                    <Form.Label column sm="4">
                        What is the name of the product?
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="text"
                            placeholder="Enter product name here ..."
                            onChange={this.onChangeProductName} />
                    </Col>
                </Form.Group>
                <br></br>
                <Form.Group as={Row} controlId="productDescription">
                    <center>
                        <Form.Label column sm="10">
                            <h5>Insert product description</h5>
                        </Form.Label>
                    </center>
                    <Col sm="12">
                        <Form.Control as="textarea"
                            placeholder="Product Description"
                            required
                            rows={8}
                            onChange={this.onChangeProductDescription} />
                    </Col>
                </Form.Group>
                <br></br>
                <Form.Group as={Row} controlId="productPrice">
                    <Form.Label column sm="4">
                        What is the price of the product?
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="number"
                            min="0.01" step="0.01"
                            placeholder="Enter product price here ..."
                            onChange={this.onChangeProductPrice} />
                    </Col>
                </Form.Group>
                <br></br>
                <div className='from-group'>
                    <label htmlFor='file' style={{padding:20}}>Choose product image:</label>

                    <input type="file"
                        filename="productImage"
                        // name="productImage"
                        className="form-control-file"
                        required
                        onChange={this.onUploadImage}>    
                    </input>
                </div>
                <br></br>
                <Button size="md" block="block" type="submit">
                    Submit
                </Button>

                {this.state.submissionSuccess == 'true' && 
                    <Alert variant="success"  onClose={() => this.setState({ submissionSuccess: false})} dismissible>
                        <Alert.Heading>The product has been successfully submitted.</Alert.Heading>
                    </Alert>
                }
            </form>
        )
    }

}
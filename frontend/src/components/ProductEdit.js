import React, { Component } from 'react';
import axios from 'axios';
import config from '../config'
import { Form, Popover, Button, Row, Col, OverlayTrigger } from 'react-bootstrap';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props)

    // State
    this.state = {
        productType:"",
        productTypes: ['', 'Hat', 'Coat', 'T-Shirt', 'Hoodie', 'Jeans', 'Trousers', 'Dress'],
        delOverlayShow: false,
        productName: '',
        productInventoryAmount: '',
        productPrice: '',
        productDescription: '',
        submissionSuccess: false,
    }

    //bind methods to pass to other components
    this.onSubmit = this.onSubmit.bind(this);
  }

  //access the db to fetch the data to display

  componentDidMount() {
    axios.get(config.backend + '/products/' + this.props.productId)
      .then(res => {
        this.setState({
          productName: res.data.productName,
          productDescription: res.data.productDescription,
          productPrice: res.data.productPrice,
          productInventoryAmount: res.data.productInventoryAmount,
          productType: res.data.productType
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit(e) {
      e.preventDefault();

      const data = {
          productName: this.state.productName,
          productType: this.state.productType,
          productInventoryAmount: this.state.productInventoryAmount,
          productPrice: this.state.productPrice,
          productDescription: this.state.productDescription
      }
      axios.put(config.backend + "/products/" + this.props.productId, data).then(res => {
          if (this.state.productImage) {
            console.log(this.state.productImage)
              const formData = new FormData();
              formData.append("productImage", this.state.productImage);
              axios.post(config.backend + "/products/image/" + this.props.productId, formData).then(() => {
                  window.location.reload(false);
              })
          } else {
            window.location.reload(false);
          }
      }).catch(err => console.log("WTF", err))

    //reset SubmitForm state

    //change submissionSuccess state to show
    //successful submission message to user:
    this.setState({ submissionSuccess: 'true' });
  }

  // UI
  render() {
    return (
        <Form className="mx-0" style={{textAlign:'left'}} onSubmit={this.onSubmit}>
            <Form.Group className="mt-2" as={Row} controlId="productName">
                <Form.Label column sm="4">
                    Product Name
                </Form.Label>
                <Col sm="8" >
                    <Form.Control required type="text"
                        placeholder="Name"
                        onChange={(e)=>this.setState({productName: e.target.value})}
                        value={this.state.productName} />
                </Col>
            </Form.Group>
            <Form.Group className="mt-2" as={Row}>
                <Form.Label column sm="4">
                    Select Type
                </Form.Label>
                <Col sm="8">
                    <Form.Select required type="text" value={this.state.productType} onChange={(e)=>this.setState({productType: e.target.value})}>
                        {this.state.productTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group className="mt-2" as={Row} controlId="productInventoryAmount">
                <Form.Label column sm="4">
                    Inventory
                </Form.Label>
                <Col sm="8">
                    <Form.Control required type="number"
                        placeholder="In Stock"
                        onChange={(e)=>this.setState({productInventoryAmount: e.target.value})}
                        value={this.state.productInventoryAmount} />
                </Col>

            </Form.Group>
            <Form.Group className="mt-2" as={Row} controlId="productPrice">
                <Form.Label column sm="4">
                    Price
                </Form.Label>
                <Col sm="8">
                    <Form.Control required type="number"
                        min="0.00" step="0.01"
                        placeholder="$"
                        onChange={(e)=>this.setState({productPrice: e.target.value})}
                        value={this.state.productPrice}>
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group className="mt-3" as={Row} controlId="productDescription">
                <Form.Label>
                    Product Description
                </Form.Label>
                <Col sm="12">
                    <Form.Control as="textarea"
                        placeholder="Enter Description"
                        required
                        rows={2}
                        onChange={(e)=>this.setState({productDescription: e.target.value})}
                        value={this.state.productDescription} />
                </Col>
            </Form.Group>
            <Form.Group controlId="formFile" className="mt-3 mb-2">
                <Form.Label>Change image</Form.Label>
                <Form.Control type="file"
                    onChange={(e) => { console.log("hello",e.target.files[0]); this.setState({ productImage: e.target.files[0] }) }} />
            </Form.Group>
            <Row md={3}>
                <Col>
            <Button className="w-100" block="block" type="submit">
                Submit
            </Button>
            </Col>
            <Col>
            <OverlayTrigger
                show={this.state.delOverlayShow}
                overlay={<Popover id="popover-contained">
                <Popover.Header as="h3">Delete product?</Popover.Header>
                <Popover.Body>
                <Button onClick={this.props.onDelete} block="block" variant='danger'>
                      Delete
                  </Button>{' '}
                  <Button onClick={()=>this.setState({delOverlayShow: false})}block="block" variant='primary'>
                      Cancel
                  </Button>
                </Popover.Body>
              </Popover>}>
            <Button onClick={()=>this.setState({delOverlayShow: !this.state.delOverlayShow})} className="w-100" block="block" variant='danger'>
                Delete
            </Button>
      </OverlayTrigger>
            </Col>
            <Col>
            <Button onClick={this.props.cancelEdit} className="w-100" block="block" variant='warning'>
                Cancel
            </Button>
            </Col>
            </Row>
        </Form>
    );
  }
}
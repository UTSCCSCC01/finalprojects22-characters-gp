import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../config';
export default class CreateItem extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      name: '',
      quantity: ''
    }
  }
  onChangeItemName(e) {
    this.setState({ name: e.target.value })
  }
  onChangeItemQuantity(e) {
    this.setState({ quantity: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const ItemObject = {
      name: this.state.name,
      quantity: this.state.quantity
    };
    axios.post(config.backend+'/items/create-item', ItemObject)
      .then(res => console.log(res.data));
    this.setState({ name: '', quantity: ''})
  }
  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeItemName} />
        </Form.Group>
        <Form.Group controlId="Quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={this.state.quantity} onChange={this.onChangeItemQuantity} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Item
        </Button>
      </Form>
    </div>);
  }
}
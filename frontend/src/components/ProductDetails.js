import React, { Component } from 'react';
import axios from 'axios';
import config from '../config'
import ProductEdit from './ProductEdit';
import { Row, Col, Button, Card } from 'react-bootstrap';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props)

    // State
    this.state = {
      productName: '',
      productDescription: '',
      price: 0,
      image: '',
      inventory: 0,
      storyID: '',
      storyDescription: '',
      quantity: 1,
      isOpen: false,
      edititng: false
    }

    //bind methods to pass to other components
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);

  }

  //access the db to fetch the data to display

  componentDidMount() {
    axios.get(config.backend + '/products/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          productName: res.data.productName,
          productDescription: res.data.productDescription,
          price: res.data.productPrice,
          image: res.data.productImage,
          inventory: res.data.productInventoryAmount,
          storyID: res.data.productStory,
        });
        console.log('storyid', this.state.storyID)
        axios.get(config.backend + '/stories/' + this.state.storyID)
          .then(res => {
            this.setState({
              storyDescription: res.data.storyText,
            });
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        console.log(error);
      });


  }

  displayStoryDescription = () => {
    // For Text that is shorter than desired length
    if (this.state.storyDescription.length <= 258) return this.state.storyDescription;
    // If text is longer than desired length & isOpen is true
    if (this.state.storyDescription.length > 258 && this.state.isOpen) {
      return (
        <>
          <Card.Text>{this.state.storyDescription}</Card.Text>

          <Button onClick={() => this.setState({ isOpen: false })} variant="outline-success">
            Show Less
          </Button>
        </>
      );
    }
    // If text is longer than desired length & isOpen is false
    if (this.state.storyDescription.length > 258) {
      return (
        <>
          <Card.Text>{this.state.storyDescription.slice(0, 258)}...</Card.Text>

          <Button
            onClick={() => this.setState({ isOpen: true })}
            variant="outline-success"
          >
            Show Full Story
          </Button>
        </>
      );
    }
  };

  checkValue(e) {
    let value = parseInt(e.target.value);
    if (value > e.target.max) {
      e.target.value = e.target.max;
    } else if (value < e.target.min) {
      e.target.value = e.target.min;
    }
  }

  onQuantityChange(e) {
    this.checkValue(e)
    this.setState({
      quantity: Number(e.target.value)
    });
  }

  onDelete(e) {
    axios.delete(config.backend + "/products/" + this.props.match.params.id).then(res => {
      if (res.status == 200) {
        this.props.history.replace("/ProductStore");
        this.props.setToast('Deleted product from Inventory')
        console.log("Successfully deleted product");
      }
      else {
        console.log("Fail to delete product");
      }
    });

  }



  onSubmit(e) {
    e.preventDefault();
    if (this.state.quantity == 0) {
      return;
    }
    // create a dict of the items needed
    let addToCart = {
      pid: this.props.match.params.id,
      name: this.state.productName,
      price: this.state.price,
      description: this.state.productDescription,
      image: this.state.image,
      quantity: this.state.quantity
    };
    let pid = this.props.match.params.id;
    // add to the local storage if it already exists
    let cart = JSON.parse(localStorage.getItem("cartProducts"));

    // localStorage.removeItem("cartProducts");
    if (cart == null) {
      localStorage.setItem("cartProducts", JSON.stringify({ [pid]: addToCart }));
    } else {
      //var exists = false;
      console.log("cart: " + cart);
      let cartItem = cart[pid];
      console.log(cartItem);
      if (!cartItem) {
        cart[pid] = addToCart;
      } else {
        cartItem.quantity += addToCart.quantity
      }
      localStorage.setItem("cartProducts", JSON.stringify(cart));
    }

    this.props.setToast('Product added to cart.')


  }

  // UI
  render() {
    return (
      <div className='mx-auto col-md-8'>
        <Card >
          <Card.Header>
            <Card.Title>Story behind this Product</Card.Title>
            <Card.Text>{this.displayStoryDescription()}</Card.Text>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Img className='productImage' variant='top' src={`~/../../uploads/${this.state.image}`} alt={`Picture of ${this.state.productName}`} />
              </Col>
              <Col className="d-flex flex-column">
                {this.state.editing ?
                  <ProductEdit onDelete={this.onDelete} productId={this.props.match.params.id} cancelEdit={() => this.setState({editing:
                    !this.state.editing})}/> :
                  <>
                    <Card.Title>{this.state.productName}</Card.Title>
                    <Card.Text>{this.state.productDescription}</Card.Text>
                    <Card.Text className='inventory'>{this.state.inventory} left in stock</Card.Text>
                    <Card.Text className="productPrice">Price: ${this.state.price}</Card.Text>

                    <Card.Text>Quantity: <span></span>
                      <input
                        type={"number"}
                        value={this.state.quantity}
                        min={0}
                        max={this.state.inventory}
                        onChange={(value) => this.onQuantityChange(value)}
                      />
                    </Card.Text>
                      <Button className="w-100" size="md" block="block" type="submit" onClick={this.onSubmit}> Add to Cart </Button>
                      {this.props.user && this.props.user.type === 3 &&
                        <Button className="mt-2 w-100" size="md" block="block" variant='warning' onClick={() => this.setState({editing:
                        !this.state.editing})}> Edit Product </Button>}
                    </>}

              </Col>

            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import config from '../config'

export default class StoryDetails extends Component {
    constructor(props) {
      super(props)

      // State
      this.state = {
        productName: '',
        productDescription: '',
        price: '',
        image: '',
        inventory: '',
        storyID: '',
        storyDescription: '',
        quantity: 1,
      }
      
    }

    //access the db to fetch the data to display    

    componentDidMount() {
        axios.get(config.backend+'/products/' + this.props.match.params.id)
          .then(res => {
            this.setState({
              productName: res.data.productName, 
              productDescription: res.data.productDescription,
              price: res.data.productPrice,
              image: res.data.productImage,
              inventory: res.data.productInventoryAmount,
              storyID: res.data.productStory,
            });
            
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

    onQuantityChange(e){
      this.setState({
        quantity: e.target.value
      });
    }

    onSubmit(e){
      e.preventDefault();
      
      // add to the local storage if it exists
      
    }

    // UI
    render() {
        return (
            <div className='product-details'>
                <Card >
                    <Card.Header>
                        <Card.Title>Story behind this Product</Card.Title>
                        <Card.Text>{this.state.storyDescription}</Card.Text>
                    </Card.Header>
                    <Card.Body className='productDetails'>
                        <img className='productImage' src={`~/../../uploads/${this.state.image}`}/>
                        <div className='productDesc'>
                          <Card.Title>{this.state.productName}</Card.Title>
                          <Card.Text>{this.state.productDescription}</Card.Text>
                          <Card.Text className='inventory'>{this.state.inventory} left in stock</Card.Text>
                          <Card.Text className="productPrice">Price: ${this.state.price}</Card.Text>
                     
                          <Card.Text>Quantity: <span></span>
                            <input 
                              type={"number"} 
                              value={this.state.quantity}
                              min='1'
                              max={this.state.inventory}
                              // onChange={this.onQuantityChange}
                              onChange={(value) => this.onQuantityChange(value)}
                            />
                          </Card.Text>
                        
                          <Button size="md" block="block" type="submit"> Add to Cart </Button>
                        </div>
                    </Card.Body>

                </Card>
            </div>
        );
    }
    //
}
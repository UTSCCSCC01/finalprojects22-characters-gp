import React, { Component } from 'react';
import axios from 'axios';
import {Row} from 'react-bootstrap';
import ProductCard from './ProductCard';
import config from '../config'

export default class ProductStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchTerm: ''
        };
    }

    componentDidMount() {
        axios.get(config.backend+'/products')
          .then(res => {
            this.setState({
              products: res.data
            });
            console.log("retrieving products")
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }

      listProducts(){
        return this.state.products.filter((res) =>{
          if (this.state.searchTerm == ""){
            return res;
          }else if(res.productName.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
            return res;
          } else if(res.productDescription.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
            return res;
          }

        }).map((res, i) => {
          if(res.productInventoryAmount !== 0){
            return <ProductCard obj={res} key={i} {...this.props} />;
          }
        });
      }

      styles = {
        h3: {
          textAlign: 'left'
        },
  
        input: {
          display: 'flex',
          justifyContent: 'end',
          padding: '1rem'
        }
      }

      render(){
        return (

          <div className="container-fluid">
            <div style={this.styles.input}>
              <input type="text" placeholder="Search..." onChange={event => {
                this.setState({ searchTerm: event.target.value })
              }} />
            </div>
            <h3 style={this.styles.h3}>SHOP CLOTHING</h3>
            <Row>
              {this.listProducts()}
            </Row>
          </div>
        );

      }
}
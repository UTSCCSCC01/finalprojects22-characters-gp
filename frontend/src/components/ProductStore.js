import React, { Component } from 'react';
import axios from 'axios';
import {Row} from 'react-bootstrap';
import ProductCard from './ProductCard';
import config from '../config'
import { Typeahead } from 'react-bootstrap-typeahead';

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
              <Typeahead placeholder="Search..." onChange={selected => {
                console.log(selected)
                  this.setState({ searchTerm: (selected && selected.length !== 0) ? selected[0]: ''})
                }}
                options={this.state.products && this.state.products.map(elem => elem.productName)}
              />
            </div>
            <h3 style={this.styles.h3}>SHOP CLOTHING</h3>
            <Row>
              {this.listProducts()}
            </Row>
          </div>
        );

      }
}
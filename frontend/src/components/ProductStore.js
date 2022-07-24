import React, { Component } from 'react';
import axios from 'axios';
import { Row, Form, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import config from '../config'
import { Typeahead } from 'react-bootstrap-typeahead';
import Collapse from 'react-bootstrap/Collapse';


export default class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchTerm: '',
      filterTypes: ['', 'Hat', 'Coat', 'T-Shirt', 'Hoodie', 'Jeans', 'Trousers', 'Dress'],
      filterType: '',
      approvedStories: [{
        _id: '',
        storyTitle: '',
      }],
      filterStory: '',
      isOpen: false
    };

    this.onChangeFilterType = this.onChangeFilterType.bind(this);
    this.onChangeFilterStory = this.onChangeFilterStory.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    axios.get(config.backend + "/stories/?storyStatus=validated")
      .then(res => {
        this.setState({
          approvedStories: this.state.approvedStories.concat(res.data),
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  onChangeFilterType(e) {
    this.setState({ filterType: e.target.value });
  }

  onChangeFilterStory(e) {
    this.setState({ filterStory: e.target.value });
    console.log(this.state.filterStory);
  }

  clearFilters() {
    this.setState({
      filterStory: '',
      filterType: ''
    });

  }

  componentDidMount() {
    axios.get(config.backend + '/products')
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

  listProducts() {
    return this.state.products.filter((res) => {
      console.log(res);
      console.log(this.state.filterStory);
      if (this.state.filterType == '' && this.state.filterStory == '') {
        if (this.state.searchTerm == "") {
          return res;
        } else if (res.productName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
          return res;
        } else if (res.productDescription.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
          return res;
        }
      }
      if (this.state.filterType != '' && res.productType.includes(this.state.filterType)
        && this.state.filterStory == '') {
        return res;
      }
      if (this.state.filterType == '' && this.state.filterStory != '' && this.state.filterStory == res.productStory) {
        return res;
      }
      if (this.state.filterType != '' && res.productType.includes(this.state.filterType)
        && this.state.filterStory != '' && this.state.filterStory == res.productStory) {
        return res;
      }
    }).map((res, i) => {
      if (res.productInventoryAmount !== 0) {
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
    },
  }

  render() {
    return (

      <div className="container-fluid">

        <br />
        <h3 className="mb-3" style={this.styles.h3}>SHOP CLOTHING</h3>
        <Row >
          <Col xs>
            <div style={{ textAlign: 'left' }}>
              <Button
                size="sm"
                className="filter-button"
                variant="outline-dark"
                onClick={() => this.setState({ isOpen: !(this.state.isOpen) })}
                aria-controls="collapse-text"
                aria-expanded={this.state.isOpen}
              >
                Filter Product
              </Button>
            </div>
          </Col>
          <Col xs={3}>
            <Typeahead placeholder="Search..." onChange={selected => {
              console.log(selected)
              this.setState({ searchTerm: (selected && selected.length !== 0) ? selected[0] : '' })
            }}
              options={this.state.products && this.state.products.map(elem => elem.productName)}
            />
          </Col>
        </Row>
        <Collapse in={this.state.isOpen}>
          <div id="collapse-text" style={{ textAlign: 'left' }}>
            <Form>
            <div className="productFilters m-2">
              <Form.Group as={Row}>
                <Form.Label column md={2}>Filter by Type:</Form.Label>
                <Col md={3}>
                  <Form.Select required type="text" value={this.state.filterType} onChange={this.onChangeFilterType}>
                    {this.state.filterTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column md={2}>
                  Filter by Story Title:
                </Form.Label>
                <Col md={3}>
                <Form.Select required type="text" value={this.state.filterStory} onChange={this.onChangeFilterStory}>
                  {this.state.approvedStories.map(opt => (
                    <option key={opt._id} value={opt._id}>{opt.storyTitle}</option>
                  ))}
                </Form.Select>
                </Col>
              </Form.Group>
              </div>
            </Form>
            <Button variant="link" onClick={() => this.clearFilters()}>Clear All Filters</Button>
          </div>
        </Collapse>


        <Row>
          {this.listProducts()}
        </Row>
      </div>
    );

  }
}
import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ItemTableRow from './ItemTableRow';
import config from '../config'

export default class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    axios.get(config.backend+'/items/')
      .then(res => {
        this.setState({
          items: res.data
        });
        console.log("retrieving inventory")
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  DataTable() {
    return this.state.items.filter((res) => !res.deleted).map((res, i) => {
      return <ItemTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
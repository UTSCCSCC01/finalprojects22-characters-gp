import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import DeletedItemTableRow from './DeletedItemTableRow';
import config from '../config'

export default class DeletedItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    axios.get(config.backend+'/items/deleted-items')
      .then(res => {
        this.setState({
          items: res.data
        });
        console.log("retrieving deleted items")
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  DataTable() {
    return this.state.items.filter((res) => res.deleted).map((res, i) => {
      return <DeletedItemTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Deleted Message</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
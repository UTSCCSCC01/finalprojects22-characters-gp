import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import config from '../config';
export default class DeletedItemTableRow extends Component {
    constructor(props) {
        super(props);
        this.undeleteItem = this.undeleteItem.bind(this);
    }
    undeleteItem() {
        axios.put(config.backend+'/items/undelete-item/' + this.props.obj._id)
            .then((res) => {
                console.log('Item successfully undeleted!')
                window.location.reload(false);
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.quantity}</td>
                <td>{this.props.obj.deleteMessage}</td>
                <td>
                    <Button onClick={this.undeleteItem} size="sm" variant="danger">Restore</Button>
                </td>
            </tr>
        );
    }
}
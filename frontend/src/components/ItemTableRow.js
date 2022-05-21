import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import config from '../config'

export default class ItemTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.onChangeDeleteMessage = this.onChangeDeleteMessage.bind(this);
        this.state = {
            deleteMessage: ''
        };
    }
    deleteItem(e) {
        e.preventDefault()
        const itemObject = {
            deleteMessage: this.state.deleteMessage
        };
        axios.delete(config.backend+'/items/delete-item/' + this.props.obj._id, {data: itemObject})
            .then((res) => {
                console.log('Item successfully deleted!')
                window.location.reload(false);
            }).catch((error) => {
                console.log(error)
            })
    }
    onChangeDeleteMessage(e) {
        this.setState({ deleteMessage: e.target.value })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.quantity}</td>
                <td>
                    <Link className="edit-link" to={"/edit-item/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Deletion Message</Form.Label>
                            <Form.Control type="text" value={this.state.deleteMessage} onChange={this.onChangeDeleteMessage} />
                        </Form.Group>
                        <Button onClick={this.deleteItem} size="sm" variant="danger" type="submit">Delete</Button>
                    </Form>

                </td>
            </tr>
        );
    }
}
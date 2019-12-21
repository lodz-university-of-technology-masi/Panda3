import React, {Component} from 'react'
import BasicTable from "./BasicTable";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state ={
            users: [],
            columns: [{
                Header: 'Id',
                accessor: 'id'
            }, {
                Header: 'First Name',
                accessor: 'firstName'
            }, {
                Header: 'Last Name',
                accessor: 'lastName',
            }, {
                Header: 'Date of birth',
                accessor: 'dob',
            }, {
                Header: 'E-mail',
                accessor: 'email',
            },{
                id: 'action',
                Header: 'Action',
                Cell: row => {
                    return (
                        //TODO: linki
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Link to="/results"><Button variant="secondary">Edit</Button></Link>
                            </Col>
                            <Col md="auto">
                                <Button variant="danger">Delete</Button>
                            </Col>
                        </Row>
                    )
                }
            }]
        }
    }

    componentDidMount() {
        const data = [{
            id: '1',
            firstName:'Testname',
            lastName:'TestLastname',
            dob:'10.05.1995',
            email:'xxx@example.com'
        }];
        this.setState({users:data})
    }

    render() {
        return <div>
            <span>Users:</span>
            <BasicTable
                data={this.state.users}
                columns={this.state.columns}
            />
        </div>
    }
}

export default UserManagement;
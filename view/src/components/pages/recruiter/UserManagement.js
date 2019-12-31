import React, {Component} from 'react'
import BasicTable from "../../BasicTable";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../../LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import ApiHelper from "../../utils/API";

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state ={
            users: [],
            loading:true,
            error:null,
            columns: [{
                Header: 'Id',
                accessor: 'id'
            }, {
                Header: 'First Name',
                accessor: 'name'
            }, {
                Header: 'Last Name',
                accessor: 'surname',
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

    fetch = async() => {
        return ApiHelper.getParticipants().then( data =>
            this.setState({
                users: data,
                loading:false,
            })
        )
    };

    componentDidMount = async() => {
        await this.fetch().catch(e =>
            {
                console.log(e);
                this.setState({
                    loading:false,
                    error:true
                })
            }
        )
    };


    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.error){
            return <Alert variant="danger">Fetch error</Alert>;
        }
        return <div style={{height:"100%"}}>
            <span>Users:</span>
            <BasicTable
                data={this.state.users}
                columns={this.state.columns}
            />
        </div>
    }
}

export default UserManagement;
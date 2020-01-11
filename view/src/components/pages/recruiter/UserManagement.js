import React, {Component} from 'react'
import BasicTable from "../../BasicTable";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../../LoadingSpinner";
import ApiHelper from "../../utils/API";
import Error from "../../Error";
import Container from "react-bootstrap/Container";

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state ={
            users: [],
            loading:true,
            error:null,
            columns: [{
                Header: 'E-Mail',
                accessor: 'email'
            }, {
                Header: 'First Name',
                accessor: 'name'
            }, {
                Header: 'Last Name',
                accessor: 'surname',
            },{
                id: 'action',
                Header: 'Action',
                Cell: (table) => {
                    return (
                        <Row className="justify-content-md-center">
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
            return Error();
        }
        return <Container className="grayBorder bg-items-color m1rem" style={{height:"100%", padding:"0.8rem"}}>
            <BasicTable
                data={this.state.users}
                columns={this.state.columns}
            />
        </Container>
    }
}

export default UserManagement;
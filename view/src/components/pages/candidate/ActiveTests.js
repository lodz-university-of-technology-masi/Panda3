import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "../../fragments/BasicTable";
import {Link} from "react-router-dom";
import LoadingSpinner from "../../fragments/LoadingSpinner";
import ApiHelper from "../../utils/API";
import Container from "react-bootstrap/Container";
import Error from "../../fragments/Error";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ActiveTests extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error:null,
            loading:true,
            tests: [],
            columns: [{
                Header: 'Title',
                accessor: 'title'
            }, {
                id: 'language',
                Header: 'Language',
                accessor: d => d.language.label
            },{
                id: 'action',
                Header: 'Solve Test',
                Cell: table => {
                    let path = '/test/' + table.row.original.id;
                    return (
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Link to={path}><Button variant="primary">Solve</Button></Link>
                            </Col>
                        </Row>
                    )
                }
            }]
        }
    }

    componentDidMount = async () => {
        await ApiHelper.getUsersTests(this.props.user.sub).then( tests =>
            this.setState({
                tests: tests,
                loading:false,
            })
        ).catch(e =>
            {
                console.log(e);
                this.setState({
                    loading:false,
                    error:true
                })
            }
        )
    };

    getTestComponent = () => {
        if(this.state.tests.length ===  0)
            return <span className="noTests">No tests to solve right now</span>;
        return <BasicTable
            data={this.state.tests}
            columns={this.state.columns}
        />
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.error){
            return Error();
        }
        return <Container className="grayBorder bg-items-color m1rem p_d" style={{height:"100%"}}>
            {this.getTestComponent()}
        </Container>
    }
}

export default ActiveTests;
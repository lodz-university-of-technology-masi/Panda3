import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "./BasicTable";
import {Link} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ApiHelper from "./utils/API";
import Container from "react-bootstrap/Container";
import Error from "./Error";

class ActiveTests extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error:null,
            loading:true,
            tests: [],
            columns: [{
                Header: 'Id',
                accessor: 'id'
            },{
                Header: 'Title',
                accessor: 'title'
            }, {
                id: 'language',
                Header: 'Language',
                accessor: d => d.language.label
            },{
                id: 'action',
                Header: 'View Test',
                Cell: table => {
                    let path = '/test/' + table.row.original.id;
                    return (
                        <Link to={path}><Button variant="primary">Solve</Button></Link>
                    )
                }
            }]
        }
    }

    componentDidMount = async () => {
        await ApiHelper.getUsersTests("0775de48-324e-406d-b043-beeda717127c").then( tests =>
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
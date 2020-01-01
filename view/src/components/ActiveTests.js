import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "./BasicTable";
import {Link} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import ApiHelper from "./utils/API";

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

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.error){
            return <Alert variant="danger">Fetch error</Alert>;
        }
        return <div style={{height:"100%"}}>
            <span>Active Tests:</span>
            <BasicTable
                data={this.state.tests}
                columns={this.state.columns}
            />
        </div>
    }
}

export default ActiveTests;
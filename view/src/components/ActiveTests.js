import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "./BasicTable";
import {Link} from "react-router-dom";

class ActiveTests extends Component {
    constructor(props) {
        super(props);
        this.state ={
            tests: [],
            columns: [{
                Header: 'Id',
                accessor: 'testId'
            },{
                Header: 'Title',
                accessor: 'title'
            }, {
                Header: 'Language',
                accessor: 'language'
            },{
                id: 'action',
                Header: 'View Test',
                Cell: table => {
                    let path = '/test/' + table.row.original.testId;
                    return (
                        <Link to={path}><Button variant="primary">View</Button></Link>
                    )
                }
            }]
        }
    }

    componentDidMount() {
        const data = [{
            testId:'1',
            title: 'Sample test',
            language: 'EN'
        },{
                testId:'2',
                title: 'Przykladowy Test',
                language: 'PL'
        }];
        this.setState({tests: data})
    }

    render() {
        return <div>
            <span>Active Tests:</span>
            <BasicTable
                data={this.state.tests}
                columns={this.state.columns}
            />
            </div>
    }
}

export default ActiveTests;
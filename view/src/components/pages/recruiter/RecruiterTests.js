import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import BasicTable from "../../BasicTable";
import {Link} from "react-router-dom";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import Dropdown from "react-bootstrap/Dropdown";

class RecruiterTests extends Component {
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
                Header: 'Action',
                Cell: table => {
                    let modifyPath = '/modify-test/' + table.row.original.testId;
                    let translatePath = '/translate/' + table.row.original.testId;
                    let submissionsPath = '/submissions/' + table.row.original.testId;
                    let managePath = '/manage-access/' + table.row.original.testId;
                    return (
                            <Dropdown>
                                <DropdownToggle variant="primary" id="dropdown-basic">
                                    Test Menu
                                </DropdownToggle>
                                <DropdownMenu>
                                    <Link to={submissionsPath}><Button className="mr-1 ml-1" variant="info">View Submissions</Button></Link>
                                    <Link to={modifyPath}><Button variant="warning">Modify</Button></Link>
                                    <Link to={translatePath}><Button className="mr-1 ml-1" variant="info">Translate</Button></Link>
                                    <Link to={managePath}><Button variant="info">Manage Access</Button></Link>
                                    <Button className="mr-1 ml-1" data-id={table.row.original.testId} variant="danger" onClick={this.deleteTest}>Delete</Button>
                                </DropdownMenu>
                            </Dropdown>
                    )
                }
            }]
        }
    }

    deleteTest = (event) => {
        let idToDel = event.target.attributes['data-id'].value
        event.preventDefault();
        alert("id to del:" + idToDel);
        //TODO: deleteEvent request
    };

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
            <span>Tests:</span>
            <BasicTable
                data={this.state.tests}
                columns={this.state.columns}
            />
        </div>
    }
}

export default RecruiterTests;
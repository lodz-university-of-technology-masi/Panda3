import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import BasicTable from "../../BasicTable";
import {Link} from "react-router-dom";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import Dropdown from "react-bootstrap/Dropdown";
import ApiHelper from "../../utils/API";
import LoadingSpinner from "../../LoadingSpinner";

class RecruiterTests extends Component {
    constructor(props) {
        super(props);
        this.state ={
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
                Header: 'Action',
                Cell: table => {
                    let modifyPath = '/modify-test/' + table.row.original.id;
                    let translatePath = '/translate/' + table.row.original.id;
                    let submissionsPath = '/submissions/' + table.row.original.id;
                    let managePath = '/manage-access/' + table.row.original.id;
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
                                    <Button className="mr-1 ml-1" data-id={table.row.original.id} variant="danger" onClick={this.deleteTest}>Delete</Button>
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

    componentDidMount = async () => {
        try{
            const data = await ApiHelper.getTests();
            console.log(data);
            this.setState({
                test: data,
                loading:false,
            });
        }catch (e) {
            const data = JSON.parse('[{"id":"f0093e08-42f6-4da1-b7a5-02157c27a66c","title":"Title","language":{"label":"English","value":"en"},"questions":[{"type":"O","answers":null,"question":null},{"type":"W","answers":["A1","A2","A3","A4"],"question":null},{"type":"L","answers":null,"question":null}]},{"id":"8da57c6c-3780-42d4-a269-a441c3b6956d","title":"T","language":{"label":"English","value":"en"},"questions":[{"type":"O","answers":null,"question":null}]},{"id":"7fae1ecb-cd1e-48e1-b1ad-2fa1edf4e13f","title":"T","language":{"label":"English","value":"en"},"questions":[{"type":"O","answers":null,"question":null}]}]');
            this.setState({
                test: data,
                loading:false,
            });
        }

    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
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
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import BasicTable from "../../BasicTable";
import {Link} from "react-router-dom";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import Dropdown from "react-bootstrap/Dropdown";
import ApiHelper from "../../utils/API";
import LoadingSpinner from "../../LoadingSpinner";
import Alert from "react-bootstrap/Alert";

class RecruiterTests extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error:null,
            loading:true,
            tests: [],
            columns: [{
                Header: 'Id',
                accessor: 'id',
                show:false
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
            await ApiHelper.getTests().then( tests =>
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
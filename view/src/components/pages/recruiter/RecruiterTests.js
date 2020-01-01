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
import Row from  "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {reverse} from "../../utils/utils";

class RecruiterTests extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error:null,
            loading:true,
            deleted:null,
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
                        <Row className="justify-content-center">
                            <Col md={"auto"}>
                                <Dropdown>
                                    <DropdownToggle variant="primary" id="dropdown-basic">
                                        Test Menu
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <Link to={submissionsPath}><Button className="ml-1" variant="info">View Submissions</Button></Link>
                                        <Link to={translatePath}><Button className="ml-1 mt-1 mb-1" variant="info">Translate</Button></Link>
                                        <Link to={managePath}><Button className="ml-1" variant="info">Manage Access</Button></Link>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                            <Col md={"auto"}>
                                <Dropdown>
                                    <DropdownToggle variant="primary" id="dropdown-basic">
                                        Edit Menu
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <Link to={modifyPath}><Button className="ml-1" variant="warning">Modify</Button></Link>
                                        <Button className="ml-1" data-id={table.row.original.id} variant="danger" onClick={this.deleteTest}>Delete</Button>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>

                    )
                }
            }]
        }
    }

    deleteTest = async (event) => {
        let idToDel = event.target.attributes['data-id'].value;
        event.preventDefault();
        this.setState({loading:true});
        await ApiHelper.deleteTest(idToDel).then(this.fetch).catch((e)=>alert(e)).finally(()=>this.setState({loading:false}))
    };

    fetch = async() => {
        return ApiHelper.getTests().then( tests =>{
            this.setState({
                tests: tests,
                loading:false,
            })}
        )
    };
    componentDidMount = async () => {
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

    /*const DeletedConfirm = () =>{
         if (this.state.deleted === null) return null;
         else if (this.state.deleted) return <Row className="justify-content-center"><Col md={"auto"}><Alert
             variant="success">Test Deleted</Alert></Col></Row>
         return <Row className="justify-content-center"><Col md={"auto"}><Alert variant="danger">Deleted
                 Error</Alert></Col></Row>
     };*/

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.error){
            return <Alert variant="danger">Fetch error</Alert>;
        }
        return <div style={{height:"100%"}}>
            <Row>
                <Col>
                    <span>Tests:</span>
                </Col>
            </Row>
            <BasicTable
                data={this.state.tests}
                columns={this.state.columns}
            />
        </div>
    }
}

export default RecruiterTests;
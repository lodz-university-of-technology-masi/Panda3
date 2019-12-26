import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "../../BasicTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {Link} from "react-router-dom";
import {getLanguages} from "../../utils/Yandex";

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
                    let path = '/test/' + table.row.original.testId;
                    let modifyPath = '/modify-test/' + table.row.original.testId;
                    return (
                        <Row className="justify-content-center" stylw={{width:"auto"}}>
                            <Col md={"auto"}><Link to={path}><Button variant="info">Manage Access</Button></Link></Col>
                            <Col md={"auto"}><Link to={path}><Button variant="info">View Submissions</Button></Link></Col>
                            <Col md={"auto"}><Link to={modifyPath}><Button variant="warning">Modify</Button></Link></Col>
                            <Col md={"auto"}><Link to={path}><Button variant="info">Translate</Button></Link></Col>
                            <Col md={"auto"}><Button data-id={table.row.original.testId} variant="danger" onClick={this.deleteTest}>Delete</Button></Col>
                        </Row>
                    )
                }
            }]
        }
    }

    deleteTest = (event) => {
        let idToDel = event.target.attributes['data-id'].value
        event.preventDefault();
        alert("id to del:" + idToDel);
        getLanguages();
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
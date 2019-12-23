import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "../../BasicTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {Link} from "react-router-dom";

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
                    return (
                        <Row className="justify-content-center">
                            <Col md={"auto"}><Link to={path}><Button variant="warning">Modify</Button></Link></Col>
                            <Col md={"auto"}><Link to={path}><Button variant="danger">Delete</Button></Link></Col>
                        </Row>
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
            <span>Tests:</span>
            <BasicTable
                data={this.state.tests}
                columns={this.state.columns}
            />
        </div>
    }
}

export default RecruiterTests;
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import BasicTable from "../../../BasicTable";

class PendingSubmissions extends Component {
    constructor(props) {
        super(props);
        this.state ={
            submissions: [],
            columns: [{
                Header: 'Id',
                accessor: 'id'
            },{
                Header: 'Candidate',
                accessor: 'user'
            },{
                id: 'action',
                Header: 'Action',
                Cell: table => {
                    let path = '/check-test/' + table.row.original.id;
                    return (
                        <Row className="justify-content-center" style={{width:"auto"}}>
                            <Col md={"auto"}><Link to={path}><Button variant="success">Check</Button></Link></Col>
                        </Row>
                    )
                }
            }]
        }
    }

    componentDidMount() {
        const data = [{
            id:'1',
            test: 'Sample test',
            user: 'Kowalski'
        },{
            id:'2',
            test: 'Przykladowy Test',
            user: 'Benek69'
        }];
        this.setState({submissions: data})
    }

    render() {
        return <div>
            <span>Pending Submissions for test {this.props.match.params.id}</span>
            <BasicTable
                data={this.state.submissions}
                columns={this.state.columns}
            />
        </div>
    }
}

export default PendingSubmissions;
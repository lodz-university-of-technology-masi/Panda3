import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import BasicTable from "../../../BasicTable";
import LoadingSpinner from "../../../LoadingSpinner";
import ApiHelper from "../../../utils/API";
import Error from "../../../Error";

class PendingSubmissions extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading:true,
            submissions: [],
            columns: [{
                Header: 'Id',
                accessor: 'id'
            },{
                Header: 'Name',
                accessor: 'name'
            },{
                Header: 'Surname',
                accessor: 'surname'
            },{
                id: 'action',
                Header: 'Action',
                Cell: table => {
                    let path = '/check-test/' + this.props.match.params.id + '/' + table.row.original.id;
                    return (
                        <Row className="justify-content-center" style={{width:"auto"}}>
                            <Col md={"auto"}><Link to={path}><Button variant="success">Check</Button></Link></Col>
                        </Row>
                    )
                }
            }]
        }
    }

    fetch = async() => {
        return ApiHelper.getSubmissions(this.props.match.params.id).then( data =>
            this.setState({
                submissions: data,
                loading:false,
            })
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
        );
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        } else if(this.state.error) return Error();
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
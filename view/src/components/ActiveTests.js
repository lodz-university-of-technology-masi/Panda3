import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "./BasicTable";
import {Link} from "react-router-dom";

class ActiveTests extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = [{
            title: 'Przykladowy Test',
            maxScore: 50
        }];

        const columns = [{
            Header: 'Title',
            accessor: 'title'
        }, {
            id: 'score',
            Header: 'MaxScore',
            accessor: d => d.maxScore
        },{
            id: 'action',
            Header: 'View Test',
            Cell: row => {
                return (
                    //TODO: zparametryzomany link do testu
                    <Link to="/results"><Button variant="primary">View</Button></Link>
                )
            }
        }];
        return <div>
            <span>Active Tests:</span>
            <BasicTable
                data={data}
                columns={columns}
            />
            </div>
    }
}

export default ActiveTests;
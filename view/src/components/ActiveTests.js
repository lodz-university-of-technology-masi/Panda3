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
                        <Link to={'/test'}><Button variant="primary">View</Button></Link>
                    )
                }
            }]
        }
    }

    componentDidMount() {
        const data = [{
            testId:1,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
                testId:2,
                title: 'Przykladowy Test',
                maxScore: 50
        },{
            testId:3,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:4,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:5,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:6,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:7,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:8,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:9,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:10,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:11,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:12,
            title: 'Przykladowy Test',
            maxScore: 50
        },{
            testId:13,
            title: 'Przykladowy Test',
            maxScore: 50
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
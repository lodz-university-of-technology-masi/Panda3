import React, {Component} from 'react'
import BasicTable from "./BasicTable";

class TestResults extends Component {
    constructor(props) {
        super(props);
        this.state ={
            tests: [],
            columns: [{
                Header: 'Title',
                accessor: 'title'
            }, {
                id: 'score',
                Header: 'Score',
                accessor: d => d.score
            },{
                id: 'maxScore',
                Header: 'Max Score',
                accessor: d => d.maxScore
            }]
        }
    }

    componentDidMount() {
        const data = [{
            title: 'Przykladowy Test',
            score: 36,
            maxScore: 50
        }];
        this.setState({tests:data})
    }

    render() {
        return <div>
            <span>Results:</span>
            <BasicTable
                data={this.state.tests}
                columns={this.state.columns}
            />
        </div>
    }
}

export default TestResults;
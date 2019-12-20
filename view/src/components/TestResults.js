import React, {Component} from 'react'
import BasicTable from "./BasicTable";
class TestResults extends Component {
    render() {
        const data = [{
            title: 'Przykladowy Test',
            score: 36,
            maxScore: 50
        }];

        const columns = [{
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
        }];

        return <div>
            <span>Results:</span>
            <BasicTable
                data={data}
                columns={columns}
            />
        </div>
    }
}

export default TestResults;
import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "./BasicTable";

class ActiveTests extends Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(event) {
        alert("test");
        event.preventDefault();
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
                    <Button variant="primary" onClick={this.handleButtonClick}>View</Button>
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
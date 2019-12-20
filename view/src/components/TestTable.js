import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import {
    useTable,
/*  moze sie przyda potem
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,*/
} from 'react-table';

function GetTable({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
        <Table striped bordered {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(
                (row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )}
            )}
            </tbody>
        </Table>
    )
}


class TestTable extends Component {
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

        return <GetTable
            data={data}
            columns={columns}
        />
    }
}

export default TestTable;
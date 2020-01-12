import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

import {
    useTable,
    usePagination
} from 'react-table';


function BasicTable({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
        },
        usePagination
    );


    return (
        <Container fluid={true} style={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Table striped bordered {...getTableProps()} className="bg-table">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="text-center">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
            <Row className="align-items-center justify-content-start" style={{justifySelf:"start"}}>
                <Col md="auto">
                    <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </Button>{' '}
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </Button>{' '}
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </Button>{' '}
                    <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </Button>{' '}
                </Col>
                <Col md="auto">
                    Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                </Col>
                <Col md="auto">
                    <Row className="align-items-center" noGutters={true}>
                        <Col style={{marginRight:"0.5rem"}}>| Go to page:{' '}</Col>
                        <Col>
                        <input
                            className="form-control"
                            style={{width: "auto"}}
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page)
                            }}
                        />
                        </Col>
                    </Row>
                </Col>{' '}
                <Col md="auto">
                    <select
                        className="custom-select mr-sm-2"
                        style={{width: "auto"}}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
        </Container>
    )
}

export default BasicTable;
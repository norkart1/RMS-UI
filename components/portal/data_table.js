import React from 'react'
import ReactTable, { useTable } from 'react-table';
// import data from '../../helpers/sampleData/institute.json'

function Data_table() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Age',
                accessor: 'age',
                disableGroupBy: true, 
            },
            {
                Header: 'Visits',
                accessor: 'visits',
                disableGroupBy: true, 
            },
            {
                Header: 'Status',
                accessor: 'status',
                disableGroupBy: true, 
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
                disableGroupBy: true, 
            },
        ],
        []
    )
    const data = [
        {
            Header: 'Age',
            accessor: 'age',
        },
        {
            Header: 'Visits',
            accessor: 'visits',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Profile Progress',
            accessor: 'progress',
        },
    ]



    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        headers,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Data_table
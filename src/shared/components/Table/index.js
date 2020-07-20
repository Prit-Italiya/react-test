import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Checkbox from "../Checkbox";
import InputSelect from "../InputSelect";

//Usage of Table Component
{/*<Table
    tableId={"sample-table"}
    schema={TABLE_SCHEMA_SAMPLE}
    data={TABLE_DATA_SAMPLE}
    multiSelection={true}
    selectRowOnClick={true}
    action={`deleteRow`}
    actionTrigger={this.state.eduTableAction}
    onSelectAll={row => console.log("select all : ", row)}
    onRowClick={row => console.log("row click: ", row)}
    pagination={true}
    showRowPage={true}
/>*/}

const _desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => _desc(a, b, orderBy) : (a, b) => -_desc(a, b, orderBy);
};

const Table = props => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [pageIndex, setPageIndex] = useState({
        startIndex: 0,
        endIndex: 0,
        total: props.data.length
    });
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.orderBy);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);

    useEffect(() => {
        updateMaxPageValue();
    }, [props.data]);

    const updateMaxPageValue = (rowsPerPage = props.rowsPerPage) => {
        let maxPageCount = Math.floor(props.data.length / rowsPerPage);
        setMaxPage(maxPageCount);

        const pageCount = (page > maxPageCount) ? maxPageCount : page;
        setPage(pageCount);
        updatedPageIndex(pageCount, rowsPerPage);
    };

    const updatedPageIndex = (page, rowsPerPage) => {
        const total = props.data.length;
        const startIndex = (page * rowsPerPage) + 1;
        const endIndex = ((page * rowsPerPage) + rowsPerPage) > total ? total : (page * rowsPerPage) + rowsPerPage;
        setPageIndex({startIndex, endIndex, total});
    };

    const handleSelectAll = e => {
        if (e.target.checked) {
            setSelected(props.data.map(item => item.id));
            if (props.onSelectAll) props.onSelectAll(props.data);
        } else {
            setSelected([]);
            if (props.onSelectAll) props.onSelectAll([]);
        }
    };

    const handleSelectOne = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        const selectedIndex = selected.indexOf(row.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, 1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
        if (props.onRowClick) props.onRowClick(row);
    };

    const prevPage = () => {
        const currentPage = (page > 0) ? page - 1 : page;
        setPage(currentPage);
        updatedPageIndex(currentPage, rowsPerPage);
    };

    const nextPage = () => {
        const currentPage = (page < maxPage) ? page + 1 : page;
        setPage(currentPage);
        updatedPageIndex(currentPage, rowsPerPage);
    };

    const handleRowsPerPageChange = e => {
        if (e.target.value) {
            updateMaxPageValue(e.target.value);
            setRowsPerPage(e.target.value);
        }
    };

    const handleSorting = (e, id) => {
        const isDesc = orderBy === id && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(id);
    };

    const stableSort = (array, cmp) => {
        const stabilizedThis = array.map((item, index) => [item, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(item => item[0]);
    };

    const renderTableCell = (row, index) => {
        const tableCells = [];
        props.schema.forEach(column => {
            switch (column.type) {
                case 'hidden':
                    break;
                case 'text':
                    tableCells.push(
                        <td key={`${index}_${column.id}`} className={`table-container-body--cell`}>
                            {row[column.id]}
                        </td>
                    );
                    break;
                case 'function':
                    tableCells.push(
                        <td key={`${index}_${column.id}`} className={`table-container-body--cell`}>
                            {row[column.id]}
                        </td>
                    );
                    break;
                default:
                    break;
            }
        });
        return tableCells;
    };

    const onRowClick = row => {
        if (props.selectRowOnClick) {
            const selectedIndex = selected.indexOf(row.id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, row.id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, 1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            }
            setSelected(newSelected);
        }
        if (props.onRowClick) props.onRowClick(row);
    };

    const tableActionSelect = () => {
        switch (props.action) {
            case 'deleteRow':
                return <td>
                    <i
                        className="fa fa-minus-circle delete-row"
                        aria-hidden="true"
                        onClick={e => alert('Hello')}
                    />
                </td>;
            default:
                return <div/>
        }
    };

    return (
        <div className={`table-container table-hover table-responsive`}>
            <table className={`table`}>
                <thead>
                <tr className={`table-container--heading-row`}>
                    {props.multiSelection &&
                    <th className={`table-container--multiSelect`}>
                        {!props.actionTrigger && <Checkbox
                            id={`selectAll_${props.tableId}`}
                            customClassName={`table-container--check-box`}
                            checked={props.data.length > 0 && selected.length === props.data.length}
                            disabled={props.data.length === 0}
                            onChange={e => handleSelectAll(e)}
                        />}
                    </th>
                    }

                    {
                        props.schema.map((column, index) => {
                            if (column.type === 'hidden') {
                                return null;
                            }

                            return (
                                column.sortable ?
                                    <th key={`${index}-${column.id}`} className={`table-container--heading`}>
                                        <span onClick={e => handleSorting(e, column.id)} style={{cursor: "pointer"}}>
                                            {column.label}
                                            <i
                                                className={`${order === 'desc' ? 'fa fa-caret-down' : 'fa fa-caret-up'}`}
                                                aria-hidden="true"
                                                style={{opacity: `${orderBy === column.id ? 1 : 0}`}}
                                            />
                                        </span>
                                    </th> :
                                    <th key={`${index}-${column.id}`}>
                                        <span>{column.label}</span>
                                    </th>
                            );
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    props.data.length > 0 && stableSort(props.data, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <tr
                                key={`${index}-${row.id}`}
                                style={{cursor: `${props.onRowClick ? 'pointer' : 'initial'}`}}
                                onClick={() => onRowClick(row)}
                            >

                                {
                                    props.multiSelection && !props.actionTrigger ?
                                        <td>
                                            <Checkbox
                                                id={`select_${props.tableId}-${index}`}
                                                customClassName={`table-container--check-box`}
                                                checked={selected.indexOf(row.id) !== -1}
                                                onChange={e => handleSelectOne(e, row)}
                                            />
                                        </td> :
                                        props.action &&
                                        props.actionTrigger &&
                                        tableActionSelect()
                                }
                                {renderTableCell(row, index)}
                            </tr>
                        ))
                }
                {props.data.length <= 0 && <tr>
                    <td colSpan={props.schema.length} className={`no-records`}>
                        <div className={`no-records-text`}>No Records Found</div>
                    </td>
                </tr>}
                </tbody>
            </table>
            {props.pagination && props.data.length > 0 && <div className={`table-pagination`}>
                <div className={`table-pagination-box`}>
                    {props.showRowPage && <React.Fragment>
                        <p className={`table-pagination-box--caption`}>Rows per page: </p>
                        <div className={`table-pagination-box--select-box`}>
                            <InputSelect
                                id='status'
                                name='status'
                                placeholder='Select'
                                value={rowsPerPage}
                                options={props.rowsPerPageOptions}
                                onChange={e => handleRowsPerPageChange(e)}
                            />
                        </div>
                    </React.Fragment>}

                    <p className={`table-pagination-box--caption`}>
                        {pageIndex.startIndex}-{pageIndex.endIndex} of {pageIndex.total}
                    </p>

                    <div className={`table-pagination-box--actions`}>
                        <button
                            type="button"
                            className="btn btn-light"
                            disabled={page <= 0}
                            onClick={prevPage}
                        >
                            <i className="fa fa-chevron-left" aria-hidden="true"/>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            disabled={pageIndex.total === pageIndex.endIndex}
                            onClick={nextPage}
                        >
                            <i className="fa fa-chevron-right" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

Table.propTypes = {
    tableId: PropTypes.string.isRequired,
    schema: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.object),
    multiSelection: PropTypes.bool,
    onSelectAll: PropTypes.func,
    pagination: PropTypes.bool,
    setPageNo: PropTypes.number,
    action: PropTypes.string,
    actionTrigger: PropTypes.bool,
    onRowClick: PropTypes.func,
    selectRowOnClick: PropTypes.bool,
    showRowPage: PropTypes.bool,
    orderBy: PropTypes.string
};

Table.defaultProps = {
    data: [],
    rowsPerPage: 10,
    rowsPerPageOptions: [{value: 5}, {value: 10}, {value: 20}, {value: 30}, {value: 50}],
    multiSelection: false,
    pagination: false,
    selectRowOnClick: false,
    showRowPage: false,
    orderBy: ''
};

export default Table;
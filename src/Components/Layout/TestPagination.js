import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Redirect ,withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const headCells = [
  { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'Action', numeric: true, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {

    const classes = useStyles();
    const [dataCategory, setDataCategory] = useState ([]);
    const [token, setToken] = useState (localStorage.getItem("jwt"));
    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllCategories: 0});
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const apiCategory = `http://localhost:4000/api/category`

    const fetchDataCategory = async () => {
        console.log(rowsPerPage, page, "uye")
        if (token === null) {
            return <Redirect to="/"/>
        } else {
            const res = await axios (apiCategory, {headers: {"x-access-token":token}, 
            params: {
                item: rowsPerPage, 
                page: page+1
            }});
            setDataCategory (res.data.result.response);
            setInfoPage (res.data.result.infoPage);
            console.log (res);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, infoPage.totalAllCategories - page * rowsPerPage);

    useEffect(() => {
        fetchDataCategory ();
    },[page, rowsPerPage])

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <div className={classes.tableWrapper}>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
            >
                <EnhancedTableHead />
                <TableBody>
                {dataCategory
                    .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        role="checkbox"
                        key={row.name}
                        >
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" align="center">
                            {row.name}
                        </TableCell>
                        <TableCell align="center">Action</TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>

            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={infoPage.totalAllCategories}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
                'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />

        </Paper>
        </div>
    );
}
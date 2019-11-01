import React, { useState, useEffect } from 'react';
import { Redirect ,withRouter} from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import Typography from '@material-ui/core/Table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { useStyles } from '../Styles/StyleDataCategory';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TablePagination from '@material-ui/core/TablePagination';

import { connect  } from 'react-redux';
import { getCategories, postCategories, patchCategories, deleteCategories } from '../Redux/Actions/categories';

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
  };
  
function MySnackbarContentWrapper(props) {
    const classes = useStyles();
    const { className, message, variant } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
            <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
            </span>
        }
        />
    );
}
  
function DataCategory (props) {
    const classes = useStyles();
    const token = localStorage.getItem("jwt");
    const [dataCategory, setDataCategory] = useState ([]);
    const [postDataCategory, setDataPostCategory] = useState ({name:''});
    const [selectedRow, setSelectedRow] = useState ({});

    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllCategories: 0});
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [add, setAdd] = useState (false);
    const [alert, setAlert] = useState (false);
    const [edit, setEdit] = useState (false);
    const [showStatus, setShowStatus] = useState(false);
    const [validate, setValidate] = useState ("");
    const [success, setSuccess] = useState ("error")
    const apiCategory = 'http://localhost:4000/api/category/';


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, infoPage.totalAllCategories - page * rowsPerPage);

    const addCategory = async() => {
        await props.dispatch( postCategories(postDataCategory))
        .then(res => {
            if (token === null) {
                console.log ("JWT Expires");
            } else {
                if (res.value.data.status !== 400) {
                    setShowStatus(true);
                    setSuccess("success");
                    setValidate("Success Add New Category");
                    handleAddClose();
                } else {
                    setSuccess("error");
                    setShowStatus(true);
                    setValidate(res.value.data.error);
                }
            }
        })
        .catch((error) => setShowStatus(false))
    }

    const deleteCategory = async() => {
        await props.dispatch( deleteCategories(selectedRow))
        .then (res => {
            if (token === null) {
                console.log ("JWT Expires");
            } else {
                if (res.value.data.status !== 400) {
                    setShowStatus(true);
                    setSuccess("success");
                    setValidate("Success Delete Category");
                    handleAlertClose();
                } else {
                    setSuccess("error");
                    setShowStatus(true);
                    setValidate(res.value.data.error);
                }
            }
        }).catch((error) => setShowStatus(false))
    }

    const editCategory = async() => {
        await props.dispatch( patchCategories(selectedRow))
        .then (res => {
            if (token === null) {
                console.log ("JWT Expires");
            } else {
                if (res.value.data.status !== 400) {
                    setShowStatus(true);
                    setSuccess("success");
                    setValidate("Success Edit Category");
                    handleEditClose();
                } else {
                    setSuccess("error");
                    setShowStatus(true);
                    setValidate(res.value.data.error);
                }
            }
        }).catch((error) => setShowStatus(false))
    }

    const fetchDataCategory = async () => {
        if (token === null) {
            return <Redirect to="/"/>
        } else {
            await props.dispatch( getCategories(rowsPerPage, page + 1))
            .then (result => {
                setDataCategory (result.value.data.result.response);
                setInfoPage (result.value.data.result.infoPage);
            })
            .catch (error => {
                console.log (error);
            })
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        fetchDataCategory ();
    },[page, rowsPerPage])

    const inputChangeAdd = (e) => {
        let newDataPost = {...postDataCategory};
        newDataPost [e.currentTarget.name] = e.currentTarget.value;
        setDataPostCategory(newDataPost);
    }

    const inputChangeEdit = (e) => {
        let newDataPost = {...selectedRow};
        newDataPost ["name"] = e.currentTarget.value;
        setSelectedRow(newDataPost);
    }

    //Handle Open Modal Add Category
    const handleAddOpen = () => { setAdd(true) }
    const handleAddClose = () => { setAdd(false) }

    //Handle Open Modal Edit Category
    const handleEditOpen = (row) => { setEdit(true); setSelectedRow (row) }
    const handleEditClose = () => { setEdit(false) }

    //Handle Open Modal Delete Category
    const handleAlertOpen = (row) => { setAlert(true); setSelectedRow (row) }
    const handleAlertClose = () => { setAlert(false) }
    
    const handleCloseSnackbar = () => { setShowStatus(false) }

    return (
    <div className={classes.root}>

        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={showStatus}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
        >
            <MySnackbarContentWrapper
            variant={success}
            className={classes.margin}
            message={validate}
            />
        </Snackbar>

        <Typography className={classes.paper} variant="h1" component="h2">
            DATA CATEGORY
        </Typography>
        <Button onClick={handleAddOpen} className={classes.buttonAdd} variant="contained">
            Add Category
        </Button>
        <Paper className={classes.paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>  
                        <TableCell align="center" className={classes.tableHeader}>Name</TableCell>
                        <TableCell align="center" className={classes.tableHeader}>Action</TableCell>
                    </TableRow>
                </TableHead>

                {props.dataCategories.map((data, index) => {
                    return(
                    <TableBody key={index}>
                        <TableRow>
                            <TableCell align="center">{data.name}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleAlertOpen(data)}>
                                <DeleteIcon style={{color:"red"}}/>
                                </IconButton>
                                ||
                                <IconButton onClick={() => handleEditOpen(data)}>
                                <EditIcon style={{color:"green"}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    )
                })}
                {emptyRows > 0 && (
                    <tbody>
                        <TableRow style={{ height: 60 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    </tbody>
                )}
                
                <tbody>
                    <tr>
                        <TablePagination
                            style={{background:"#ffce1e"}}
                            rowsPerPageOptions={[5, 10, 25]}
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
                    </tr>
                </tbody>
                
            </Table>

            {/* Modal Add Category */}
            <Dialog open={add} onClose={handleAddClose}>
                <DialogTitle><b>Add New Category</b></DialogTitle>

                <DialogContent>
                    <table>
                        <thead>
                        <tr>
                            <td className={classes.boldText}>Name</td>
                            <td>
                                <TextField
                                    id="categoryName"
                                    className={classes.textField}
                                    variant="outlined"
                                    onChange={inputChangeAdd}
                                    name="name"
                                />
                            </td>
                        </tr>
                        </thead>
                    </table>
                </DialogContent>
    
                <DialogActions>
                    <Button onClick={handleAddClose} variant="contained" color="secondary" className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={addCategory} variant="contained" color="primary" className={classes.button}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Delete */}
            <Dialog open={alert} onClose={handleAlertClose}>
                <DialogTitle className={classes.dialogTitle}><b>Are You Sure Delete This Category ?</b></DialogTitle>
                <DialogTitle className={classes.dialogTitle}>( {selectedRow.name} )</DialogTitle>
                <br></br>
                <DialogActions>
                    <Button onClick={handleAlertClose} variant="contained" color="primary" className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={deleteCategory} variant="contained" color="secondary" className={classes.button}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Edit */}
            <Dialog open={edit} onClose={handleEditClose}>
                <DialogTitle><b>Edit Category</b></DialogTitle>    
                <DialogContent>
                        <table>
                            <tbody>
                                <tr>
                                    <td><Typography component="h3"><b>Name</b></Typography></td>
                                    <td>
                                        <TextField
                                            id="categoryName"
                                            className={classes.textField}
                                            variant="outlined"
                                            onChange={inputChangeEdit}
                                            name="name"
                                            value={selectedRow.name}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleEditClose} variant="contained" color="primary" className={classes.button}>
                    Cancel
                </Button>
                <Button onClick={editCategory} variant="contained" color="secondary" className={classes.button}>
                    Edit
                </Button>
                
                </DialogActions>
            </Dialog>
        </Paper>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        dataCategories: state.categories.listCategory
    };
  };
  
  export default connect (mapStateToProps) (DataCategory);
import React, { useState, useEffect } from 'react';
import { Redirect ,withRouter} from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import Typography from '@material-ui/core/Table';
import Avatar from '@material-ui/core/Avatar';
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
import { MenuItem, FormControl, Select } from '@material-ui/core/';  
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TablePagination from '@material-ui/core/TablePagination';

import { connect  } from 'react-redux';
import { getProducts, deleteProducts} from '../Redux/Actions/product';

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
  
function DataProduct (props) {
    const classes = useStyles();
    const [token, setToken] = useState (localStorage.getItem("jwt"));
    const [dataProduct, setDataProduct] = useState ([]);
    const [dataCategory, setDataCategory] = useState ([]);
    const [postDataProduct, setPostDataProduct] = useState ({name:'', description:'',image: '', category_id:'', price:'', quantity:''});
    const [selectedRow, setSelectedRow] = useState ({});
    const [add, setAdd] = useState (false);
    const [alert, setAlert] = useState (false);
    const [edit, setEdit] = useState (false);
    const [showStatus, setShowStatus] = useState(false);
    const [validate, setValidate] = useState ("");
    const [success, setSuccess] = useState ("error")

    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllProduct: 0});
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const apiProduct = `http://localhost:4000/api/product`;
    const apiCategory = `http://localhost:4000/api/category`
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, infoPage.totalAllProduct - page * rowsPerPage);

    const addProduct = () => {
        axios.post(apiProduct, postDataProduct, {headers: {"x-access-token":token}})
        .then(res => {
            if (token === null) {
                console.log ("JWT Expires");
            } else {
                if (res.data.status !== 400) {
                    setShowStatus(true);
                    setSuccess("success");
                    setValidate("Success Add New Product");
                    handleAddClose();
                    fetchDataProduct();
                } else {
                    setSuccess("error");
                    setShowStatus(true);
                    setValidate(res.data.error);
                    console.log(postDataProduct);
                }
            }
        })
        .catch((error) => setShowStatus(false))
    }

    const deleteProduct = async() => {
        await props.dispatch( deleteProducts(selectedRow))
        .then (res => {
            if (token === null) {
                console.log ("JWT Expires");
            } else {
                if (res.value.data.status !== 400) {
                    setShowStatus(true);
                    setSuccess("success");
                    setValidate("Success Delete Product");
                    handleAlertClose();
                } else {
                    setSuccess("error");
                    setShowStatus(true);
                    setValidate(res.value.data.error);
                }
            }
        }).catch((error) => setShowStatus(false))
    }

    const editProduct = () => {
        axios.put(`${apiProduct}/${selectedRow.id}`, selectedRow, {headers: {"x-access-token":token}})
        .then (res => {
            if (token === null) {
                console.log ("JWT Expires");
            } else {
                if (res.data.status !== 400) {
                    setShowStatus(true);
                    setSuccess("success");
                    setValidate("Success Edit Product");
                    handleEditClose();
                    fetchDataProduct();
                } else {
                    setSuccess("error");
                    setShowStatus(true);
                    setValidate(res.data.error);
                }
            }
        }).catch((error) => setShowStatus(false))
    }

    const fetchDataProduct = async () => {
        if (token === null) {
            return <Redirect to="/"/>
        } else {
            await props.dispatch( getProducts(rowsPerPage, page + 1))
            .then(result => {
                setDataProduct (result.value.data.result.response);
                setInfoPage (result.value.data.result.infoPage);
            })
            .catch(error => {
                console.log (error);
            })
        }
    }

    const fetchDataCategory = async () => {
        if (token === null) {
            return <Redirect to="/"/>
        } else {
            const res = await axios (apiCategory, {headers: {"x-access-token":token}});
            setDataCategory (res.data.result.response);
        }
    }   

    useEffect(() => {
        fetchDataProduct ();
        fetchDataCategory ();
    },[page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const inputChangeAdd = (e) => {
        let newDataPost = {...postDataProduct};
        newDataPost [e.currentTarget.name] = e.currentTarget.value;
        setPostDataProduct(newDataPost);
    }

    const inputChangeEdit = (e) => {
        let newDataPost = {...selectedRow};
        newDataPost [e.currentTarget.name] = e.currentTarget.value;
        setSelectedRow(newDataPost);
    }

    //Handle Category For Add Product
    const handleCategoryAdd = (e) => {
        let newDataCategory = {...postDataProduct};
        newDataCategory ["category_id"] = e.target.value;
        setPostDataProduct(newDataCategory);
    }

    //Handle Category For Edit Product
    const handleCategoryEdit = (e) => {
        let newDataCategory = {...selectedRow};
        newDataCategory.category_id = e.target.value;
        setSelectedRow(newDataCategory);
    }

    //Handle Open Modal Add Product
    const handleAddOpen = () => { setAdd(true) }
    const handleAddClose = () => { setAdd(false) }

    //Handle Open Modal Edit Product
    const handleEditOpen = (row) => { row.name = row.product_name; setEdit(true); setSelectedRow (row) }
    const handleEditClose = () => { setEdit(false) }

    //Handle Open Modal Delete Product
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
            DATA PRODUCT
        </Typography>
        <Button onClick={handleAddOpen} className={classes.buttonAdd} variant="contained">
            Add Product
        </Button>
        <Paper className={classes.paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>  
                    <TableCell align="center" className={classes.tableHeader}>Name</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>&nbsp;Category&nbsp;</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Description</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Quantity</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Image</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Price</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                
                    {props.dataProducts.map((data, index) => {
                        return(
                        <TableBody key={index}>
                            <TableRow>
                                <TableCell align="center">{data.product_name}</TableCell>
                                <TableCell align="center">{data.category}</TableCell>
                                <TableCell align="center">{data.description}</TableCell>
                                <TableCell align="center">{data.quantity}</TableCell>
                                <TableCell align="center">
                                    <Avatar src={data.image} className={classes.bigAvatar} />
                                </TableCell>
                                <TableCell align="center">{data.price}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleAlertOpen(data)}>
                                        <DeleteIcon style={{color:"red"}}/>
                                    </IconButton>
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
                                count={infoPage.totalAllProduct}
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
                        <tbody>
                        <tr>
                            <td align="left" className={classes.boldText}>Name</td>
                            <td>
                                <TextField
                                    id="productName"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name='name'
                                    onChange={inputChangeAdd}
                                />
                            </td>
                        </tr>
                        <tr>
                        <td align="left" className={classes.boldText}>Description</td>
                            <td>
                                <TextField
                                    id="productDescription"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    multiline
                                    rowsMax="2"
                                    required
                                    name='description'
                                    onChange={inputChangeAdd}
                                />
                            </td> 
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Image</td>
                            <td>
                                <TextField
                                    id="productImage"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name='image'
                                    onChange={inputChangeAdd}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Price</td>
                            <td>
                                <TextField
                                    id="productPrice"
                                    label="Required Number"
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    InputProps={{ inputProps: { min: 1000 } }}
                                    defaultValue="1000"
                                    name='price'
                                    onChange={inputChangeAdd}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Quantity</td>
                            <td>
                                <TextField
                                    id="productPrice"
                                    label="Required Number"
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    InputProps={{ inputProps: { min: 1 } }}
                                    defaultValue="1"
                                    name='quantity'
                                    onChange={inputChangeAdd}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Category</td>
                            <td>
                                <FormControl variant="outlined" className={classes.textField}>
                                    <Select 
                                        margin="dense"
                                        onChange={handleCategoryAdd}
                                        value={postDataProduct.category_id}
                                        required
                                        name="category_id"
                                    >
                                        {dataCategory.map ((item, index) => (
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} variant="contained" color="secondary" className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={addProduct} variant="contained" color="primary" className={classes.button}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Delete */}
            <Dialog open={alert} onClose={handleAlertClose}>
                <DialogTitle className={classes.dialogTitle}><b>Are You Sure Delete This Product ?</b></DialogTitle>
                <DialogTitle className={classes.dialogTitle}>( {selectedRow.product_name} )</DialogTitle>
                <br></br>
                <DialogActions>
                    <Button onClick={handleAlertClose} variant="contained" color="primary" className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={deleteProduct} variant="contained" color="secondary" className={classes.button}>
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
                            <td align="left" className={classes.boldText}>Name</td>
                            <td>
                                <TextField
                                    id="productName"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name='name'
                                    onChange={inputChangeEdit}
                                    defaultValue={selectedRow !== null ? selectedRow.product_name : "" }
                                />
                            </td>
                        </tr>
                        <tr>
                        <td align="left" className={classes.boldText}>Description</td>
                            <td>
                                <TextField
                                    id="productDescription"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    multiline
                                    rowsMax="2"
                                    required
                                    name='description'
                                    onChange={inputChangeEdit}
                                    defaultValue={selectedRow !== null ? selectedRow.description : "" }
                                />
                            </td> 
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Image</td>
                            <td>
                                <TextField
                                    id="productImage"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name='image'
                                    onChange={inputChangeEdit}
                                    defaultValue={selectedRow !== null ? selectedRow.image : "" }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Price</td>
                            <td>
                                <TextField
                                    id="productPrice"
                                    label="Required Number"
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    InputProps={{ inputProps: { min: 1000 } }}
                                    defaultValue="1000"
                                    name='price'
                                    onChange={inputChangeEdit}
                                    defaultValue={selectedRow !== null ? selectedRow.price : 0 }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Quantity</td>
                            <td>
                                <TextField
                                    id="productQuantity"
                                    label="Required Number"
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    InputProps={{ inputProps: { min: 1 } }}
                                    defaultValue="1"
                                    name='quantity'
                                    onChange={inputChangeEdit}
                                    defaultValue={selectedRow !== null ? selectedRow.quantity : 0 }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" className={classes.boldText}>Category</td>
                            <td>
                                <FormControl variant="outlined" className={classes.textField}>
                                    <Select 
                                        margin="dense"
                                        onChange={handleCategoryEdit}
                                        value={selectedRow !== null ? selectedRow.category_id : 0 }
                                        required
                                        name="category_id"
                                    >
                                        {dataCategory.map ((item, index) => (
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleEditClose} variant="contained" color="primary" className={classes.button}>
                    Cancel
                </Button>
                <Button onClick={editProduct} variant="contained" color="secondary" className={classes.button}>
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
        dataProducts: state.product.listProduct
    };
  };
  
  export default withRouter (connect (mapStateToProps) (DataProduct));
// export default withRouter(DataProduct);
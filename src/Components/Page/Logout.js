import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { useStyles } from '../Styles/StyleLogout';

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
  
function Logout (props) {

    // const classes = useStyles();
    const [token, setToken] = useState (localStorage.getItem("jwt"));
    const [alert, setAlert] = useState (false);
    const [showStatus, setShowStatus] = useState(false);
    
    const logout = () => {
        setAlert (false)
        setShowStatus (true); 
        setToken (localStorage.clear());
        setTimeout(() => {
            props.history.push ('/');
        }, 750); 
    }

    const handleAlertOpen = () => { setAlert (true) }
    const handleAlertClose = () => { setAlert (false) }
    const handleCloseSnackbar = () => { setShowStatus (false) }

    const classes = useStyles();

    return (
        <div>
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
                    variant="success"
                    className={classes.margin}
                    message="Logout Success"
                />
            </Snackbar>
            
            {/* Button Logout */}
            <ListItem button onClick={handleAlertOpen}>
            <ListItemIcon> 
                <ExitToAppIcon fontSize="large" className={classes.button}/>
            </ListItemIcon>
            <ListItemText ><b>Logout</b></ListItemText>
            </ListItem>

            {/* Modal Logout */}
            <Dialog open={alert} onClose={handleAlertClose}>
                <DialogTitle className={classes.dialogTitle}>
                    <b>Are You Sure Want To Logout From MSG MART ?</b>
                </DialogTitle>
                <br></br>
                <DialogActions>
                    <Button onClick={handleAlertClose} variant="contained" color="primary" className={classes.buttonText}>
                        Cancel
                    </Button>
                    <Button onClick={logout} variant="contained" color="secondary" className={classes.buttonText}>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
      </div>
    )
}

export default withRouter(Logout);
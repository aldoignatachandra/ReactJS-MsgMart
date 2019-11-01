import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'; 

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        margin : theme.spacing(3),
        width: '95%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    tableHeader: {
        fontWeight:"bold",
        fontSize:"17px"
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    title: {
        margin : theme.spacing(3), 
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
        height: 50
    },
    boldText: {
        fontWeight: "bold",
        fontSize: "17px"
    },
    button: {
        borderStyle: "solid",
        borderWidth: "2px"
    },
    buttonAdd: {
        marginLeft: theme.spacing(3),
        borderStyle: "solid",
        borderWidth: "2px",
        color: "#ffce1e",
        fontWeight:"bold",
        background: "white"
    },
    dialogTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    maintenance: {
        marginLeft: "340px",
        width: "500px"
    },
}));
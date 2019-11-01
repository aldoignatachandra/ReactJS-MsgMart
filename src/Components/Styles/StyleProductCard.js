import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    card: {
        width: "100%",
        maxHeight: 300,
        borderRadius: 10,
        margin: "5px",
    },
    button: {
        fontSize: "12px",
        height: 30,
        width: 50,
        background: "#e74c3c"
    },
    buttonOrderBy: {
        margin: theme.spacing(1),
        marginBottom: "10px",
        background: "#e67e22",
        fontWeight: "bold",
    },
    buttonSort: {
        margin: theme.spacing(1),
        marginBottom: "10px",
        background: "#e74c3c",
        fontWeight: "bold"
    },
    buttonSearch: {
        margin: theme.spacing(1),
        marginBottom: "10px",
    },
    searchField: {
        width:"430px",
    },
    textError: {
        fontWeight: "bold",
        margin: "auto",
        marginTop: "100px",
        color: "#e67e22",
        border: "solid"
    }
}));
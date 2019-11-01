import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        border: "0px solid #CECECE"
    },
    fixedHeight: {
        height: "89vh",
        width: "90wh",
    },
    button: {
        height: 45,
        width: 150,
        margin: theme.spacing(1)
    },
    cartMaintenance: {
        marginTop: "70px",
        marginLeft: "60px",
        width: "300px"
    }
}));
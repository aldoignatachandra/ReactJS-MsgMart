import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        textAlign: "center",
    },
    fixedHeight: {
        height: "50vh",
        width: "90wh",
    },
    info: {
        fontWeight:"bold", 
        marginTop:"80px"
    }
}));
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'; 

export const useStyles = makeStyles(theme => ({
  dialogTitle: {
    fontFamily: "Arial",
    textAlign: "center",
    fontWeight: "bold",
    color: "red"
  },
  buttonText: {
    fontWeight: "bold"
  },
  button: {
    color: "red"
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
}));
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'; 

export const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "#ffce1e",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bigavatar: {
    margin: theme.spacing(1),
    width: 70,
    height: 70,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkinfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
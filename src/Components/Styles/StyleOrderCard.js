import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: "3px",
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      image: {
        width: 170,
        height: 110,
        margin: "5px",
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
      },
}));
import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core/';
import { useStyles } from '../Styles/StyleDataCategory';

function Statistic (props) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Typography className={classes.paper} variant="h5" component="h2">
                DATA STATISTIC
            </Typography>
            <img className={classes.maintenance}
                src="http://fgcdn-c86c.kxcdn.com/images/uploads/_framed/maintenance-1151312_960_720-kZwHzyBi-650-497.png">
            </img>
        </div>
    )
}

export default withRouter(Statistic);
import React, { useState } from 'react';
import clsx from 'clsx';
import { Redirect, withRouter } from 'react-router-dom';
import { Typography, Grid, Paper} from '@material-ui/core/';
import { useStyles } from '../Styles/StyleDataCategory';

function Statistic (props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
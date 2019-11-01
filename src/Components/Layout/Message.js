import React, { useState } from 'react';
import clsx from 'clsx';
import { Redirect, withRouter } from 'react-router-dom';
import { Typography, Grid, Paper} from '@material-ui/core/';
import { useStyles } from '../Styles/StyleMessage';

function Message (props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid container>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                    <Typography variant="h3" component="h2" className={classes.info}>
                        Welcome To MSG MART !!
                    </Typography>
                    <Typography variant="h6" component="h6">
                        @Aldo Ignata Chandra
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withRouter(Message);
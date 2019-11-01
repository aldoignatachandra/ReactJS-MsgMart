import React, { useState } from 'react';
import clsx from 'clsx';
import { Redirect , withRouter} from 'react-router-dom';
import { useStyles } from '../Styles/StyleMainPage';
import {Typography, Grid, Paper, Button} from '@material-ui/core/';

//Card
import ProductCard from './CardProduct';
// import OrderCard from '../Layout/Order';

function MainPage (props) {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid container>
            <Grid item xs={12} md={12} lg={8}>
                <Paper className={fixedHeightPaper} style={{backgroundColor:"rgba(190, 195, 202, 0.3)"}}>
                    {/* List Product */}
                    <Grid>
                        <ProductCard></ProductCard>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
                <Paper style={{height: "6vh"}}> 
                    <Typography align="center" variant="h5" style={{fontWeight:"bold"}}>
                        CART
                    </Typography>
                    <img className={classes.cartMaintenance} 
                        src="http://fgcdn-c86c.kxcdn.com/images/uploads/_framed/maintenance-1151312_960_720-kZwHzyBi-650-497.png">
                    </img>
                </Paper>
                <Paper className={fixedHeightPaper} style={{height: "70vh"}}>
                    {/* List Order */}
                    <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                    >
                    {/* {[0,1,2,3].map(item=>(
                        <OrderCard></OrderCard> 
                    ))} */}
                    </Grid>
                </Paper>

                <Paper style={{height: "13vh"}}>
                    <Grid container justify="center">
                        <Button variant="contained" color="primary" className={classes.button}>
                            CANCEL
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            CHECKOUT
                        </Button>
                    </Grid>
                </Paper>

            </Grid>
        </Grid>
    )
}

export default withRouter(MainPage);
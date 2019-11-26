import React, { useState } from 'react';
import clsx from 'clsx';
// import { useDispatch, useSelector } from 'react-redux';
import { Redirect , withRouter} from 'react-router-dom';
import { useStyles } from '../Styles/StyleMainPage';
import {Typography, Grid, Paper, Button} from '@material-ui/core/';
import { connect } from 'react-redux';

//Card
import ProductCard from './CardProduct';
import OrderCard from './CardOrder';

function MainPage (props) {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    // const addProduct = useSelector(state => state.order.addedItem);
    
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
                </Paper>
                <Paper className={fixedHeightPaper} style={{height: "70vh"}}>
                    {/* List Order */}
                    <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                    >
                    {props.addedItem.length == 0 ? "EMPTY CART" : props.addedItem.map(item => (
                        <OrderCard item = {item}></OrderCard>
                    ))}
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

const mapStateToProps = state => {
    return {
        addedItem: state.order.addedItem
    };
};

export default withRouter (connect (mapStateToProps) (MainPage));
// export default withRouter(MainPage);
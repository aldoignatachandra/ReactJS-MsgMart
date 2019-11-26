import React, { Component } from 'react';
import { Redirect , withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useStyles } from '../Styles/StyleOrderCard';

function CardOrder (props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardMedia
                className={classes.image}
                image={props.item.image}
            />
          </div>
          <div className={classes.details}>
              <CardContent className={classes.content}>
                  <Typography variant="subtitle1" color="textSecondary">
                      {props.item.product_name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                      {props.item.price}
                  </Typography>
              </CardContent>
              <div className={classes.controls}>
                  <IconButton>
                      <IndeterminateCheckBoxIcon style={{color : "red"}}></IndeterminateCheckBoxIcon>
                  </IconButton>
                  <input style={
                      {
                          width: "40px",
                          height: "30px",
                          textAlign: "center",
                          borderColor: "#95a5a6",
                          borderStyle: "solid",
                          borderWidth: "3px",
                      }} Value={props.item.totalQty}>
                  </input>
                  <IconButton>
                      <AddBoxIcon style={{color : "green"}}></AddBoxIcon>
                  </IconButton>
              </div>
          </div>
      </Card>
    )
}

export default withRouter (CardOrder);
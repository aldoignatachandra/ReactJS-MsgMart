import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField,Grid, Typography, Container } from '@material-ui/core';
import { useStyles } from '../Styles/StyleSignUp';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { connect  } from 'react-redux';
import { postLogin } from '../Redux/Actions/auth';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
    />
  );
}

function Login (props) {
  const classes = useStyles();
  const [input, setInput] = useState({username:'', password:''})
  const [showStatus, setShowStatus] = useState(false);
  const [validate, setValidate] = useState ("");
  const [success, setSuccess] = useState ("error")

  const login = async (e) => {
    e.preventDefault();

    await props.dispatch(postLogin (input))
    .then((result) => {
      if (result.value.data.status !== 400){
        localStorage.setItem("jwt", result.value.data.result.token);
        setSuccess("success");
        setValidate("Login Success");
        setShowStatus(true);
        setTimeout(() => {
          props.history.push('/dashboard')
        }, 500);
      } else {
        setValidate(result.value.data.error);
        setShowStatus(true);
      }
    })
    .catch((error) => setShowStatus(false))
  }

  const onChangeLogin = (e) => {
    e.persist()
    setInput({...input, [e.target.name] : e.target.value})
  }

  const handleCloseSnackbar = () => {
    setShowStatus(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={showStatus}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MySnackbarContentWrapper
        variant={success}
        className={classes.margin}
        message={validate}
        />
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src="https://cdn0.iconfinder.com/data/icons/e-commerce-and-shopping-2/512/shop_store_market_shopping_cafe_retail_sale_trading_trade_products_commerce_marketplace_bar_bistro_grocery_building_service_business_flat_design_icon-512.png" className={classes.bigavatar} />
          <Typography component="h1" variant="h4">
            <b>Login</b>
          </Typography>
          <form className={classes.form} onSubmit={login} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              fullWidth
              label="Username"
              name="username"
              type="text"
              onChange={onChangeLogin}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={onChangeLogin}
            />
            <Button
              className = {classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Grid container className = {classes.linkinfo}>
              <Grid item xs>
              <br/>
                Don't have account ? <Link to = '/signup'>Sign up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    response: state.auth.loginResponse
  };
};

export default connect (mapStateToProps) (Login);
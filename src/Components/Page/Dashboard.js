import React, {useState} from 'react';
import clsx from 'clsx';
import { withRouter, Redirect, Route } from "react-router-dom";
import { useStyles } from '../Styles/StyleDashboard';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, 
    Divider, IconButton } from '@material-ui/core/';

//Import Button Menu
import { mainListMenu } from '../Layout/ListMenu';

//Import Content
import Message from '../Layout/Message';
import MainPage from '../Layout/MainPage';
import DataCategory from '../Layout/DataCategory';
import DataProduct from '../Layout/DataProduct';
import Statistic from '../Layout/Statistic';

import EnhancedTable from '../Layout/TestPagination';

function Dashboard (props) {

    const classes = useStyles();
    const [token, setToken] = useState (localStorage.getItem("jwt"));
    const [openDrawer, setOpenDrawer] = useState (false);

    //Handle Animation Open Menu List
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    
    //Handle Animation Close Menu List
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        
        <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
             MSG MART
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
          }}
          open={openDrawer}
        >
          <div className={classes.toolbarIcon}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.subMenu}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
            <List>{ mainListMenu }</List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            {/* CONTENT */}
            <Route exact path='/dashboard'>
              {!token ? <Redirect to="/"/> : (<Message />)}
            </Route>
            <Route path='/dashboard/List'>
              {!token ? <Redirect to="/"/> : (<MainPage />)}
            </Route>
            <Route path='/dashboard/DataProduct'>
              {!token ? <Redirect to="/"/> : (<DataProduct />)}
            </Route>
            <Route path='/dashboard/DataCategory'>
              {!token ? <Redirect to="/"/> : (<DataCategory />)}
            </Route>
            <Route path='/dashboard/Statistic'>
              {!token ? <Redirect to="/"/> : (<Statistic />)}
            </Route>
            <Route path='/dashboard/Testing'>
              {!token ? <Redirect to="/"/> : (<EnhancedTable />)}
            </Route>
        </main>
      </div>
    )
}

export default withRouter(Dashboard);
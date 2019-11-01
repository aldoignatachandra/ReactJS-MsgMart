import React from 'react';
import { Link } from "react-router-dom";
import { Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import FastfoodIcon from '@material-ui/icons/Fastfood';

//Import Content Button
import Logout from '../Page/Logout';

export const mainListMenu = (

  <div>
    {/* Button Snack */}
    <ListItem button component={ Link } to = '/dashboard/List'>
      <ListItemIcon>
        <FastfoodIcon fontSize="large" style={{color:"#f39c12"}}/>
      </ListItemIcon>
      <ListItemText ><b>List MSG</b></ListItemText>
    </ListItem>

    {/* Button Management Product*/}
    <ListItem button component={ Link } to = '/dashboard/DataProduct'>
      <ListItemIcon>
        <AssignmentOutlinedIcon fontSize="large" style={{color:"#d35400"}}/>
      </ListItemIcon>
      <ListItemText ><b>Data Product</b></ListItemText>
    </ListItem>

    {/* Button Management Category*/}
    <ListItem button component={ Link } to = '/dashboard/DataCategory'>
      <ListItemIcon>
        <AssignmentOutlinedIcon fontSize="large" style={{color:"#8e44ad"}}/>
      </ListItemIcon>
      <ListItemText ><b>Data Category</b></ListItemText>
    </ListItem>

    {/* Button Statistic */}
    <ListItem button component={ Link } to = '/dashboard/Statistic'>
      <ListItemIcon>
        <InsertChartIcon fontSize="large" style={{color:"#7f8c8d"}}/>
      </ListItemIcon>
      <ListItemText ><b>Statistic</b></ListItemText>
    </ListItem>

    <Divider />

    {/* Button Logout */}
    <Logout></Logout>

  </div>
);
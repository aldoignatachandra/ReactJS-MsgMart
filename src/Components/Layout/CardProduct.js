import React, { useState, useEffect } from 'react';
import { Redirect ,withRouter} from 'react-router-dom';
import axios from 'axios';
import { useStyles } from '../Styles/StyleProductCard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid, Button, TextField } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import SearchIcon from '@material-ui/icons/Search';

function ProductCard (props) {
    
    const classes = useStyles();
    const [dataProduct, setDataProduct] = useState ([]);
    const [token, setToken] = useState (localStorage.getItem("jwt"));
    const [order, setOrder] = useState ('');
    const [sorting, setSorting] = useState ('ASC');
    const [search, setSearch] = useState ("");
    const apiProduct = `http://localhost:4000/api/product`;

    const fetchDataProduct = async () => {
      if (token === null) {
          return <Redirect to="/"/>
      } else {
          const res = await axios (apiProduct,{
            params: {
              orderBy: order,
              sortBy: sorting,
              search: search
            },
            headers: {
              "x-access-token":token
            }
          })
          if (res.data.status == 200) {
            setDataProduct (res.data.result.response);
          } else {
            setDataProduct ([]);
          }
      }
    }

    const funSearch = (e) => {
      e.target.name = e.target.value;
      setSearch (e.target.name);
    }

    const handleSearch = () => {
      setSearch(search);
      setTimeout(() => {
        fetchDataProduct();
      }, 0);
    }

    const handleSortBy = (check) => {
      setSorting (check);
      setTimeout(() => {
        fetchDataProduct();
      }, 0);
    }
    
    const handleOrderBy = (check) => {
      setOrder (check);
      setTimeout(() => {
        fetchDataProduct();
      }, 0);
    }

    useEffect(() => {
      fetchDataProduct ();
    },[])

    return (
      <div>
        <Grid className={classes.topPaper}>
            <Grid container justify="center">
              <Grid container  justify="center">
                <TextField 
                  margin="dense" 
                  variant="outlined" 
                  className={classes.searchField}
                  placeholder="Search MSG Here....."
                  name= "search"
                  onChange={funSearch}
                />
                <Button  onClick={handleSearch} variant="contained" className={classes.buttonSearch}  color="primary">
                  <SearchIcon />
                </Button>     
              </Grid>  
              <Button  onClick={() => handleOrderBy('name')} variant="contained" className={classes.buttonOrderBy} color="secondary">
                Name
              </Button>
              <Button  onClick={() => handleOrderBy('category')} variant="contained" className={classes.buttonOrderBy} color="secondary">
                Category
              </Button>
              <Button  onClick={() => handleOrderBy('updated')} variant="contained" className={classes.buttonOrderBy} color="secondary">
                Last Update
              </Button>
              <Button  onClick={() => handleSortBy('ASC')} variant="contained" className={classes.buttonSort} color="secondary">
                  <ArrowUpwardRoundedIcon />
              </Button>
              <Button  onClick={() => handleSortBy('DESC')} variant="contained" className={classes.buttonSort} color="secondary">
                  <ArrowDownwardRoundedIcon />
              </Button>
            </Grid>
        </Grid>
          <Grid 
            container spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
          {dataProduct.length != 0 ?
          dataProduct.map ((data, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Card className={classes.card}>
                
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Product"
                      height="120"
                      image={data.image}
                      title={data.name}
                    />
                  </CardActionArea>

                  <CardContent>
                    <Typography variant="h6">
                      {data.product_name}
                    </Typography>
                    <Typography variant="subtitle2">
                      ({data.category})
                    </Typography>
                    <Typography variant="subtitle2">
                      Quantity : {data.quantity}
                    </Typography>
                    <Divider></Divider>
                      <br></br>
                    <Grid 
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center">
                        <Typography variant="body2" color="primary" component="p">
                          Rp.{data.price}
                        </Typography>
                        <Button variant="contained" color="secondary" className={classes.button}>
                              Add
                        </Button>
                    </Grid>
                  </CardContent>
                  
                </Card>
              </Grid>
            )
          }) : <Typography variant="h2" className={classes.textError}>Data Not Found</Typography>} 
        </Grid>
      </div>
    )
}

export default withRouter(ProductCard);
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Products from '../components/Products';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2rem 1rem'
    },
    title: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        width: 'max-content',
        margin: '0 auto',
    }
}))

const Search = props => {

    const classes = useStyles();
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(props.productsSearch)
    }, [])

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6" className={classes.title}>
                    KẾT QUẢ TÌM KIẾM
                </Typography>
            </Grid>
            <Products>
                { products }
            </Products>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        productsSearch: state.productsSearch
    }
}

export default connect(mapStateToProps)(Search);
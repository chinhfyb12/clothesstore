import { Box, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import Product from '../components/Product'
import SectionSlider from '../components/SectionSlider'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    listGrid: {
        padding: '3rem 0',    
    },
    boxTitle: {
        marginTop: '6rem',
    },
    title: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        width: 'max-content',
        margin: '0 auto',
        padding: '10px 0',
        fontSize: '2rem',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        '&:after': {
            position: 'absolute',
            content: '""',
            top: '100%',
            width: '80%',
            height: '2px',
            background: 'black',
        }
    }
}))

const Home = () => {

    const classes = useStyles();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    return (
        <section>
            <SectionSlider />
            <Box component="div" className={classes.boxTitle}>
                <Typography className={classes.title}>
                    MỚI NHẤT
                </Typography>
            </Box>
            <Grid container className={classes.listGrid}>
                <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Product />
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Product />
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Product />
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Product />
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Product />
                </Grid>
            </Grid>
        </section>
    )
}
export default Home;
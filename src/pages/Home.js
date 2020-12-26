import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Products from '../components/Products'
import SectionSlider from '../components/SectionSlider'
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import useDeepCompareEffect from 'use-deep-compare-effect';

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
    }
}))

const Home = () => {

    const classes = useStyles();

    const [products, setProducts] = React.useState([]);

    useDeepCompareEffect(() => {
        db.collection('clothes')
            .limit(10)
            .onSnapshot((snapshot) => {
                const listProducts = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        price: doc.data().price.toString()
                    }
                })
                setProducts(listProducts);
            })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
    }, [products])

    return (
        <section style={{overflow: 'hidden'}}>
            <SectionSlider />
            <Box component="div" className={classes.boxTitle}>
                <Typography className={classes.title}>
                    MỚI NHẤT
                </Typography>
            </Box>
            <Grid container className={classes.listGrid}>
                <Products>
                    { products }
                </Products>
            </Grid>
        </section>
    )
}
export default Home;
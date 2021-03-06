import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Box, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import formatMoney from '../formatMoney';
import Slug from '../Slug';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'unset',
        margin: '1rem',
        transition: '.3s',
        '&:hover': {
            boxShadow: '0 4px 2px rgba(0, 0, 0, 0.02), 0 9.6px 4.4px rgba(0, 0, 0, 0.023), 0 18.2px 8px rgba(0, 0, 0, 0.027), 0 32.4px 14.1px rgba(0, 0, 0, 0.032), 0 60.6px 27.3px rgba(0, 0, 0, 0.039), 0 145px 80px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-3px)',
        }
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    navLink: {
        textDecoration: 'none',
    },
    titleProduct: {
        color: 'black',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        margin: '10px 0',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    titleContent: {
        fontFamily: 'Quicksand',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    boxImg: {
        position: 'relative',
        overflow: 'hidden',
    },
    addCart: {
        width: '100%',
        padding: '10px 0',
        background: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        fontSize: '0.8rem',
        fontFamily: 'Quicksand',
        transform: 'translateY(100%)',
        opacity: 0,
        transition: '.3s',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            transform: 'translateY(0)',
            opacity: 1,        
        }
    },
    addCartShow: {
        transform: 'translateY(0)',
        opacity: 1,
    },
}));

const Product = props => {

    const classes = useStyles()

    const [addShow, setAddShow] = useState(false)

    const handleClickLink = () => {
        props.sendPath(Slug(props.nameCategory))
    }

    const hanleClickAddToCart = () => {
        props.sendCodeProduct(props.codeProduct)
        props.getEventClickAddCart(props.codeProduct);
    }
    
    return (
        <Card 
            className={classes.root} 
            onMouseOver={ () => setAddShow(true)}
            onMouseOut={ () => setAddShow(false)}>
            <CardContent className={classes.cardContent}>
                <div className={classes.boxImg}>
                    <Link 
                        className={classes.navLinkImg} 
                        to={`/${Slug(props.nameCategory)}/${Slug(props.nameProduct)}.${props.codeProduct}`}
                        onClick={ () => handleClickLink() }
                    >
                        <img style={{width: '100%'}} src={props.imgUrl} alt=""/>
                    </Link>
                    <Typography 
                        component="p" 
                        className={ addShow ? `${classes.addCart} ${classes.addCartShow}` : `${classes.addCart}`}
                        onClick={ () => hanleClickAddToCart() }
                    >
                        THÊM VÀO GIỎ
                    </Typography>
                </div>
                <Link 
                    className={classes.navLink} 
                    to={`/${Slug(props.nameCategory)}/${Slug(props.nameProduct)}.${props.codeProduct}`}
                    onClick={ () => handleClickLink() }>
                    <Box 
                        component="div" 
                        textOverflow="ellipsis"
                    >
                        <Typography component="p" className={classes.titleProduct}>
                            { props.nameProduct }
                        </Typography>
                    </Box>
                </Link>
                <Typography className={classes.titleContent} variant="body2" component="p">
                    { formatMoney(props.price.toString()) } đ
                </Typography>
            </CardContent>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendPath: path => dispatch({type: "SEND_PATH", path}),
        sendCodeProduct: codeProduct => dispatch({type: 'SEND_CODE_PRODUCT', codeProduct}),
    }
}

export default connect(null, mapDispatchToProps)(Product);
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Breadcrumbs, Button, Grid, IconButton, List, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import Slug from '../Slug';
import formatMoney from '../formatMoney';
import { auth, db } from '../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1rem 2rem 3rem 2rem',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem 0 3rem 0',
        }
    },
    navLink: {
        textDecoration: 'none',
        color: 'black',
        fontFamily: 'Quicksand',
        display: 'flex',
        fontSize: '14px',
        alignItems: 'center',
    },
    typography: {
        fontFamily: 'Quicksand',
        color: '#a3a3a3',
        fontSize: '14px',
    },
    breacrumbs: {
        padding: '1rem 2.5rem',
        background: '#fbfbfb',
        marginBottom: '2rem',
    },
    titleCart: {
        width: 'max-content',
        margin: '1rem auto',
        fontSize: '1.5rem',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
    },
    list: {
        padding: '1rem',
        background: 'whitesmoke'
    },
    listItem: {
        display: 'flex',
        background: 'white',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    boxInfo: {
        padding: '1rem',
        marginLeft: '1rem',
        border: '1px solid #d2d2d2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            margin: '1rem 10px 0 10px',
        }
    },
    avatar: {
        borderRadius: 0,
        width: '100%',
        height: '100%'
    },
    boxListName: {
        display: 'flex',
        width: 'inherit',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'start',
            marginLeft: 10
        }
    },
    listName: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
        }
    },
    boxQuantity: {
        border: '1px solid #bbb',
        width: 'fit-content',
        display: 'flex',
        height: 29,
        [theme.breakpoints.down('sm')]: {
            height: 25
        }
    },
    btnQuantity: {
        background: '#b7b7b7',
        width: 30,
        height: 29,
        transition: '.3s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            background: '#8e8e8e'
        },
        [theme.breakpoints.down('sm')]: {
            height: 25,
            width: 26
        }
    },
    divQuantity: {
        margin: '0 15px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: 10,
        }
    },
    boxMoney: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    }
}))

const Cart = (props) => {

    const classes = useStyles();
    const [products, setProducts] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged(user =>  {
            if(user) {
                db.collection('users')
                    .doc(user.uid)
                    .onSnapshot(snapshot => {
                        let cartFirebase = []
                        if(snapshot.data().cart) {
                            cartFirebase = [...snapshot.data().cart]
                        }
                        setProducts(cartFirebase)
                    })
            }
        })
    }, [])

    const handleClickAddMore = codeProduct => {
        auth.onAuthStateChanged(user => {
            if(user) {
                let tempCart = [...products];

                const index = tempCart.findIndex(item => item.codeProduct === codeProduct)
                if(index >= 0) {
                    tempCart[index].quantity += 1
                }
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({
                        cart: [
                            ...tempCart
                        ]
                    })
                props.sendProductsToCart(tempCart)
            } else {
                let tempCart = [...products];

                const index = tempCart.findIndex(item => item.codeProduct === codeProduct)
                if(index >= 0) {
                    tempCart[index].quantity += 1
                }
                localStorage.setItem('cart', JSON.stringify(tempCart));
                props.sendProductsToCart(tempCart)
            }
        })
    }
    const handleClickRemove = codeProduct => {
        auth.onAuthStateChanged(user => {
            if(user) {
                let tempCart = [...products];

                const index = tempCart.findIndex(item => item.codeProduct === codeProduct)
                if(index >= 0) {
                    if(tempCart[index].quantity > 1) {
                        tempCart[index].quantity -= 1
                    }
                }
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({
                        cart: [
                            ...tempCart
                        ]
                    })
                props.sendProductsToCart(tempCart)
            } else {
                let tempCart = [...products];

                const index = tempCart.findIndex(item => item.codeProduct === codeProduct)
                if(index >= 0) {
                    if(tempCart[index].quantity > 1) {
                        tempCart[index].quantity -= 1
                    }
                }
                localStorage.setItem('cart', JSON.stringify(tempCart));
                props.sendProductsToCart(tempCart)
            }
        })
    }

    const handleClickRemoveProduct = codeProduct => {
        const index = products.findIndex(item => item.codeProduct === codeProduct);
        if(index >= 0) {
            products.splice(index, 1)
            auth.onAuthStateChanged(user => {
                if(user) {
                    db.collection('users')
                        .doc(auth.currentUser.uid)
                        .update({
                            cart: [
                                ...products
                            ]
                        })
                } else {
                    localStorage.setItem('cart', JSON.stringify(products))
                }
            })
            props.sendProductsToCart(products)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {

            } else {
                if(localStorage.getItem('cart')) {
                    setProducts(JSON.parse(localStorage.getItem('cart')))
                }
            }
        })
    }, [props.products])

    return (
        <section>
            <Grid container>
                <Grid item lg={12} xs={12} className={classes.breacrumbs}>
                    <Breadcrumbs>
                        <Link 
                            to='/'
                            className={classes.navLink}
                        >
                            <HomeIcon />
                            Trang chủ
                        </Link>
                        <Typography className={classes.typography}>
                            Giỏ hàng
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Typography component="h1" className={classes.titleCart}>
                        GIỎ HÀNG CỦA BẠN
                    </Typography>
                    <List className={classes.list}>
                        {
                            products.map(product => {
                                return (
                                    <ListItem key={product.codeProduct} className={classes.listItem}>
                                        <ListItemAvatar style={{maxWidth: 60}}>
                                            <Link
                                                to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`}
                                                onClick={ () => props.sendPath(Slug(product.nameCategory)) }
                                            >
                                                <Avatar className={classes.avatar} src={ product.imgUrl[0] } />
                                            </Link>
                                        </ListItemAvatar>
                                        <div className={classes.boxListName}>
                                            <div className={classes.listName}>
                                                <Typography>
                                                    <Link 
                                                        to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`}
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'black',
                                                            fontFamily: 'Quicksand',
                                                            fontWeight: 'bold',
                                                        }}
                                                        onClick={ () => props.sendPath(Slug(product.nameCategory)) }
                                                    >
                                                        { product.nameProduct }
                                                    </Link>
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: '13px',
                                                        fontWeight: 'normal',
                                                        color: '#ababab',
                                                    }}
                                                >
                                                    <span>{ product.sizeChoose }</span>
                                                </Typography>
                                            </div>
                                            <div className={classes.boxQuantity}>
                                                <div 
                                                    className={classes.btnQuantity}
                                                    onClick={ () => handleClickRemove(product.codeProduct) }
                                                >-</div>
                                                <span className={classes.divQuantity}>{ product.quantity }</span>
                                                <div 
                                                    className={classes.btnQuantity}
                                                    onClick={ () => handleClickAddMore(product.codeProduct) }
                                                >+</div>
                                            </div>
                                            <div>
                                                <Typography component="p" style={{fontFamily: 'Quicksand', fontSize: '0.9rem'}}>
                                                    { formatMoney(product.price) } đ
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.boxMoney}>
                                            <div>
                                                <Typography component="p" style={{fontFamily: 'Quicksand', width: 'max-content'}}>
                                                    Thành tiền
                                                </Typography>
                                                <Typography 
                                                    component="p" 
                                                    style={{
                                                        fontFamily: 'Quicksand',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    { formatMoney((product.price * product.quantity).toString()) } đ
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <IconButton 
                                                    color='secondary'
                                                    onClick={() => handleClickRemoveProduct(product.codeProduct)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} className={classes.boxInfo}>
                    <Typography variant="h6" style={{fontFamily: 'Quicksand', fontWeight: 'bold'}}>
                        Thông tin đơn hàng
                    </Typography>
                    <Typography component="h6" style={{fontFamily: 'Quicksand', margin: '0.5rem 0'}}>
                        Tổng tiền: <span style={{color: 'red', fontWeight: 'bold'}}> {
                            formatMoney(products.reduce((acc, current) => acc + current.price * current.quantity, 0).toString())
                        } đ </span>
                    </Typography>
                    <Typography>
                        <Link to="/checkout" style={{textDecoration: 'none'}}>
                            <Button color="primary" variant="outlined">
                                THANH TOÁN
                            </Button>
                        </Link>
                        
                    </Typography>
                </Grid>
            </Grid>
        </section>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        sendProductsToCart: products => dispatch({type: 'SEND_PRODUCTS_CART', products}),
        sendPath: path => dispatch({type: "SEND_PATH", path}),
    }
}
const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
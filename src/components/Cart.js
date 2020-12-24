import Paper from '@material-ui/core/Paper'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import Slug from '../Slug';
import formatMoney from '../formatMoney';
import { auth, db } from '../firebase'

const useStyles = makeStyles((theme) => ({
    cartCpm: {
        flexGrow: '1',
        width: '33%',
        padding: '1rem 2rem',
        boxShadow: 'none',
        boderRadius: 'unset',
        position: 'fixed',
        background: 'white',
        zIndex: 9,
        top: 0,
        right: 0,
        minHeight: '100vh',
        transition: '.3s',
        transform: 'translateX(0)',
        paddingTop: '3rem',
        fontFamily: 'Quicksand',
        [theme.breakpoints.down('sm')]: {
            width: '85%',
            padding: '1rem',
        }
    },
    hideCartCpm: {
        transform: 'translateX(100%)',
    },
    iconButton: {
        padding: 10,
        marginLeft: 'auto'
    },
    boxTitle: {
        display: 'flex',
        padding: '0 1rem',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    fieldToTalMoney: {
        display: 'flex',
        padding: '0.5rem 1rem',
    },
    btnCheckout: {
        borderRadius: 0
    },
    listItem: {
        borderBottom: '2px solid black',
        marginBottom: '10px',
    },
    boxAvatar: {
        marginRight: '2rem',
        minHeight: '60px',
        width: '60px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '1rem',
            height: 50,
            width: 50,
        }
    },
    avatar: {
        borderRadius: 0,
        width: '100%',
        height: '100%'
    },
    listButton: {
        marginTop: '1rem',
    },
    item: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0,
        }
    }
}));

const Cart = props => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .onSnapshot(snapshot => {
                        let cartFirebase = [...snapshot.data().cart]
                        setProducts(cartFirebase)
                    })
            }
        })
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setProducts(props.products)
            } else {
                if(localStorage.getItem('cart')) {
                    setProducts(JSON.parse(localStorage.getItem('cart')))
                }
            }
        })
    }, [props.products])

    const handleClickRemove = (codeProduct) => {
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

    const handleClickLink = path => {
        props.sendPath(path)
        props.changeStatusCart()
    }

    const classes = useStyles();

    return (
        <Paper className={ props.statusCart ? `${classes.cartCpm} ${classes.hideCartCpm}` : `${classes.cartCpm}` }>
            <div className={classes.boxTitle}>
                <Typography variant="h6" noWrap>
                    GIỎ HÀNG
                </Typography>
                <IconButton className={ classes.iconButton }  onClick={ () => props.changeStatusCart() }>
                    <Close />
                </IconButton>
            </div>
            <List className={classes.listItem}>
                {
                    products.map(product => {
                        return (
                            <ListItem 
                                className={classes.item} 
                                key={product.codeProduct}
                            >
                                <ListItemAvatar className={classes.boxAvatar}>
                                    <Badge color="primary" badgeContent={ product.quantity } style={{height: '100%'}}>
                                        <Link 
                                            to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`}
                                            style={{height: '100%'}}
                                            onClick={ () => handleClickLink(Slug(product.nameCategory))}
                                        >
                                            <Avatar className={classes.avatar} src={product.imgUrl[0]} />
                                        </Link>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography>
                                        <Link 
                                            to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                                fontFamily: 'Quicksand',
                                                fontWeight: 'bold',
                                            }}
                                            onClick={ () => handleClickLink(Slug(product.nameCategory))}
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
                                        <span>{product.sizeChoose}</span>
                                    </Typography>
                                    <Typography>
                                        { formatMoney(product.price) }đ
                                    </Typography>
                                </ListItemText>
                                <IconButton 
                                    color='secondary'
                                    onClick={ () => handleClickRemove(product.codeProduct)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <div className={classes.fieldToTalMoney}>
                <span>TỔNG TIỀN:</span>
                <span style={{ marginLeft: 'auto' }}>
                    {
                        formatMoney(products.reduce((acc, current) => acc + current.price * current.quantity, 0).toString())
                    }
                đ</span>
            </div>
            <ListItem className={classes.listButton}>
                <Link to="/cart" style={{textDecoration: 'none'}}>        
                    <Button 
                        variant="outlined" 
                        color="primary"
                        className={classes.btnCheckout}
                        style={{color: '#8013e4'}}
                        onClick={ () => props.changeStatusCart() }
                    >
                        GIỎ HÀNG
                    </Button>
                </Link>
                <Link to="/checkout" style={{textDecoration: 'none'}}> 
                    <Button 
                        variant="outlined"
                        style={{ marginLeft: '10px', color: '#8013e4' }}
                        className={classes.btnCheckout}
                        onClick={ () => props.changeStatusCart() }
                    > 
                        THANH TOÁN
                    </Button>
                </Link>
            </ListItem>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        statusCart: state.statusCart,
        products: state.products
    }
}
const mapDispatchToProps = dispatch => {
    return {
        sendPath: path => dispatch({type: "SEND_PATH", path}),
        changeStatusCart: () => dispatch({type: 'CHANGE_STATUS_CART'}),
        sendProductsToCart: products => dispatch({type: 'SEND_PRODUCTS_CART', products}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
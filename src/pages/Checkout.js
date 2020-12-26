import { Avatar, Badge, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, db } from '../firebase';
import Slug from '../Slug'
import formatMoney from '../formatMoney';
import ChatIcon from '@material-ui/icons/Chat';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2rem 0',
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        }
    },
    rootSuccess: {
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    boxAvatar: {
        marginRight: '2rem',
        height: '60px',
        width: '60px',
    },
    avatar: {
        borderRadius: 0,
        width: '100%',
        height: '100%'
    },
    listInfor: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemProduct: {
        background: '#f7f7f7',
        margin: '1rem 0',
    },
    totalPrice: {
        marginLeft: 'auto',
        fontSize: '1.5rem',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
    },
    boxProduct: {
        padding: '0 2rem',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem 0',
        }
    },
    boxInfor: {
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            borderLeft: '1px solid #e4e4e4',
            padding: '0 2rem',
        },
        minHeight: '100vh',
    },
    fieldInput: {
        margin: '1rem 0',
    },
    btnFinish: {
        margin: '1rem 0',
        [theme.breakpoints.down('md')]: {
            width: 195,
        }   
    },
    btnContact: {
        margin: '1rem 0',
        [theme.breakpoints.down('md')]: {
            width: 210,
        }  
    }
}));

const Checkout = (props) => {

    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    let history = useHistory();

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
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    })
            }
        })
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {

            } else {
                if(localStorage.getItem('cart')) {
                    setProducts(JSON.parse(localStorage.getItem('cart')))
                }
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        })
    }, [props.products])

    const handleClickOrder = () => {
        if(name && phone && address && products[0]) {
            auth.onAuthStateChanged(user => {
                if(user) {
                    db.collection('orders')
                        .doc()
                        .set({
                            name,
                            phone,
                            address,
                            cart: [...products]
                        })
                        .then(() => {
                            let temp = [];
                            db.collection('users')
                                .doc(auth.currentUser.uid)
                                .update({
                                    cart: [...temp]
                                }).then(() => {
                                    setIsSuccess(true);
                                    props.sendProductsToCart(temp)
                                })
                        })
                } else {
                    db.collection('orders')
                        .doc()
                        .set({
                            name,
                            phone,
                            address,
                            cart: [...products]
                        })
                        .then(() => {
                            let temp = [];
                            localStorage.removeItem('cart');
                            setIsSuccess(true);
                            props.sendProductsToCart(temp)
                        })
                }
            })
        }
        
    }
    const handleClickBackHome = () => {
        history.push('/all')
    }
    const renderSuccess = () => {
        return (
            <Grid container className={classes.rootSuccess}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                }}>
                    <DoneAllIcon />
                    <span>Đặt hàng thành công, đơn hàng đang được xử lí!</span>
                </div>
                <Button 
                    color="primary" 
                    variant="contained"
                    onClick={ () => handleClickBackHome() }
                >
                    Tiếp tục mua hàng
                </Button>
            </Grid>
        )
    }
    const renderCheckout = () => {
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={12} md={6} className={classes.boxProduct}>
                    <List>
                        {
                            products.map((product, index)=> {
                                return (
                                    <ListItem key={index} className={classes.itemProduct}>
                                        <ListItemAvatar className={classes.boxAvatar}>
                                            <Badge color="primary" badgeContent={ product.quantity } style={{height: '100%'}}>
                                                <Link 
                                                    to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`}
                                                    style={{height: '100%'}}
                                                    onClick={ () => props.sendPath(Slug(product.nameCategory))}
                                                >
                                                    <Avatar className={classes.avatar} src={product.imgUrl[0]} />
                                                </Link>
                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <div className={classes.listInfor}>
                                                <Typography>
                                                    <Link 
                                                        to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`} 
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'black',
                                                            fontFamily: 'Quicksand',
                                                            fontWeight: 'bold',
                                                        }}
                                                        onClick={ () => props.sendPath(Slug(product.nameCategory))}
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
                                                    {formatMoney(product.price.toString())}đ
                                                </Typography>
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <div 
                        style={{
                            display: 'flex', 
                            padding: '1rem', 
                            background: '#e1e1e1',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="p">Tổng cộng: </Typography>
                        <Typography className={classes.totalPrice}>
                            { formatMoney(products.reduce((acc, current) => acc + current.price * current.quantity, 0).toString()) }
                        đ</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.boxInfor}>
                    <Typography
                        style={{
                            fontFamily: 'Quicksand',
                            fontWeight: 'bolder',
                            fontSize: '2rem'
                        }}
                    >
                        Thông tin giao hàng
                    </Typography>
                    <TextField onChange={ e => setName(e.target.value)} className={classes.fieldInput} id="standard-basic" type="text" label="Họ tên người nhận" required />
                    <TextField onChange={ e => setPhone(e.target.value)} className={classes.fieldInput} id="standard-basic" type="text" label="Số điện thoại người nhận" required />
                    <TextField onChange={ e => setAddress(e.target.value)} className={classes.fieldInput} id="standard-basic" type="text" label="Địa chỉ người nhận" required />
                    <Button 
                    className={classes.btnFinish} 
                    variant="contained" 
                    color="primary"
                    onClick={ () => handleClickOrder() }
                    >
                        Hoàn tất đơn hàng
                    </Button>
                    <Button className={classes.btnContact} variant="contained" color="primary">
                        {/* <a 
                            href='https://www.facebook.com/messages/t/100010311991504' 
                            rel='noreferrer' 
                            target='_blank'
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        > */}
                            <ChatIcon style={{ marginRight: 5 }}/>
                            Liên hệ người bán
                        {/* </a> */}
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {
                isSuccess ? renderSuccess() : renderCheckout()
            }
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendPath: path => dispatch({type: "SEND_PATH", path}),
        sendProductsToCart: products => dispatch({type: 'SEND_PRODUCTS_CART', products}),
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
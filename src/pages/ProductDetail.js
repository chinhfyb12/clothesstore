import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Button, Container, Divider, Grid, List, ListItem, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import formatMoney from '../formatMoney';
import { db } from '../firebase';
import Slug from '../Slug';
import { connect } from 'react-redux';
import Products from '../components/Products';
import { auth } from '../firebase';

const useStyles = makeStyles((theme) => ({
    listImg: {
        display: 'flex',
    },
    listItemImg: {
        padding: 10,
        width: 80,
        height: 80,
        border: '1px solid #eaeaea',
        margin: '0 0.5rem',
        cursor:'pointer',
        '&.active': {
            border: '1px solid black',
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
    boxImgLarge: {
        border: '1px solid #cccccc',
        overflow: 'hidden',
    },
    breacrumbs: {
        padding: '1rem 2.5rem',
        background: '#fbfbfb',
        marginBottom: '2rem',
    },
    nameProduct: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    textPrice: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
    },
    listSize: {
        display: 'flex',
    },
    sizeItem: {
        padding: 0,
        width: 40,
        height: 40,
        border: '1px solid #e4e4e4',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginRight: 10,
        cursor: 'pointer',
        '&.active': {
            background: 'black',
            color: 'white',
        }
    },
    groupQuantity: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconChangesQuantity: {
        color: 'black',
        borderRadius: 0,
        background: '#f1f2ff',
        padding: 5,    
    },
    addButton: {
        background: 'black',
        color: 'white',
        borderRadius: 0,
        width: '100%',
        padding: 8,
        border: '1px solid black',
        transition: '.3s',
        '&:hover': {
            background: 'white',
            color: 'black',
        }
    },
    divider: {
        height: 0.5,
        background: '#ebebeb',
    },
    listItemInfor: {
        paddingRight: 0,
        paddingLeft: 0,
        margin: '10px 0'
    },
    titleSameProduct: {
        fontFamily: 'Quicksand',
        width: 'max-content',
        position: 'relative',
        fontWeight: 'bold',
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '40%',
            height: 2,
            bottom: 0,
            background: 'black',
        }
    },
    titleProducts: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        textTransform: 'lowercase',
        fontSize: '0.9rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
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
}))

const ProductDetail = props => {

    const match = useRouteMatch();
    let pCode; //code product
    if(match.params.id === undefined) {
        pCode = match.path.slice(match.path.lastIndexOf('.') + 1);
    } else {
        pCode = match.params.id
    }
    
    let pathCategory = match.path.slice(1, match.path.lastIndexOf('/'));
    if(pathCategory.indexOf('/') >= 0) {
        pathCategory = pathCategory.slice(pathCategory.indexOf('/') + 1);
    }

    const classes = useStyles();
    const [sizeList, setSizeList] = React.useState([]);
    const [size, setSize] =  React.useState(null);

    const [imgUrlList, setImgUrlList] = React.useState([]);
    const [img, setImg] = React.useState(null)

    const [cartFirebase, setCartFirebase] = React.useState([])
    
    const handleChooseImg = img => {
        setImg(img)
    }
    const chooseSize = size => {
        setSize(size);
    }

    const [listProducts, setListProducts] = React.useState([])
    const [product, setProduct] = React.useState({
        imgUrl: '',
        nameProduct: '',
        price: '',
        quantity: 1,
        codeProduct: '',
        size: [],
    });
    const [nameCategory, setNameCategory] = React.useState(null);

    const handleClickAddToCart = (codeProduct) => {
        let productAddCart = {
            codeProduct: product.codeProduct,
            imgUrl: product.imgUrl,
            price: product.price,
            nameCategory: product.nameCategory,
            nameProduct: product.nameProduct,
            quantity: product.quantity,
            pathCategory: product.pathCategory,
            sizeChoose: size ? size : 'S',
        }
        auth.onAuthStateChanged(user => {
            if(user) {
                let cartFirebaseTemp = [...cartFirebase]
                    
                let cartTemp = []

                let indexCheckExist = -1;
                if(cartFirebaseTemp) {
                    cartTemp = [...cartFirebaseTemp];
                    indexCheckExist = cartFirebaseTemp.findIndex(item => item.codeProduct === codeProduct)
                }
                if(indexCheckExist >= 0) {
                    cartTemp[indexCheckExist] = {...cartTemp[indexCheckExist], quantity: cartTemp[indexCheckExist].quantity + 1}
                } else {
                    cartTemp.push(productAddCart)
                }
                
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({
                        cart: [
                            ...cartTemp
                        ]
                    })
                props.sendProductsToCart(cartTemp)
            } else {
                let cartLocalhost = JSON.parse(localStorage.getItem('cart'));

                let cartTemp = []
                
                let indexCheckExist = -1;
                if(cartLocalhost) {
                    cartTemp = [...cartLocalhost];
                    indexCheckExist = cartLocalhost.findIndex(item => item.codeProduct === codeProduct)
                }
                if(indexCheckExist >= 0) {
                    cartTemp[indexCheckExist] = {...cartTemp[indexCheckExist], quantity: cartTemp[indexCheckExist].quantity + product.quantity}
                } else {
                    cartTemp.push(productAddCart)
                }
                
                localStorage.setItem('cart', JSON.stringify(cartTemp));
                props.sendProductsToCart(cartTemp)
            }
        })

    }
    const handleClickAddMore = () => {
        setProduct({
            ...product,
            quantity: product.quantity + 1
        })
    }
    const handleClickRemove = () => {
        if(product.quantity > 1) {
            setProduct({
                ...product,
                quantity: product.quantity - 1
            })
        }
    }

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
                        setCartFirebase(cartFirebase);
                    })
            }
        })
    }, [])

    useEffect(() => {
        db.collection('clothes')
            .where('codeProduct', '==', pCode)
            .onSnapshot(snapshoot => {
                snapshoot.docs.forEach(doc => {
                    setProduct({
                        ...doc.data(),
                        price: doc.data().price.toString(),
                        quantity: 1
                    })
                    setNameCategory(doc.data().nameCategory)
                    setSizeList(doc.data().size)
                    setImgUrlList(doc.data().imgUrl)
                    setImg(doc.data().imgUrl[0]);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                })
            })
        db.collection('clothes')
            .where('pathCategory', 'array-contains-any', [pathCategory])
            .where('codeProduct', '!=', pCode)
            .limit(5)
            .onSnapshot(snapshoot => {
                if(snapshoot) {
                    const listProduct = snapshoot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            docKey: doc.data().id
                        }
                    });
                    setListProducts(listProduct);
                }
            })
    }, [pCode])

    return (
        <Container>
            <Grid container style={{padding: '2rem 0', borderBottom: '1px solid #e2e2e2'}}>
                <Grid item lg={12} xs={12} className={classes.breacrumbs}>
                    <Breadcrumbs>
                        <Link 
                            to='/'
                            className={classes.navLink}
                        >
                            <HomeIcon />
                            Trang chủ
                        </Link>
                        <Link 
                            to='/all' 
                            className={classes.navLink}
                        >
                            Sản phẩm
                        </Link>
                        {
                            nameCategory ? (
                                <Link 
                                    to={`/${Slug(nameCategory)}`} 
                                    className={classes.navLink}
                                >
                                    { nameCategory }
                                </Link>
                            ) : ''
                        }
                        {
                            <Typography variant="h5" className={classes.titleProducts}>
                                { product.nameProduct }
                            </Typography>
                        }
                    </Breadcrumbs>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div className={classes.boxImgLarge}>
                        <img style={{width: '100%'}} src={img} alt=""/>
                    </div>
                    <List className={classes.listImg}>
                        {
                            imgUrlList.map((item, index) => {
                                return (
                                    <ListItem 
                                        key={index} 
                                        className={img === item ? `${classes.listItemImg} active` : `${classes.listItemImg}`}
                                        onClick={() => handleChooseImg(item)}
                                    >
                                        <img style={{width: '100%'}} src={item}  alt=""/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <List style={{padding: '0 2rem'}}>
                        <ListItem className={classes.listItemInfor}>
                            <Typography variant="h6" className={classes.nameProduct}>
                                { product.nameProduct }
                            </Typography>
                        </ListItem>
                        <Divider className={classes.divider} />
                        <ListItem className={classes.listItemInfor}>
                            <Typography variant="h6" className={classes.textPrice}>
                                { formatMoney(product.price) } đ
                            </Typography>
                        </ListItem>
                        <Divider className={classes.divider}  />
                        <ListItem className={classes.listItemInfor}>
                            <List className={classes.listSize}>
                                {
                                    sizeList.map((item, index) => {
                                        return (
                                            <ListItem 
                                                className={ size === item ? `${classes.sizeItem} active` : `${classes.sizeItem}`} 
                                                key={index}
                                                onClick={() => chooseSize(item)}
                                            >
                                                {item}
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </ListItem>
                        <Divider className={classes.divider}  />
                        <ListItem className={classes.listItemInfor}>
                            <div className={classes.boxQuantity}>
                                <div 
                                    className={classes.btnQuantity}
                                    onClick={ () => handleClickRemove() }
                                >-</div>
                                <span className={classes.divQuantity}>{ product.quantity }</span>
                                <div 
                                    className={classes.btnQuantity}
                                    onClick={ () => handleClickAddMore() }
                                >+</div>
                            </div>
                        </ListItem>
                        <Divider className={classes.divider}  />
                        <ListItem className={classes.listItemInfor}>
                            <Button 
                            className={classes.addButton}
                            onClick={ () => handleClickAddToCart(product.codeProduct)}
                            >
                                    <AddShoppingCartIcon />
                                    <Typography 
                                        component='p'
                                        style={{
                                            fontFamily: 'Quicksand',
                                            marginLeft: 5,
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        THÊM VÀO GIỎ
                                    </Typography>
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid container style={{padding: '2rem 0'}}>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.titleSameProduct}>
                        SẢN PHẨM LIÊN QUAN
                    </Typography>
                </Grid>
                <Products>
                    { listProducts }
                </Products>
            </Grid> 
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendProductsToCart: products => dispatch({type: 'SEND_PRODUCTS_CART', products}),
    }
}

export default connect(null, mapDispatchToProps)(ProductDetail);
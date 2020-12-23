import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Button, Container, Divider, FormGroup, Grid, IconButton, List, ListItem, TextField, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import formatMoney from '../formatMoney';
import { db } from '../firebase';
import Slug from '../Slug';
import { connect } from 'react-redux';
import Products from '../components/Products';

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
    }
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
    // const [img, setImg] = React.useState('https://product.hstatic.net/1000306633/product/af7927b5-1ae5-496b-b589-d52aa69f5ea8_ca1219731ddd4163a2c3822a75fbb4f8_master.jpg')
    // const imgUrlList = ['https://product.hstatic.net/1000306633/product/af7927b5-1ae5-496b-b589-d52aa69f5ea8_ca1219731ddd4163a2c3822a75fbb4f8_master.jpg', 'https://product.hstatic.net/1000306633/product/85136537-2914-40aa-80f5-c64ffacc7453_f8afd9938e33473ea1ca865532c854c4_master.jpg']

    const [imgUrlList, setImgUrlList] = React.useState([]);
    const [img, setImg] = React.useState(null)
    
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
                            <FormGroup className={classes.groupQuantity}>
                                <IconButton className={classes.iconChangesQuantity}>
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    type="text"
                                    defaultValue={1}
                                    style={{width: 30, margin: '0 20px'}}
                                />
                                <IconButton className={classes.iconChangesQuantity}>
                                    <AddIcon />
                                </IconButton>
                            </FormGroup>
                        </ListItem>
                        <Divider className={classes.divider}  />
                        <ListItem className={classes.listItemInfor}>
                            <Button className={classes.addButton}>
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

export default ProductDetail;
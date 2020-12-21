import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Button, Container, Divider, FormGroup, Grid, IconButton, List, ListItem, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Product from '../components/Product';

const useStyles = makeStyles(() => ({
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
    }
}))

const ProductDetail = () => {

    const classes = useStyles();
    const sizeList = ['S', 'M', 'L', 'XL'];
    const [size, setSize] =  React.useState(null);
    const [img, setImg] = React.useState('https://product.hstatic.net/1000306633/product/af7927b5-1ae5-496b-b589-d52aa69f5ea8_ca1219731ddd4163a2c3822a75fbb4f8_master.jpg')
    const imgUrl = ['https://product.hstatic.net/1000306633/product/af7927b5-1ae5-496b-b589-d52aa69f5ea8_ca1219731ddd4163a2c3822a75fbb4f8_master.jpg', 'https://product.hstatic.net/1000306633/product/85136537-2914-40aa-80f5-c64ffacc7453_f8afd9938e33473ea1ca865532c854c4_master.jpg']

    const handleChooseImg = img => {
        setImg(img)
    }
    const chooseSize = size => {
        setSize(size);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

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
                            to='/' 
                            className={classes.navLink}
                        >
                            Sản phẩm
                        </Link>
                        <Typography className={classes.typography}>
                            Tất cả sản phẩm
                        </Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div className={classes.boxImgLarge}>
                        <img style={{width: '100%'}} src={img} alt=""/>
                    </div>
                    <List className={classes.listImg}>
                        {
                            imgUrl.map((item, index) => {
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
                                San pham 1
                            </Typography>
                        </ListItem>
                        <Divider className={classes.divider} />
                        <ListItem className={classes.listItemInfor}>
                            <Typography variant="h6" className={classes.textPrice}>
                                300.000 đ
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
                <Grid item xs={6} sm={4} md={4} lg={3}>
                    <Product />
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={3}>
                    <Product />
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={3}>
                    <Product />
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={3}>
                    <Product />
                </Grid>
            </Grid> 
        </Container>
    )
}

export default ProductDetail;
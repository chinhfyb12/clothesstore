import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Button, Container, FormGroup, Grid, IconButton, List, ListItem, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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

}))

const ProductDetail = () => {

    const classes = useStyles();
    const size = ['S', 'M', 'L', 'XL'];
    const imgUrl = ['https://product.hstatic.net/1000306633/product/af7927b5-1ae5-496b-b589-d52aa69f5ea8_ca1219731ddd4163a2c3822a75fbb4f8_master.jpg', 'https://product.hstatic.net/1000306633/product/85136537-2914-40aa-80f5-c64ffacc7453_f8afd9938e33473ea1ca865532c854c4_master.jpg']

    return (
        <Container>
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
                <Grid item lg={6} md={6} sm={6}>
                    <div className={classes.boxImgLarge}>
                        <img style={{width: '100%'}} src="https://product.hstatic.net/1000306633/product/499e30c9-1681-4f82-92ac-9e988993e99d_9f371ceea2ff45d697cb2a152a9439ef_grande.jpg" alt=""/>
                    </div>
                    <List className={classes.listImg}>
                        {
                            imgUrl.map((item, index) => {
                                return (
                                    <ListItem key={index} className={classes.listItemImg}>
                                        <img style={{width: '100%'}} src={item}  alt=""/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid item lg={6} md={6} sm={6}>
                    <List>
                        <ListItem>
                            <Typography variant="h6">
                                San pham 1
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6">
                                300.000 đ
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <List>
                                {
                                    size.map((item, index) => {
                                        return (
                                            <ListItem key={index}>
                                                {item}
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </ListItem>
                        <ListItem>
                            <FormGroup>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                                <TextField
                                    type="number"
                                    defaultValue={1}
                                />
                                <IconButton>
                                    <RemoveIcon />
                                </IconButton>
                            </FormGroup>
                        </ListItem>
                        <ListItem>
                            <Button>
                                    <AddShoppingCartIcon />
                                    <Typography component='h6'>
                                        THÊM VÀO GIỎ
                                    </Typography>
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetail;
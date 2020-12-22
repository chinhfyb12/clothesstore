import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Breadcrumbs, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';

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

const Cart = () => {

    const classes = useStyles();

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
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar style={{maxWidth: 60}}>
                                <Link to='/'>
                                    <Avatar className={classes.avatar} src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/r180/102818648_738587936883572_7502889057776553100_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=R01YFQ-LuE8AX9GDVzX&_nc_ht=scontent.fhan2-4.fna&oh=35f134f9c90655f8a141cc03251d9ea6&oe=6002D74C" />
                                </Link>
                            </ListItemAvatar>
                            <div className={classes.boxListName}>
                                <div className={classes.listName}>
                                    <Typography>
                                        <Link to="/"
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                                fontFamily: 'Quicksand',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Sản phẩm 1
                                        </Link>
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontSize: '13px',
                                            fontWeight: 'normal',
                                            color: '#ababab',
                                        }}
                                    >
                                        <span>ĐEN</span>/<span>S</span>
                                    </Typography>
                                </div>
                                <div className={classes.boxQuantity}>
                                    <div className={classes.btnQuantity}>-</div>
                                    <span className={classes.divQuantity}>1</span>
                                    <div className={classes.btnQuantity}>+</div>
                                </div>
                                <div>
                                    <Typography component="p" style={{fontFamily: 'Quicksand', fontSize: '0.9rem'}}>
                                        300.000 đ
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
                                        300.000 đ
                                    </Typography>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <IconButton color='secondary'>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} className={classes.boxInfo}>
                    <Typography variant="h6" style={{fontFamily: 'Quicksand', fontWeight: 'bold'}}>
                        Thông tin đơn hàng
                    </Typography>
                    <Typography component="h6" style={{fontFamily: 'Quicksand', margin: '0.5rem 0'}}>
                        Tổng tiền: <span style={{color: 'red', fontWeight: 'bold'}}> 300.000 đ </span>
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

export default Cart;
import { Avatar, Badge, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2rem 0',
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        }
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
    }
}));

const Checkout = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={12} md={6} className={classes.boxProduct}>
                <List>
                    <ListItem className={classes.itemProduct}>
                        <ListItemAvatar className={classes.boxAvatar}>
                            <Badge color="primary" badgeContent={ 1 } style={{height: '100%'}}>
                                <Link to='/' style={{height: '100%'}}>
                                    <Avatar className={classes.avatar} src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/r180/102818648_738587936883572_7502889057776553100_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=R01YFQ-LuE8AX9GDVzX&_nc_ht=scontent.fhan2-4.fna&oh=35f134f9c90655f8a141cc03251d9ea6&oe=6002D74C" />
                                </Link>
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText>
                            <div className={classes.listInfor}>
                                <Typography>
                                    <Link to="/" style={{
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
                                <Typography>
                                    350.000đ
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <ListItem className={classes.itemProduct}>
                        <ListItemAvatar className={classes.boxAvatar}>
                            <Badge color="primary" badgeContent={ 1 } style={{height: '100%'}}>
                                <Link to='/' style={{height: '100%'}}>
                                    <Avatar className={classes.avatar} src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/r180/102818648_738587936883572_7502889057776553100_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=R01YFQ-LuE8AX9GDVzX&_nc_ht=scontent.fhan2-4.fna&oh=35f134f9c90655f8a141cc03251d9ea6&oe=6002D74C" />
                                </Link>
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText>
                            <div className={classes.listInfor}>
                                <Typography>
                                    <Link to="/" style={{
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
                                <Typography>
                                    350.000đ
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
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
                    <Typography className={classes.totalPrice}>300.000 đ</Typography>
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
                <TextField className={classes.fieldInput} id="standard-basic" type="text" label="Họ tên người nhận" required />
                <TextField className={classes.fieldInput} id="standard-basic" type="text" label="Số điện thoại người nhận" required />
                <TextField className={classes.fieldInput} id="standard-basic" type="text" label="Địa chỉ người nhận" required />
                <Button className={classes.btnFinish} variant="outlined" color="primary">
                    Hoàn tất đơn hàng
                </Button>
            </Grid>
        </Grid>
    )
}

export default Checkout;
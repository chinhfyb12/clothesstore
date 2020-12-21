import Paper from '@material-ui/core/Paper'
import React from 'react';
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

const useStyles = makeStyles(() => ({
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
        height: '60px',
        width: '60px',
    },
    avatar: {
        borderRadius: 0,
        width: '100%',
        height: '100%'
    }
}));

const Cart = props => {

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
                <ListItem>
                    <ListItemAvatar className={classes.boxAvatar}>
                        <Badge color="primary" badgeContent={ 1 } style={{height: '100%'}}>
                            <Link to='/' style={{height: '100%'}}>
                                <Avatar className={classes.avatar} src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/r180/102818648_738587936883572_7502889057776553100_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=R01YFQ-LuE8AX9GDVzX&_nc_ht=scontent.fhan2-4.fna&oh=35f134f9c90655f8a141cc03251d9ea6&oe=6002D74C" />
                            </Link>
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText>
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
                        <Typography>
                            350.000đ
                        </Typography>
                    </ListItemText>
                    <IconButton color='secondary'>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            </List>
            <div className={classes.fieldToTalMoney}>
                <span>TỔNG TIỀN:</span>
                <span style={{ marginLeft: 'auto' }}>0đ</span>
            </div>
            <ListItem style={{marginTop: '1rem'}}>
                <Button 
                    variant="outlined" 
                    color="primary"
                    className={classes.btnCheckout}
                    style={{color: '#8013e4'}}
                >
                    XEM GIỎ HÀNG
                </Button>
                <Button 
                    variant="outlined"
                    style={{ marginLeft: '10px', color: '#8013e4' }}
                    className={classes.btnCheckout}
                >
                    THANH TOÁN
                </Button>
            </ListItem>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        statusCart: state.statusCart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeStatusCart: () => dispatch({type: 'CHANGE_STATUS_CART'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
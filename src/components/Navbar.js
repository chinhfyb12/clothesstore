import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { connect } from 'react-redux';
import Search from './Search';
import Cart from './Cart';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        padding: '1rem 0',
    },
    appBar: {
        background: 'white',
        boxShadow:'none',
    },
    menuButton: {
        color: '#2b2b2b',
        marginRight: theme.spacing(2),
        marginLeft: '1rem',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0'
        }
    },
    boxIcon: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    navLink: {
        textDecoration: 'none !important',
        color: 'Black',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem'
        },
    },
    cartIcon: {
        color: '#2b2b2b',
        [theme.breakpoints.up('sm')]: {
            margin: '0 1rem'
        }
    },
    accountIcon: {
        marginRight: '1rem',
        color: '#2b2b2b',
        [theme.breakpoints.down('sm')]: {
            marginRight: '0',
        }
    },
    boxMenu: {
        position: 'absolute',
    },
    spanTag: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '8',
        display: 'block',
        background: '#00000045'
    },
    test: {
        display: 'none',
    }
}));

const Navbar = props => {

    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <Menu className={classes.test}/>
            <Search />
            <Cart />
            <AppBar className={ classes.appBar } position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="#2b2b2b"
                        aria-label="open drawer"
                        onClick={ () => props.changeStatusMenu() }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link to="/" className={classes.navLink}> Clothes Shop </Link>
                    </Typography>
                    <div className={classes.boxIcon}>
                        <IconButton 
                            aria-label="show" 
                            style={{ color: '#2b2b2b' }}
                            onClick={ () => props.changeStatusSearch() }
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton 
                            className={classes.cartIcon} 
                            aria-label="show 1 new products"
                            onClick={ () => props.changeStatusCart() }
                        >
                            <Badge badgeContent={ 1 } color="secondary">
                                 <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton 
                            edge="end" 
                            aria-label="show of current user" 
                            className={classes.accountIcon}
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            { props.statusMenu ? '' : <span onClick={ () => props.changeStatusMenu() } className={ classes.spanTag }></span>}
            { props.statusSearch ? '' : <span onClick={ () => props.changeStatusSearch() } className={ classes.spanTag }></span>}
            { props.statusCart ? '' : <span onClick={ () => props.changeStatusCart() } className={ classes.spanTag }></span>}
        </div>
    )    

}

const mapStateToProps = state => {
    return {
        statusMenu: state.statusMenu,
        statusSearch: state.statusSearch,
        statusCart: state.statusCart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeStatusMenu: () => dispatch({type: 'CHANGE_STATUS_MENU'}),
        changeStatusSearch: () => dispatch({type: 'CHANGE_STATUS_SEARCH'}),
        changeStatusCart: () => dispatch({type: 'CHANGE_STATUS_CART'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/je1hwdAq_2x.jpg'
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
import { auth, db } from '../firebase'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        padding: '0',
        background: 'none',
        position: 'sticky',
        zIndex: '9',
        top: 0,
        transition: '1s',
    },
    appBar: {
        boxShadow:'none',
        backgroundColor: 'none !important',
        transition: '.8s',
    },
    appBarTran: {
        boxShadow:'none',
        backgroundColor: '#000000b8',
        transition: '.8s',
    },
    menuButton: {
        color: '#2b2b2b',
        marginRight: theme.spacing(2),
        marginLeft: '1rem',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0'
        },
        transition: '.8s',
    },
    menuButtonTran: {
        color: 'white',
        marginRight: theme.spacing(2),
        marginLeft: '1rem',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0'
        },
        transition: '.8s',
    },
    boxIcon: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    navLink: {
        width: 70,
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem'
        },
        height: '100%'
    },
    cartIcon: {
        color: '#2b2b2b',
        [theme.breakpoints.up('sm')]: {
            margin: '0 1rem'
        },
        transition: '.8s',
    },
    cartIconTran: {
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            margin: '0 1rem'
        },
        transition: '.8s',
    },
    accountIcon: {
        marginRight: '1rem',
        color: '#2b2b2b',
        [theme.breakpoints.down('sm')]: {
            marginRight: '0',
        },
        transition: '.8s',
    },
    accountIconTran: {
        marginRight: '1rem',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            marginRight: '0',
        },
        transition: '.8s',
    },
    boxMenu: {
        position: 'absolute',
    },
    spanTag: {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '8',
        display: 'block',
        background: '#00000045',
    },
    searchIcon: {
        color: '#2b2b2b',
        transition: '.8s',
    },
    searchIconTran: {
        color: 'white',
        transition: '.8s',
    }
}));

const Navbar = props => {

    const classes = useStyles();

    const [isLogin, setIsLogin] = useState(false)

    //style navbar
    const [appBarBg, setAppBarBg] = useState('appBar')
    const appBarRef = useRef();
    appBarRef.current = appBarBg;

    const [menuButtonBg, setMenuButtonBg] = useState('menuButton')
    const menuButtonRef = useRef();
    menuButtonRef.current = menuButtonBg;

    const [searchBg, setSearchBg] = useState('searchIcon')
    const searchBgRef = useRef();
    searchBgRef.current = searchBg;

    const [cartBg, setCartBg] = useState('cartIcon')
    const cartRef = useRef();
    cartRef.current = cartBg;

    const [accountBg, setAccountBg] = useState('accountIcon')
    const accountRef = useRef();
    accountRef.current = accountBg;
    //end style

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        })
        //style navbar
        const handleScroll = () => {
            const show = window.scrollY > 200;
            if(show) {
                setAppBarBg('appBarTran')
                setMenuButtonBg('menuButtonTran')
                setSearchBg('searchIconTran')
                setCartBg('cartIconTran')
                setAccountBg('accountIconTran')
            } else {
                setAppBarBg('appBar')
                setMenuButtonBg('menuButton')
                setSearchBg('searchIcon')
                setCartBg('cartIcon')
                setAccountBg('accountIcon')
            }
        }
        document.addEventListener('scroll', handleScroll);
        //end style navbar

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [])

    //process cart
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .onSnapshot(snapshot => {
                        let cartFirebase = []
                        if(snapshot.data().cart) {
                            cartFirebase = [...snapshot.data().cart]
                        }
                        setQuantity(cartFirebase.length)
                    })
            }
        })
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){}
            else {
                if(localStorage.getItem('cart')) {
                    setQuantity(JSON.parse(localStorage.getItem('cart')).length)
                }
            }
        })
    }, [props.products])
    //end process cart

    return (
        <div className={classes.grow}>
            <Menu />
            <Search />
            <Cart />
            <AppBar className={ classes[appBarRef.current] } position="static" color="none">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes[menuButtonRef.current]}
                        color="#2b2b2b"
                        aria-label="open drawer"
                        onClick={ () => props.changeStatusMenu() }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link to="/" className={classes.navLink}>
                            <img style={{width: '100%', height: '100%'}} src={logo} alt=""/>
                        </Link>
                    </Typography>
                    <div className={classes.boxIcon}>
                        <IconButton 
                            aria-label="show" 
                            onClick={ () => props.changeStatusSearch() }
                            className={classes[searchBgRef.current]}
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton 
                            className={classes[cartRef.current]} 
                            aria-label="show 1 new products"
                            onClick={ () => props.changeStatusCart() }
                        >
                            <Badge badgeContent={ quantity } color="secondary">
                                 <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <Link to={ isLogin ? '/account' : '/login'}>
                            <IconButton 
                                edge="end" 
                                aria-label="show of current user" 
                                className={classes[accountRef.current]}
                            >
                                <AccountCircle />
                            </IconButton>
                        </Link>
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
        products: state.products,
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
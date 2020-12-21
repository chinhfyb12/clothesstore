import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Slug from '../Slug';

const useStyles = makeStyles(theme => ({
    boxMenu: {
        width: '200px',
        height: '100vh',
        position: 'fixed',
        zIndex: '9',
        [theme.breakpoints.up('sm')]: {
            width: '300px',
        },
        borderRadius: '0',
        transition: '.3s',
        transform: 'translateX(0)',
        top: 0,
    },
    boxMenuHide: {
        transform: 'translateX(-100%)'
    },
    navLink: {
        textDecoration: 'none !important',
        color: 'black',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        textTransform: 'uppercase',
        padding: '1rem',
        width: 'auto',
        display: 'block',
    },
    navItem: {
        padding: '0',
        height: 'auto',
    },
    closeBtn: { 
        marginLeft: 'auto',
        marginRight: '10px',
        marginTop: '10px',
        minWidth: '40px',
    },
    divCloseBtn: {
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'end',
    }
}));

const Menu = props => {

    const classes = useStyles();

    const listMenu = ['quần', 'áo dài', 'áo ngắn'];

    const handleClickMenu = () => {
        props.changeStatusMenu();
    }

    return (
        <Paper className={ props.statusMenu ? `${classes.boxMenu} ${classes.boxMenuHide}` : `${classes.boxMenu}` }>
            <div className={ classes.divCloseBtn }>
                <Button className={ classes.closeBtn } onClick={ () => props.changeStatusMenu() }>
                    <CloseIcon />
                </Button>
            </div>
            <MenuList>
                <MenuItem className={ classes.navItem }>
                    <Typography variant="inherit" style={{width: '100%'}}>
                        <Link onClick={handleClickMenu} className={classes.navLink} to="/">Trang chủ</Link>
                    </Typography>
                </MenuItem>
                <MenuItem className={ classes.navItem }>
                    <Typography variant="inherit" style={{width: '100%'}}>
                        <Link onClick={handleClickMenu} className={classes.navLink} to="/all">Sản phẩm</Link>
                    </Typography>
                </MenuItem>
                {
                    listMenu.map((item, index) => {
                        return (
                            <MenuItem key={index} className={ classes.navItem }>
                                <Typography variant="inherit" style={{width: '100%'}}>
                                    <Link onClick={handleClickMenu} className={classes.navLink} to={Slug(item)}>{item}</Link>
                                </Typography>
                            </MenuItem>
                        )
                    })
                }
            </MenuList>
        </Paper>
    )
}
const mapStateToProps = state => {
    return {
        statusMenu: state.statusMenu
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeStatusMenu: () => dispatch({type: 'CHANGE_STATUS_MENU'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
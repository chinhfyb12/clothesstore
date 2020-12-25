import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { db } from '../firebase';
import Slug from '../Slug';
import { Link } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core';
import convertString from '../convertString'

const useStyles = makeStyles((theme) => ({
    searchCpm: {
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
        height: '100vh',
        transition: '.3s',
        transform: 'translateX(0)',
        paddingTop: '3rem',
        overflow: 'scroll',
        [theme.breakpoints.down('sm')]: {
            width: '85%',
            padding: '1rem',
        }
    },
    hideSearchCpm: {
        transform: 'translateX(100%)'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    iconButton: {
        padding: 10,
        marginLeft: 'auto'
    },
    form: {
        display: 'flex',
        padding: '0 1rem',
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    boxTitle: {
        display: 'flex',
        padding: '0 1rem',
        alignItems: 'center',
        marginBottom: '2rem',
        fontFamily: 'Quicksand',
    },
}));

const Search = props => {

    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [productsSearch, setProductsSearch] = useState([])

    const handleClick = path => {
        props.sendPath(path)
        props.changeStatusSearch()
    }

    useEffect(() => {
        db.collection('clothes')
            .get()
            .then(snapshot => {
                if(snapshot) {
                    const listProduct = snapshot.docs.map(product => {
                        return {
                            ...product.data()
                        }
                    });
                    setProducts(listProduct);
                }
            })
    }, [])

    const handleSearch = e => {
        let tempProducts = []
        for(let product of products) {
            let index = convertString(product.nameProduct).toLowerCase().indexOf(convertString(e.target.value).toLowerCase())
            if(index >= 0) {
                tempProducts.push(product)
            }
        }
        if(e.target.value) {
            setProductsSearch(tempProducts)
        } else {
            setProductsSearch([])
        }
    }

    return (
        <Paper className={ props.statusSearch ? `${classes.searchCpm} ${classes.hideSearchCpm}` : `${classes.searchCpm}` }>
            <div className={classes.boxTitle}>
                <Typography variant="h6" noWrap>
                    TÌM KIẾM
                </Typography>
                <IconButton className={ classes.iconButton }  onClick={ () => props.changeStatusSearch() }>
                    <Close />
                </IconButton>
            </div>
            <form className={classes.form}>
                <TextField 
                    id="standard-secondary" 
                    label="Tìm kiếm sản phẩm" 
                    color="lightBlue" 
                    style={{ width: '-webkit-fill-available' }}
                    onChange={ e => handleSearch(e) }
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={ classes.iconButton } type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </form>
            <List>
                {
                    productsSearch.map((product, index) => {
                        return (
                            <ListItem key={index}>
                                <Link 
                                    to={`/${Slug(product.nameCategory)}/${Slug(product.nameProduct)}.${product.codeProduct}`}
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                    }}
                                    onClick={ () => handleClick(Slug(product.nameCategory)) }
                                >
                                    { product.nameProduct }
                                </Link>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        statusSearch: state.statusSearch
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeStatusSearch: () => dispatch({type: 'CHANGE_STATUS_SEARCH'}),
        sendPath: path => dispatch({type: "SEND_PATH", path}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

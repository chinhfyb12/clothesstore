import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

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
        minHeight: '100vh',
        transition: '.3s',
        transform: 'translateX(0)',
        paddingTop: '3rem',
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
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={ classes.iconButton } type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </form>
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
        changeStatusSearch: () => dispatch({type: 'CHANGE_STATUS_SEARCH'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

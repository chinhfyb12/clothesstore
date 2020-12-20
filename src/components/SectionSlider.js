import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ListItem from '@material-ui/core/Grid';
import List from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: '1',
    },
    listIcon: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: '1rem',
        background: 'white',
    },
    itemIcon: {
        borderRadius: 0,
        color: 'black',
    },
    divider: {
        height: 40,
        margin: 4,
    },
}))

const SectionSlider = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} style={{position: 'relative'}}>
                    <img style={{width: '100%'}} src='https://theme.hstatic.net/1000306633/1000504615/14/slideshow_1.jpg?v=285' alt=""/>
                    <List className={classes.listIcon}>
                        <ListItem>
                            <IconButton className={classes.itemIcon}>
                                <ArrowBackIcon />
                            </IconButton>
                        </ListItem>
                        <Divider className={classes.divider} orientation="vertical" />
                        <ListItem>
                            <IconButton className={classes.itemIcon}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}

export default SectionSlider;
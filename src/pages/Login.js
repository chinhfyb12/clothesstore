import { Button, Container, FormGroup, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: '1px solid #e8e8e8'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
    },
    typographyTitle: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        position: 'relative',
        padding: '1.5rem 0',
        '&:after': {
            position: 'absolute',
            content: '""',
            bottom: 0,
            left: 0,
            width: '40%',
            height: '3px',
            background: 'black',
            borderRadius: '5px',
        }
    },
    gridForm: {
        padding: '8rem 2rem',
        [theme.breakpoints.down('md')]: {
            padding: '4rem 2rem',
        }
    },
    inputField: {
        margin: '1rem 0',
        backgroundColor: '#f2f4ff',
        borderRadius: 0
    }
}))

const Login = (props) => {

    let history = useHistory();

    const classes = useStyles();

    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null);

    const handleClickLogin = (e) => {
        e.preventDefault();
        props.changeStatusLoader()
        if(email && pass) {
            auth.signInWithEmailAndPassword(email, pass)
                .then(() => {
                    props.changeStatusLoader()
                    history.push('/')
                })
                .catch(() => {
                    props.changeStatusLoader()
                })
        }
    }

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.title}>
                    <Typography variant="h4" className={classes.typographyTitle}>
                        Đăng nhập
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridForm}>
                    <FormGroup>
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField 
                                id="filled-basic" 
                                label="Email"
                                variant="outlined" 
                                type="email"
                                className={classes.inputField}
                                onChange={ e => setEmail(e.target.value) }
                            />
                            <TextField 
                                id="filled-basic"
                                label="Mật khẩu"
                                variant="outlined"
                                type="password"
                                className={classes.inputField}
                                onChange={ e => setPass(e.target.value) }
                            />
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '1rem',
                            }}>
                                <Button 
                                    variant="contained"
                                    color="primary" 
                                    style={{borderRadius: 0}}
                                    onClick={ (e) => handleClickLogin(e) }
                                    type="submit"
                                >
                                    ĐĂNG NHẬP
                                </Button>
                                <Typography component="p" style={{ 
                                    margin: '0 1rem',
                                    fontStyle: 'italic',
                                    color: '#4a4a4a'
                                }}>
                                    or
                                </Typography>
                                <Link to="/register" style={{textDecoration: 'none'}}>
                                    <Button variant="outlined" color="primary" style={{borderRadius: 0}}>
                                        ĐĂNG KÝ
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </FormGroup>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLoader: () => dispatch({type: "CHANGE_STATUS_LOADER"}) 
    }
}

export default connect(null, mapDispatchToProps)(Login);
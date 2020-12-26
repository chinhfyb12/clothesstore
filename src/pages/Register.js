import { Button, Container, FormGroup, Grid, List, ListItem, Radio, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

const useStyles = makeStyles(() => ({
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
        padding: '2rem',
    },
    inputField: {
        margin: '1rem 0',
        backgroundColor: '#f2f4ff',
        borderRadius: 0
    }
}))

const Register = (props) => {

    let history = useHistory();

    const classes = useStyles();
    const [gender, setGender] = React.useState(null);
    const handleClickGender = e => {
        setGender(e)
    }
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const [name, setName] = useState(null)
    const [error, setError] = useState(false)

    const handleClickRegister = (e) => {
        e.preventDefault();
        if(email && pass && name && gender) {
            props.changeStatusLoader()
            auth.createUserWithEmailAndPassword(email, pass)
                .then(result => {
                    return result.user.updateProfile({
                        displayName: name
                    }).then(() => {
                        db.collection('users').doc(result.user.uid).set({
                            cart: []
                        }).then(() => {
                            history.push('/')
                            props.changeStatusLoader()
                            setError(false)
                        })
                    })
                }).catch(() => {
                    props.changeStatusLoader();
                    setError(true)
                })
        }
    }

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.title}>
                    <Typography variant="h4" className={classes.typographyTitle}>
                        Tạo tài khoản
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridForm}>
                    <FormGroup>
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField 
                                id="filled-basic" 
                                label="Họ tên"
                                variant="outlined" 
                                type="text"
                                className={classes.inputField}
                                onChange={ e => setName(e.target.value) }
                            />
                            <List style={{display: 'flex'}}>
                                <ListItem style={{width: 'max-content'}}>
                                    <Radio 
                                        className={classes.radio}
                                        checked={gender === 'nam'}
                                        color="primary"
                                        onClick = { () => handleClickGender('nam')}
                                    />
                                    <Typography component="p" className={classes.typographyRadio}>
                                        Nam
                                    </Typography>
                                </ListItem>
                                <ListItem style={{width: 'max-content'}}>
                                    <Radio 
                                        className={classes.radio}
                                        checked={gender === 'nu'}
                                        color="primary"
                                        onClick={() => handleClickGender('nu')}
                                    />
                                    <Typography component="p" className={classes.typographyRadio}>
                                        Nữ
                                    </Typography>
                                </ListItem>
                            </List>
                            <TextField 
                                id="filled-basic" 
                                label="Email"
                                variant="outlined" 
                                type="email"
                                className={classes.inputField}
                                onChange={ (e) => setEmail(e.target.value)}
                            />
                            <TextField 
                                id="filled-basic"
                                label="Mật khẩu"
                                variant="outlined"
                                type="password"
                                className={classes.inputField}
                                onChange={ e => setPass(e.target.value) }
                            />
                            {
                                error ? <span style={{color: 'red', fontStyle: 'italic'}}>Lỗi đăng nhập, vui lòng thử lại!</span> : ''
                            }
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '1rem',
                            }}>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    style={{borderRadius: 0}}
                                    onClick={ (e) => handleClickRegister(e) }
                                    type="submit"
                                >
                                    ĐĂNG KÝ
                                </Button>
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

export default connect(null, mapDispatchToProps)(Register);
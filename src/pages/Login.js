import { Button, Container, FormGroup, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
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

const Login = () => {

    const classes = useStyles();

    return (
        <Container>
            <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.title}>
                    <Typography variant="h4" className={classes.typographyTitle}>
                        Đăng nhập
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridForm}>
                    <FormGroup>
                        <TextField 
                            id="filled-basic" 
                            label="Email"
                            variant="outlined" 
                            type="email"
                            className={classes.inputField}
                        />
                        <TextField 
                            id="filled-basic"
                            label="Mật khẩu"
                            variant="outlined"
                            type="password"
                            className={classes.inputField}
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '1rem',
                        }}>
                            <Button variant="outlined" color="primary" style={{borderRadius: 0}}>
                                ĐĂNG NHẬP
                            </Button>
                            <Typography component="p" style={{ 
                                margin: '0 1rem',
                                fontStyle: 'italic',
                                color: '#4a4a4a'
                            }}>
                                or
                            </Typography>
                            <Button variant="outlined" color="primary" style={{borderRadius: 0}}>
                                ĐĂNG KÝ
                            </Button>
                        </div>
                    </FormGroup>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
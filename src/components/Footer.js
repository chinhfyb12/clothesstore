import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        padding: '1rem 2rem',
        borderTop: '1px solid #e8e8e8',
    },
    inforItem: {
        padding: '2rem',
    },
    textCopy: {
        textAlign: 'center',
        borderTop: '1px dashed #dddddd',
        padding: '1rem 0',
    }
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.inforItem}>
                <Typography 
                    variant="h6"
                    style={{
                        fontFamily: 'Quicksand',
                        fontWeight: 'bold',
                    }}
                >
                    THÔNG TIN LIÊN HỆ
                </Typography>
                <List>
                    <ListItem style={{paddingLeft: 0, paddingRight: 0}}>
                        Email: helloworld123@gmail.com
                    </ListItem>
                    <ListItem style={{paddingLeft: 0, paddingRight: 0}}>
                        SĐT: 0987654321
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.inforItem}>
                <Typography 
                    variant="h6"
                    style={{
                        fontFamily: 'Quicksand',
                        fontWeight: 'bold',
                    }}
                >
                    FOLLOW US ON INSTAGRAM
                </Typography>
                <img src="https://lh3.googleusercontent.com/fife/ABSRlIrnTdJ0keyiXYAU49hPLni3SSYpn2zXc94eIvgQInmTr_ak4B8EDUvHummd2PGhxvSZOL0qZ3ycGNzdGBlcCQtzIwG1Z5Ou2vv3kmmb6gytqtMPYRH1WRja1Y5AeEeRtCimXAZBVCBfvSjeYdPYfKgggzKLsE3WJqrccaiuIYKXtz5Tj_NSJFBlFGwuezgglFad58a5NBLcGvfYJozB7WiE3d1tDc4VLYvGf8VoRixBgeIMQ934ICTcwsQqRAiB1djhphUMEG0H06tOobTmfi-pE-lcfmJJ-B28BvChpgivELmNzU-dFu746jvep6Zx0u7ifWadz6ZDlCzuEnhxqC25x5NgK9LhSdOcZTOL2P2zb-mFqpanZrGHwWhOxKmFwREYLgdy6r33MM_sS-XCVHHqaF16YxDCLBO8b6rkRFk4pV0u77xHTR8qy89-dbsSofzhY4kF7Pcnrr1xwqO7ynDP4p5bUDTijrKcTxyfj1B_1lmEMtupmTv7HH9r4XDsnI6YNYd_M69zIz2mTgISxS6f3m8vLikG3TG3ipGa8hoWonOc6Hc7xkeoTjfDbLsbCmKS2mQf70jR-huPr410xdU0TJj-ZUh1_Y_omslz9mOhiG8lv7MX3ucMC-yZ65Mv2bF2CAodI3WaIJ4SiarXV0biql6JHF1LZyn19qhU2kLexuO9v7KN4Grm08BCuanSxNUING4HvL-UBBB6ssF8nwELqEWH-1-mBxg=w1920-h915-ft" style={{width: '100%',}} alt=""/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textCopy}>
                Copyright © 2020 <a href="https://www.facebook.com/pdc0102/" target="_blank" style={{textDecoration: 'none', color: 'black'}}>Phạm Đình Chỉnh</a>
            </Grid>
        </Grid>
    )
}
export default Footer;
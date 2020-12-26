import { Grid, Container, Accordion, AccordionSummary, Typography, AccordionDetails, List, ListItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { db } from '../../firebase';
import ListOrder from './ListOrder';
import ListProduct from './ListProduct'
import AddNewProduct from './AddNewProduct';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '4rem 0',
        display: 'flex',
    },
    sideBar: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            height: '100vh',
        }
    },
    sideBarTool: {
        height: '100%',
        boxShadow: 'none',
        borderRadius: 0,
        background: '#3f51b5',
        color: 'white',
    },
    itemMenu: {
        cursor: 'pointer',
    },
    gridRoot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 2rem'
    },
    accordionListProduct: {
        heigth: 'fit-content',
    }
}))

const Admin = () => {

    const classes = useStyles();

    const [productsOrder, setProductsOrder] = useState([])
    const [productsRemaining, setProductsRemaining] = useState([]);

    useEffect(() => {
        db.collection('orders')
            .onSnapshot(snapshot => {
                if(snapshot) {
                    let listOrder = snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            docKey: doc.id
                        }
                    })
                    setProductsOrder(listOrder);
                }
            })
        db.collection('clothes')
            .onSnapshot(snapshot => {
                if(snapshot) {
                    let products = snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            docKey: doc.id
                        }
                    })
                    setProductsRemaining(products)
                }
            })
    }, [])

    return (
        <Container className={classes.root}>
            <div className={classes.sideBar}>
                <Accordion defaultExpanded className={classes.sideBarTool}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">
                            MENU
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem className={classes.itemMenu}>
                                DANH SÁCH MUA HÀNG
                            </ListItem>
                            <ListItem className={classes.itemMenu}>
                                DANH SÁCH SẢN PHẨM TRONG KHO
                            </ListItem>
                            <ListItem className={classes.itemMenu}>
                                THÊM SẢN PHẨM
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Grid container className={classes.gridRoot}>
                {/* <ListOrder>
                    { productsOrder }
                </ListOrder> */}
                {/* {
                    <ListProduct>
                        { productsRemaining }
                    </ListProduct>
                } */}
                <AddNewProduct />
            </Grid>
        </Container>
    )
}

export default Admin;
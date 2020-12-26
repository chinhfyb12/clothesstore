import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Button, List, ListItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatMoney from '../../formatMoney';
import {db} from '../../firebase'

const useStyles = makeStyles(() => ({
    accordionListProduct: {
        heigth: 'fit-content',
    },
}))

const ListOrder = props => {

    const classes = useStyles()

    const handleClickDone = key => {
        db.collection('orders')
            .doc(key)
            .delete()
    }

    return (
        props.children.map((product, index) => {
            return (
                <Accordion key={index} className={classes.accordionListProduct}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">
                            Order {index + 1}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem>
                                Họ tên: <span style={{marginLeft: 10}}>{product.name}</span>
                            </ListItem>
                            <ListItem>
                                SĐT: <span style={{marginLeft: 10}}>{product.phone}</span>
                            </ListItem>
                            <ListItem>
                                Địa chỉ: <span style={{marginLeft: 10}}>{product.address}</span>
                            </ListItem>
                            {
                                product.cart.map((item, index) => {
                                    return (
                                        <List key={index}>
                                            <ListItem>
                                                Sản phẩm: <span style={{marginLeft: 10}}>{item.nameProduct}</span>
                                            </ListItem>
                                            <ListItem>
                                                Size: <span style={{marginLeft: 10}}>{item.sizeChoose}</span>
                                            </ListItem>
                                            <ListItem>
                                                Số lượng: <span style={{marginLeft: 10}}>{item.quantity}</span>
                                            </ListItem>
                                            <ListItem>
                                                Giá: <span style={{marginLeft: 10}}>{formatMoney((item.price * item.quantity).toString())} đ</span>
                                            </ListItem>
                                            <ListItem>
                                                Hình ảnh: <span style={{width: '200px'}}><img style={{width: '100%'}} src={item.imgUrl[0]} alt=""/></span>
                                            </ListItem>
                                        </List>
                                    )
                                })
                            }
                        </List>
                    </AccordionDetails>
                    <Button 
                        color="primary" 
                        variant="contained"
                        style={{
                            margin: '1rem auto',
                            display: 'block'
                        }}
                        onClick={ () => handleClickDone(product.docKey) }
                    >
                        Hoàn thành
                    </Button>
                </Accordion>
            )
        })
    )
}

export default ListOrder;
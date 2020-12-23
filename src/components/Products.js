import React, { useEffect, useState } from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { auth } from '../firebase';

const Products = (props) => {

    const [cart, setCart] = useState([]);
    const [codeProduct, setCodeProduct] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {

            } else {
                if(localStorage.getItem('cart')) {
                    setCart(JSON.parse(localStorage.getItem('cart')))
                }
            }
        })
    }, [codeProduct])

    const getCodeProductAddCart = codeProduct => {
        const index = props.children.findIndex(item => item.codeProduct === codeProduct)
        setCodeProduct(index);

        let tempCart = [];
        let indexCheckExist;
        if(cart[0]) {
            tempCart = [...cart]
            indexCheckExist = cart.findIndex(item => item.codeProduct === codeProduct);
        }
        if(indexCheckExist >= 0) {
            tempCart[indexCheckExist] = {...tempCart[indexCheckExist], quantity: tempCart[indexCheckExist].quantity + 1}
        } else {
            tempCart.push({
                ...props.children[index],
                quantity: 1,
                sizeChoose: 'S'
            })
        }

        setCart(tempCart);
        auth.onAuthStateChanged(user => {
            if(user) {

            } else {
                localStorage.setItem('cart', JSON.stringify(tempCart));
            }
        })
        props.sendProductsToCart(tempCart)
    }

    if(props.children) {
        return props.children.map(product => {
            return (
                <Grid key={product.codeProduct} item lg={3} md={3} sm={4} xs={6}>
                    <Product 
                        nameProduct={product.nameProduct}
                        price={product.price}
                        nameCategory={product.nameCategory}
                        imgUrl={product.imgUrl}
                        codeProduct={product.codeProduct}
                        codeProductAddCart={ getCodeProductAddCart }
                    />
                </Grid>
            )
        })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendProductsToCart: products => dispatch({type: 'SEND_PRODUCTS_CART', products})
    }
}

export default connect(null, mapDispatchToProps)(Products);
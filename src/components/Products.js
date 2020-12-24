import React, { useEffect, useState } from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { auth, db } from '../firebase';

const Products = (props) => {

    const [cartFirebase, setCartFirebase] = useState([])
    useEffect(() => {
        auth.onAuthStateChanged(user =>  {
            if(user) {
                db.collection('users')
                    .doc(user.uid)
                    .onSnapshot(snapshot => {
                        let cartFirebase = []
                        if(snapshot.data().cart) {
                            cartFirebase = [...snapshot.data().cart]
                        }
                        setCartFirebase(cartFirebase);
                    })
            }
        })
    }, [])
    
    const handleEventClick = (codeProduct) => {
        auth.onAuthStateChanged(user => {
            if(user) {
                let cartFirebaseTemp = [...cartFirebase]
                    
                let cartTemp = []
                const index = props.children.findIndex(item => item.codeProduct === codeProduct)
                let indexCheckExist = -1;
                if(cartFirebaseTemp) {
                    cartTemp = [...cartFirebaseTemp];
                    indexCheckExist = cartFirebaseTemp.findIndex(item => item.codeProduct === codeProduct)
                }
                if(indexCheckExist >= 0) {
                    cartTemp[indexCheckExist] = {...cartTemp[indexCheckExist], quantity: cartTemp[indexCheckExist].quantity + 1}
                } else {
                    cartTemp.push({
                        ...props.children[index],
                        quantity: 1,
                        sizeChoose: 'S',
                    })
                }
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({
                        cart: [
                            ...cartTemp
                        ]
                    })
                props.sendProductsToCart(cartTemp)
            } else {
                let cartLocalhost = JSON.parse(localStorage.getItem('cart'));

                let cartTemp = []
                const index = props.children.findIndex(item => item.codeProduct === codeProduct)
                let indexCheckExist = -1;
                if(cartLocalhost) {
                    cartTemp = [...cartLocalhost];
                    indexCheckExist = cartLocalhost.findIndex(item => item.codeProduct === codeProduct)
                }
                if(indexCheckExist >= 0) {
                    cartTemp[indexCheckExist] = {...cartTemp[indexCheckExist], quantity: cartTemp[indexCheckExist].quantity + 1}
                } else {
                    cartTemp.push({
                        ...props.children[index],
                        quantity: 1,
                        sizeChoose: 'S',
                    })
                }
                
                localStorage.setItem('cart', JSON.stringify(cartTemp));
                props.sendProductsToCart(cartTemp)
            }
        })
    
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
                        getEventClickAddCart={ handleEventClick }
                    />
                </Grid>
            )
        })
    }
}

const mapStateToProps = state => {
    return {
        codeProduct: state.codeProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendProductsToCart: products => dispatch({type: 'SEND_PRODUCTS_CART', products}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
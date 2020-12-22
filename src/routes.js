import React from 'react';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Account from './pages/Account';
import ListProducts from './pages/ListProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home/>
    },
    {
        path: '/checkout',
        exact: false,
        main: () => <Checkout/>
    },
    {
        path: '/account',
        exact: false,
        main: () => <Account />
    },
    {
        path: '/all',
        exact: true,
        main: () => <ListProducts />
    },
    {
        path: '/quan',
        exact: true,
        main: () => <ListProducts />
    },
    {
        path: '/ao-dai',
        exact: true,
        main: () => <ListProducts/>
    },
    {
        path: '/ao-ngan',
        exact: true,
        main: () => <ListProducts/>
    },
    {
        path: '/login',
        exact: false,
        main: () => <Login />
    },
    {
        path: '/cart',
        exact: false,
        main: () => <Cart />
    },
    {
        path: '/register',
        exact: false,
        main: () => <Register/>
    },
    {
        path: '/detail',
        exact: false,
        main: () => <ProductDetail/>
    },
]

export default routes;
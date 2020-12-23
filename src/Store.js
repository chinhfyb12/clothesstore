import statusMenu from './components/reducers/StatusMenuReducer';
import statusSearch from './components/reducers/StatusSearchReducer';
import statusCart from './components/reducers/StatusCartReducer';
import initPathname from './components/reducers/SendInitPathnameReducer';
import pathProduct from './components/reducers/SendPathProductReducer';
import products from './components/reducers/SendProductsToCart';

const redux = require('redux')

const allReducers = redux.combineReducers({
    statusMenu,
    statusSearch,
    statusCart,
    initPathname,
    pathProduct,
    products
})

const store = redux.createStore(allReducers)

export default store;
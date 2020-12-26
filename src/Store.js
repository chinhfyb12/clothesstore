import statusMenu from './components/reducers/StatusMenuReducer';
import statusSearch from './components/reducers/StatusSearchReducer';
import statusCart from './components/reducers/StatusCartReducer';
import initPathname from './components/reducers/SendInitPathnameReducer';
import pathProduct from './components/reducers/SendPathProductReducer';
import products from './components/reducers/SendProductsToCart';
import codeProduct from './components/reducers/SendCodeProduct';
import statusLoading from './components/reducers/StateLoadingReduer';
import productsSearch from './components/reducers/SendDataToSearch';

const redux = require('redux')

const allReducers = redux.combineReducers({
    statusMenu,
    statusSearch,
    statusCart,
    initPathname,
    pathProduct,
    products,
    codeProduct,
    statusLoading,
    productsSearch,
})

const store = redux.createStore(allReducers)

export default store;
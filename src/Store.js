import statusMenu from './components/reducers/StatusMenuReducer';
import statusSearch from './components/reducers/StatusSearchReducer';
import statusCart from './components/reducers/StatusCartReducer';
import initPathname from './components/reducers/SendInitPathnameReducer';
import pathProduct from './components/reducers/SendPathProductReducer';

const redux = require('redux')

const allReducers = redux.combineReducers({
    statusMenu,
    statusSearch,
    statusCart,
    initPathname,
    pathProduct
})

const store = redux.createStore(allReducers)

export default store;
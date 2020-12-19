import statusMenu from './components/reducers/StatusMenu';
import statusSearch from './components/reducers/StatusSearch';
import statusCart from './components/reducers/StatusCart';

const redux = require('redux')

const allReducers = redux.combineReducers({
    statusMenu,
    statusSearch,
    statusCart,
})

const store = redux.createStore(allReducers)

export default store;
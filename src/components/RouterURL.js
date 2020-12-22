import React from 'react';
import { Switch, Route } from "react-router-dom";
import routes from '../routes';
import { connect } from 'react-redux';
import ProductDetail from '../pages/ProductDetail'

const RouterURL = props => {
    function showRouterURL(routes) {
        let result = null;
        if(routes) {
            result = routes.map(item => {
                return (
                    <Route key={item.path} path={item.path} exact={item.exact}>
                        { item.main }
                    </Route>
                )
            })
        }
        return result;
    }

    return(
        <Switch>
            { showRouterURL(routes) }
            <Route path={props.pathProduct === null ? props.initPathname : `/${props.pathProduct}/:slug.:id`} exact={true}>
                <ProductDetail />
            </Route>
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        pathProduct: state.pathProduct,
        initPathname: state.initPathname
    }
}

export default connect(mapStateToProps)(RouterURL);
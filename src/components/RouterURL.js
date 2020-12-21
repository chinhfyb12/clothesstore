import React from 'react';
import { Switch, Route } from "react-router-dom";
import routes from '../routes';

const RouterURL = () => {
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
        </Switch>
    )
}

export default RouterURL;
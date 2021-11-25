import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { topRoutes } from "constants/routes.js";
import { battles } from "constants/pages.js";

export default function App() {
    return (
        <Switch>
            {topRoutes.map((route, index) => 
                <Route 
                    path={route.path} 
                    children={<route.children />} 
                    key={index}
                    exact={route.exact} 
                />
            )}
            <Redirect from="/" to={battles} />
        </Switch>
    );
}

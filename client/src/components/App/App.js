import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { 
    activate, 
    battles, 
    restore, 
    restore_psw 
} from "../../shared/constants/pages.js";

import Main from "../Main/Main";
import Activate from "../Activate/Activate";
import RestoreAccount from "../Restore/RestoreAccount/RestoreAccount";
import RestorePassword from "../Restore/RestorePassword/RestorePassword";

export default function App() {
    return (
        <Switch>
            <Route path={activate} component={Activate} />
            <Route path={battles} component={Main} />
            <Route path={restore} component={RestoreAccount} />
            <Route path={restore_psw} component={RestorePassword} />
            <Redirect from="/" to={battles} />
        </Switch>
    );
}

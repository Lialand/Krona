import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import InfoModal from "components/InfoModal/InfoModal";
import ApproveUserSite from "./ApproveUserSite/ApproveUserSite";
import ChangeBattle from "./ChangeBattle/ChangeBattle";
import RedactGrades from "./RedactGrades/RedactGrades";
import TransferWorksTo2Stage from "./TransferWorksTo2Stage/TransferWorksTo2Stage";
import { error as errorText } from "constants/texts";
import { 
    add_battle,
    approve_user_site,
    redact_battle,
    redact_grades,
    transfer_works
} from "constants/pages";
import "./Admin.scss";

function Admin(props) {

    const { storeAuth } = props;
    const [exception, setException] = useState({ isException: false, message: "" });
    //Для роутов используется только свойство path без url, так как роутер некорректно работает для пути вида /путь1/ + /путь2/
    const { path } = useRouteMatch();

    function handleException(message) {
        setException({ isException: true, message: message });
    }

    useEffect(() => {

        if ((!storeAuth?.data?.user?.roles?.admin || !storeAuth.isLogged) && storeAuth.isLogged !== undefined)
            handleException(errorText.admin);
    }, [storeAuth]);

    if (storeAuth.isLogged === undefined) 
        return (
            <section className="admin" />
        )
    else if (exception.isException)
        return (
            <section className="admin">
                <InfoModal
                    isError={true}
                    show={true}
                    returnToMain={true}
                    text={exception.message}
                />
            </section>
        )
    return (
        <section className="admin">
            <Switch>
                <Route path={path+approve_user_site} component={ApproveUserSite} />
                <Route path={path+redact_battle+":battleId"}>
                    <ChangeBattle handleException={handleException} typeOfChange="redact" />
                </Route>
                <Route path={path+redact_grades+":battleId"}>
                    <RedactGrades handleException={handleException} />
                </Route>
                <Route path={path+add_battle}>
                    <ChangeBattle handleException={handleException} typeOfChange="add" />
                </Route>
                <Route path={path+transfer_works+":battleId"}>
                    <TransferWorksTo2Stage handleException={handleException} />
                </Route>
            </Switch>
        </section>
    )
}

export default Admin;
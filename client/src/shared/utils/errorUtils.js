import store from "reduxFolder/store/Store";
import { getAuth } from "reduxFolder/actions/AjaxActions";

export function getErrorBehavior(error) {

    if (error?.response?.status === 401)
        store.dispatch(getAuth());
}

export function chooseException(errors, handleExceprtion) {

    for (let i = 0; i < errors.length; i++) {
        if (errors[i] !== "") {
            handleExceprtion(errors[i]);
        }
    }
}
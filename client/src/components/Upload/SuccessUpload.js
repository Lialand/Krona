import React from "react";

import withReactPortal from "../HOC/withReactPortal";

function SuccessUpload(props) {

    const { OK } = props;

    return (
        <section className="wizardWrapper">
            <div className="successModal">
                Работа успешно отправлена!
                <button
                    onClick={OK}
                >
                    Ок
                </button>
            </div>
        </section>
    );
}

export default withReactPortal(SuccessUpload);
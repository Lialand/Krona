import React from "react";

import withReactPortal from "../HOC/withReactPortal";

function SuccessUpload(props) {

    const { OK } = props;

    return (
        <section className="wizardWrapper">
            <div className="successModal">
                Работа отправлена. Она будет видна на сайте после прохождения модерации.
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
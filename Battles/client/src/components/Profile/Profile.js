import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./Profile.scss";

function Profile(props) {

    const {
        storeAuth
    } = props;

    return (
        <section className="profilePage">
            <h1 className="profileHeading">Профиль пользователя</h1>
            <div className="userData">
                <pre>
                <code>
                {JSON.stringify(storeAuth?.data)}
                </code>
                </pre>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    storeAuth: state.reducer.storeAuth,
});

export default connect(mapStateToProps, null)(Profile);
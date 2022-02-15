/**
 * Этот компонент отображает хэдер страницы баттлов.
 */

import React from "react";
import { connect } from "react-redux";

import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

import "./Header.scss";

function Header(props) {

    const { 
        openSidebar,
        battlesData,
    } = props;
    
    return (
        <>
            <div className="emptyHeader battles" id="emptyHeader" />
            <header className="headerMain moveSidebar battles" id="header">
                <HeaderTop battlesPage={true} openSidebar={openSidebar} />
                <HeaderBottom 
                    battlesPage={true} 
                    battlesCount={battlesData.length}
                />
            </header>
        </>
    );
    
}

const mapStateToProps = (state) => ({
    battlesData: state.ajaxReducer.battlesData
});

export default connect(mapStateToProps, null)(Header);

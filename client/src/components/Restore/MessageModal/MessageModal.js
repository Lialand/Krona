import React from "react";
import { Link } from "react-router-dom";

import withReactPortal from "../../HOC/withReactPortal";
import "./MessageModal.scss";

function MessageModal(props) {

    const { 
        outSideClose,
        closeModal,
        text,
        description,
        canReturnOnPage = true
    } = props;

    return (
        <section 
            className="bckgrMessageModal" 
            onClick={outSideClose}
        >
            <div className="messageModal">
                <header className="messageModalHeader">
                    {canReturnOnPage &&
                    <div onClick={closeModal} className="closeModal">
                        <img src="/assets/images/cross-white.svg" alt="Закрыть" className="closeModalImage" />
                    </div>
                    }
                    <h1 className="messageModalHeading">
                        {text}
                    </h1>
                </header>
                <p className="description">
                    {description} 
                    Попробуйте еще раз или обратитесь в Direct нашего <a href="https://www.instagram.com/krona.studio">Instagram</a>
                </p>
                {canReturnOnPage 
                    ?
                    <button className="enterbutton" onClick={closeModal}>
                        ОК
                    </button>
                    :
                    <Link to="" />
                }
            </div>
        </section>
    )
}

export default withReactPortal(MessageModal);
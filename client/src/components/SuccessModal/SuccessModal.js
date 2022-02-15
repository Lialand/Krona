import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./SuccessModal.scss";

function SuccessModal(props) {

    const { 
        OK,
        text,
        show,
        returnToMain = false,
        isError = false
    } = props;

    return (
        <Modal
            onHide={OK}
            show={show} 
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName={isError ? "successModal error" : "successModal"}
            dialogClassName="dialogClass"
            centered
        >
            {text}
            {returnToMain
                ?
                <Link to="/" className="buttonModal" >
                    Ок
                </Link>
                :
                <button onClick={OK} className="buttonModal" >
                    Ок
                </button>
            }
        </Modal>
    );
}

export default SuccessModal;
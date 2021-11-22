import React from 'react'

export default function ButtonsUnderForm(props) {
    return (
        <div className="buttons">
            {props.isMyWorks && 
            <button onClick={props.back} className="button back">
                {props.buttonBackText}
            </button>}
            <button onClick={props.send} className="button send">
                {props.buttonSendText} <img src="/assets/images/bonfire.svg" />
            </button>
        </div>
    )
}
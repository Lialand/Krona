import React from "react";

import { regInputs } from "constants/inputs";

export default function Registration(props) {

    const {
        isActivePassView,
        setIsActivePassView,
        handleOnKeyDown,
        handleChange,
        hint
    } = props;

    return (
        regInputs(isActivePassView).map(input => 
            <div className="inputGroup" key={input.name}>
                <p className="inputInfo">{input.info}</p>
                {input.name === hint &&
                    <div className="hint">
                        {
                        input.name === "login"
                            ?
                            "Допустимые символы: A-Za-z0-9_-"
                            :
                            "Нельзя использовать пробелы"
                        }
                    </div>
                }
                <input
                    name={input.name}
                    className="inputfield necessarily"
                    type={input.type}
                    onKeyDown={handleOnKeyDown}
                    onChange={handleChange}
                />
                <p className="inputInfoDesc">
                    {input.desc}
                </p>
                {input.name === "password" &&
                    <img
                        className={`showPass ${isActivePassView ? "active" : ""}`}
                        src="/assets/images/show-pass.svg"
                        alt="Показать пароль"
                        onClick={setIsActivePassView}
                    />
                }
            </div>
        )
    )
}
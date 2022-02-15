import React from "react";
import { Select } from "semantic-ui-react";

import { redactBattleInputs as inputs } from "constants/inputs";

export default function Basic({ 
    handleInputChange, 
    redactedBattleDetailed, 
    handleFile,
    categories,
    typeOfForm
}) {

    const getValue = ({ name, type }) => {
        if (name === "battleImage") {
            return undefined;
        } else if (type === "date" && redactedBattleDetailed[name]?.split("T")[1]) {
            return redactedBattleDetailed[name].split("T")[0];
        } else {
            return redactedBattleDetailed[name] || "";
        }
    }

    return (
        inputs.basic.map(input =>
            <div className="inputGroup redactBasicGroup" key={input.id}>
                <p className="prompt">{input.info}</p>
                {input.type === "select"
                    ?
                    <Select 
                        name={input.name}
                        defaultValue={redactedBattleDetailed[input.name]} 
                        disabled={input.name === "battleStageId" && typeOfForm === "add"} 
                        onChange={(e, { value }) => handleInputChange({ target: { value, name: input.name, type: "select-one" } }, "Battle")}
                        className="selectStyled basicSelect"
                        options={
                            input.name === "categoryId" 
                                ? categories?.map(category => (
                                    {
                                        key: category.id,
                                        value: category.id,
                                        text: category.name,
                                    }
                                ))
                                : input.options.map((option, index) => (
                                    {
                                        key: index,
                                        value: option.value,
                                        text: option.name,
                                    }
                                ))
                        }
                    />
                    :
                    <input
                        name={input.name}
                        className="inputfield necessarily"
                        type={input.type || "text"}
                        min={0}
                        onChange={e => input.name === "battleImage" 
                            ? handleFile(e) 
                            : handleInputChange(e, "Battle")
                        }
                        value={getValue(input)}
                    />
                }
            </div>
        )
    )
}
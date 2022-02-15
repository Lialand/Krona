import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { html as beautifyHtml } from "js-beautify";
import { Select } from "semantic-ui-react";

import { redactBattleInputs as inputs } from "constants/inputs";

function getEmptyStrings(count) {

    let emptyStrings = "";
    for (let i = 0; i < count; i++) {
        emptyStrings += "\n";
    }
    return emptyStrings;
}

export default function Mission({ redactedBattleDetailed, handleHTML }) {

    const [areaType, setAreaType] = useState("conditions");
    const [htmlValue, setHtmlValue] = useState("");

    useEffect(() => setHtmlValue(beautifyHtml(redactedBattleDetailed[areaType])), [areaType]);

    return (
        <div className="redactMission">
            <Select 
                placeholder={inputs.mission.find(input => input.name === areaType).info}
                className="selectStyled"
                onChange={(e, { value }) => setAreaType(value)} 
                options={inputs.mission.map(input => ({
                    key: input.id,
                    value: input.name, 
                    text: input.info
                }))}
            />
            {inputs.mission.map(input =>
                input.name === areaType &&
                <div className="redactBlocks" key={input.id}>
                    <CodeMirror
                        value={htmlValue || getEmptyStrings(15)}
                        options={{  
                            lineNumbers: true, 
                            lineWrapping: true
                        }}
                        onBeforeChange={(editor, data, value) => {
                            handleHTML(input.name, value);
                            setHtmlValue(value);
                        }}
                    />
                    <div dangerouslySetInnerHTML={{__html: redactedBattleDetailed[input.name]}} className="contentText" />
                </div>
            )}
        </div>
    )
}
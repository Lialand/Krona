import React, { useState, useEffect } from "react";

import { redactBattleInputs as inputs } from "constants/inputs";

export default function Materials({ 
    handleInputChange, 
    redactedBattleDetailed, 
    changeMaterial
}) {

    const material = (value, materialIndex) =>
        inputs.materials.map((input) =>
            <td key={input.id}>
                <input
                    name={input.name}
                    className="inputfield"
                    type="text"
                    onChange={e => handleInputChange(e, "materials", +materialIndex)}
                    value={value[input.name] || ""}
                />
            </td>
        )

    const [materials, setMaterials] = useState([]);
    useEffect(() => {

        const { materials: defaultMaterials } = redactedBattleDetailed;
        const lastMaterial = defaultMaterials[defaultMaterials.length - 1];
        if (
            lastMaterial?.description?.length && 
            lastMaterial?.href?.length || 
            !defaultMaterials || 
            defaultMaterials.length === 0
        ) 
            changeMaterial("add");
        else
            setMaterials(defaultMaterials.map((item, materialIndex) => material(item, materialIndex)))
    }, [redactedBattleDetailed]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Ссылка на видеоматериал</th>
                        <th>Описание видеоматериала</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((item, index) => 
                        <tr key={index}>
                            {item}
                            <td 
                                className="materialDelete" 
                                onClick={() => changeMaterial("remove", index)}
                            >
                                Удалить
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
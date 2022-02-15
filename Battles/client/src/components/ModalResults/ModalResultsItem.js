import React from "react";

export default function ModalResults(props) {

    const {
        detailedData
    } = props;

    return (
        <div className="scrollModalWrapper"> 
            {
                detailedData?.map((param, key) =>
                    <table key={key}>
                        <thead>
                            <tr>
                                <td className="name">{param.name}</td>
                                {param.grade !== null && param.maxValue 
                                    ? <td className="grade">{`${param.grade}/${param.maxValue}`}</td>
                                    : <td></td>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                            param?.details?.map((item, key) => 
                                <tr key={"Nested_table"+key}>
                                    <td className="nameDetailed">{item.name}</td>
                                    <td className="gradeDetailed">{item.maxValue
                                        ? `${item.grade}/${item.maxValue}`
                                        : item.grade}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
};
import React, { useState, useEffect } from "react";
import { Icon, Select } from "semantic-ui-react";

import { 
    getSameTypeCriterions, 
    getCriterionTypes,
    getOtherSameTypeCriterions
} from "utils/criterionUtils";

export default function Criterions({ 
    changeCriterion, 
    changeCriterionType,
    handleInputChange,
    redactedBattleDetailed,
    criterions: defaultCriterions,
    changeJury,
    users
}) {

    const [criterionGroups, setCriterionGroups] = useState({});
    const [openedLists, setOpenedLists] = useState([]); 

    useEffect(() => {
        setCriterionGroups(getCriterionTypes(redactedBattleDetailed.juries, defaultCriterions?.criterionGroups))
    }, [defaultCriterions, redactedBattleDetailed]);

    return (
        <section className="redactCriterions">
            {criterionGroups?.thisBattle?.map(group => 
                <table className={openedLists.includes(group.id) ? "criterionsTable openedGroup" : "criterionsTable"} key={group.id}>
                    <thead>
                        <tr>
                            <th className="name">
                                {group.name}
                            </th>
                            <th className="juryTH">
                                Член жюри
                            </th>
                            <th className="openListTH">
                                <button 
                                    onClick={() => openedLists.includes(group.id) 
                                        ? setOpenedLists(state => [...state.filter(id => id !== group.id)]) 
                                        : setOpenedLists(state => [...state, group.id])
                                    } 
                                    className="innerBtn openList"
                                >
                                    {openedLists.includes(group.id) ? "Закрыть" : "Открыть"} список
                                </button>
                            </th>
                            <th className="deleteTH">
                                <button onClick={e => changeCriterionType("remove", group.id)} className="innerBtn delete">
                                    Удаление
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="criterionHeading">Критерии</td>
                            <td className="criterionHeading"></td>
                            <td className="criterionHeading">Макс. балл</td>
                        </tr>
                        {getSameTypeCriterions(redactedBattleDetailed.juries, group.id)?.map(jury => 
                            <tr key={jury.criterionId}>
                                <td className="name">
                                    {jury.criterion.name}
                                </td>
                                <td className="selectJuryTD">
                                    <Select
                                        search
                                        searchInput={{ type: "text" }}
                                        noResultsMessage="Пользователи не найдены"
                                        fluid
                                        clearable
                                        placeholder="Выберите пользователя"
                                        className="selectStyled selectJury"
                                        value={jury.userId}
                                        onChange={(e, { value }) => changeJury(value, jury.id)}
                                        options={users?.map(user => (
                                            {
                                                text: user.name || user.login,
                                                value: user.id,
                                                key: user.id
                                            }
                                        ))}
                                    />
                                </td>
                                <td className="maxValueTD">
                                    <input 
                                        name="maxValue" 
                                        type="number" 
                                        min={1}
                                        onChange={e => handleInputChange(e, "criterions", jury.criterionId)} 
                                        className="inputMaxValue" 
                                        value={redactedBattleDetailed.juries.find(item => jury.criterionId === item.criterionId)?.maxValue}
                                    />
                                </td>
                                <td className="deleteTH">
                                    <button onClick={() => changeCriterion("remove", {deleteIndex: +jury.criterionId})} className="innerBtn delete">
                                        Удаление
                                    </button>
                                </td>
                            </tr>
                        )}
                        {getOtherSameTypeCriterions(redactedBattleDetailed.juries, defaultCriterions?.criteries, group.id)?.length !== 0 
                            ?
                            <tr>
                                <td className="chooseCriterionTD">
                                    <select className="selectCriterion" defaultValue="default" onChange={e => e.target.value !== "default" && changeCriterion("add", { criterionGroupId: group.id, criterionId: +e.target.value })}>
                                        <option value="default">Выберите критерий</option>    
                                        {getOtherSameTypeCriterions(redactedBattleDetailed.juries, defaultCriterions?.criteries, group.id)?.map(criterion => 
                                            <option 
                                                key={criterion.id} 
                                                value={criterion.id}
                                            >{criterion.name}</option>    
                                        )}
                                    </select>
                                </td>
                            </tr>
                            : 
                            <></>
                        }
                    </tbody>
                </table>
            )}
            {criterionGroups?.other?.length !== 0
                ?
                <select defaultValue="default" onChange={e => {
                        if (e.target.value !== "default") { 
                            setOpenedLists(state => [...state, +e.target.value]);
                            changeCriterionType("add", +e.target.value);
                        }
                    }}
                >
                    <option value="default">Выберите тип критерия</option>    
                    {criterionGroups?.other?.map(group => 
                        <option key={group.id} value={group.id}>{group.name}</option>    
                    )}
                </select>
                :
                <></>
            }
        </section>
    )
}
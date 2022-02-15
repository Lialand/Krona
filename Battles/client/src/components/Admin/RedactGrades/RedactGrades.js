import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link, Redirect } from "react-router-dom";

import { 
    getGrades, 
    getCriterions, 
    changeGrades, 
    resetGrades 
} from "reduxFolder/actions/AjaxActions";
import { getCriterionTypes, getSameTypeCriterions } from "utils/criterionUtils";
import { chooseException } from "utils/errorUtils";
import { battleWithParamURL, work_viewing } from "constants/pages";
import "./RedactGrades.scss";

function getRestructedGrades(works, criterionsAll, battleId) {

    const workLinkPattern = battleWithParamURL(battleId) + work_viewing;
    const { criterionGroups, criteries } = criterionsAll;
    const thisBattleCriteries = criteries.filter(criterion => 
        works[0].grades.find(grade => 
            grade.criterionId === criterion.id));

    let restructedGrades = {
        works: [],
        criterionTypes: []
    };

    works?.map(work => restructedGrades.works.push({
        name: work.author.name || work.author.login,
        id: work.id,
        link: workLinkPattern + work.id
    }));
    getCriterionTypes(thisBattleCriteries, criterionGroups, true)?.thisBattle?.map(criterionType => 
        restructedGrades.criterionTypes.push({ 
            name: criterionType.name, 
            id: criterionType.id, 
            criterions: [] 
        })
    );
    restructedGrades?.criterionTypes?.forEach(criterionType => {
        criterionType.criterions = getSameTypeCriterions(thisBattleCriteries, criterionType.id, true).map(criterion => 
            ({ ...criterion, 
                grades: works.map(work => ({ 
                    ...work.grades.find(item => item.criterionId === criterion.id), 
                    workId: work.id 
                }))
            })
        );
    });
    
    return restructedGrades;
}

function calculateCriterionTypeSum(workId, criterionTypeId, restructedGrades) {
    
    let criterionTypeSum = 0;

    restructedGrades.criterionTypes
        .find(criterionType => criterionTypeId === criterionType.id).criterions
        .forEach(criterion => criterion.grades.forEach(item => {
            if (item.workId === workId) 
                criterionTypeSum += item.grade || 0;
        }))
        
    return Math.round10(criterionTypeSum, -1);
}   

function calculateGeneralGrade(workId, works) {

    let generalGrade = 0;
    works
        .find(item => workId === item.id).grades
        .forEach(item => generalGrade += (item.grade || 0));

    return Math.round10(generalGrade, -1);
}  

function getCellColor(grade) {

    if (grade < 1) {
        return {
            color: "white",
            backgroundColor: "red"
        }
    } else if (grade < 2) {
        return {
            color: "black",
            backgroundColor: "rgb(251, 255, 5)"
        }
    } else {
        return {
            color: "black",
            backgroundColor: "rgb(95, 235, 107)"
        }
    }
}

function RedactGrades(props) {

    const {
        handleException,

        getGrades,
        getCriterions,
        criterionsData,
        changeGrades,
        resetGrades,
        changeGradesSuccess,
        getGradesError,
        getGradesStart,
        changeGradesError
    } = props;

    const { battleId } = useParams();
    const [works, setWorks] = useState([]);
    const [restructedGrades, setRestructedGrades] = useState({});

    function changeGrade(workId, criterionId, grade) {

        setWorks(item => [
            ...item.map(work => {
                if (work.id === workId) {
                    return {
                        ...work,
                        grades: [...work.grades.map(gradeItem => {
                            if (gradeItem.criterionId === criterionId) {
                                return {
                                    ...gradeItem,
                                    grade: +grade
                                }
                            }
                            return { ...gradeItem };
                        })]
                    };
                }
                return { ...work };
            })
        ]);
    }

    useEffect(() => {

        getCriterions();
        getGrades(battleId, setWorks);
    }, []);

    useEffect(() => {

        if (works.length && criterionsData.criteries?.length)
            setRestructedGrades(getRestructedGrades(works, criterionsData, battleId));
    }, [works, criterionsData]);

    //Обработка ошибок
    useEffect(() => {
    
        chooseException([getGradesError, changeGradesError], handleException);
        if (!getGradesStart)
            resetGrades();
    }, [getGradesError, changeGradesError, changeGradesSuccess]);

    if (changeGradesSuccess) {
        return <Redirect to="" />
    }
    return (
        <>
            <table className="redactGrades">
                <caption>Оценки работ</caption>
                <thead>
                    <tr>
                        <td colSpan={2}></td>
                        {restructedGrades?.criterionTypes?.map(item => 
                            <td key={item.id} colSpan={item.criterions.length > 1 ? item.criterions.length + 1 : 1}>{item.name}</td>
                        )}
                    </tr>
                    <tr>
                        <td>Работа</td>
                        <td>Общий итоговый</td>
                        {restructedGrades?.criterionTypes?.map(item => 
                            <React.Fragment key={item.id}>
                                {item.criterions.map(criterion =>
                                    <td key={criterion.id}>{criterion.name}</td>
                                )}
                                {item.criterions.length > 1 && 
                                    <td style={{color: "red"}}>Итого</td>
                                }
                            </React.Fragment>
                        )}
                    </tr>
                </thead>
                <tbody>
                {restructedGrades?.works?.map(work =>
                    <tr key={work.id}>
                        <td>
                            <Link to={work.link}>{work.name}</Link>
                        </td>
                        <td>{calculateGeneralGrade(work.id, works)}</td>
                        {restructedGrades?.criterionTypes?.map(criterionType => 
                            <React.Fragment key={criterionType.id}>
                                {criterionType?.criterions?.map(criterion => {
                                    const grade = criterion?.grades?.find(item => item.workId === work.id)?.grade;
                                    return <td className="grade" key={criterion.id}>
                                        <input 
                                            style={getCellColor(grade || 0)} 
                                            type="number" 
                                            min={0} 
                                            onChange={e => changeGrade(work.id, criterion.id, e.target.value)} 
                                            value={grade || grade === 0 && 0} 
                                        />
                                    </td>
                                })}
                                {criterionType?.criterions?.length > 1 && 
                                    <td style={{color: "red"}}>{calculateCriterionTypeSum(work.id, criterionType.id, restructedGrades)}</td>
                                }
                            </React.Fragment>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
            <button onClick={() => changeGrades(works)} className="enterbutton">
                Сохранить
            </button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getGrades: (battleId, immediatlySetData) => dispatch(getGrades(battleId, immediatlySetData)),
    changeGrades: (grades, immediatlySetData) => dispatch(changeGrades(grades, immediatlySetData)),
    getCriterions: (immediatlySetData) => dispatch(getCriterions(immediatlySetData)),
    resetGrades: () => dispatch(resetGrades())
})

const mapStateToProps = (state) => ({
    criterionsData: state.ajaxReducer.criterionsData,
    changeGradesSuccess: state.ajaxReducer.changeGradesSuccess,
    getGradesError: state.ajaxReducer.getGradesError,
    getGradesStart: state.ajaxReducer.getGradesStart,
    changeGradesError: state.ajaxReducer.changeGradesError
})

export default connect(mapStateToProps, mapDispatchToProps)(RedactGrades);
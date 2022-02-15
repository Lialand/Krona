import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Redirect, useRouteMatch, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";

import { changeBattlePanes } from "constants/links";
import { getSameTypeCriterions } from "utils/criterionUtils";
import { redactBattleRoutes } from "constants/routes";
import {
    redact_battle_basic
} from "constants/pages";
import { newBattle } from "constants/defaultValues";
import { 
    getBattleDetailedAll, 
    changeBattleDetailedAll, 
    getCategories,
    getCriterions,
    resetChangeBattleDetailedAll,
    getUsers
} from "reduxFolder/actions/AjaxActions";
import "./ChangeBattle.scss";
import { chooseException } from "utils/errorUtils";

const convertToValidData = data => {
    let formData = new FormData();
    let objWithoutFiles = {};
    data.materials = data.materials.filter(material => material?.href);
    for (let key of Object.keys(data)) {
        if (key !== "battleImage") 
            objWithoutFiles[key] = data[key];
    }
    if (data.battleImage)
        formData.append("battleImage", data.battleImage);
    formData.append("json", JSON.stringify(objWithoutFiles));
    return formData;
}

function ChangeBattle(props) {

    const {
        typeOfChange,
        handleException,

        getBattleDetailedAllError,
        changeBattleDetailedAllError,
        changeBattleDetailedAllSuccess,
        resetChangeBattleDetailedAll,
        getBattleDetailedAll,
        changeBattleDetailedAll,
        getCategories,
        getCriterions,
        getUsers,
        lastBattleData
    } = props;
    
    const form = useRef(null);
    const { battleId } = useParams();
    const { path, url } = useRouteMatch();
    const [redactedBattleDetailed, setRedactedBattleDetailed] = useState({});
    const [otherData, setOtherData] = useState({});
    const emptyMaterial = {
        href: "",
        description: "",
        type: "video"
    };

    //Добавление/удаление id пользователя в соответствующее роли поле
    function changeRole(action, role, userId) {

        userId = +userId;
        if (action === "remove") {
            console.log(`Роль удалена: ${role} для id: ${userId}`);
            if (role === "juries") {
                setRedactedBattleDetailed(state => ({
                    ...state,
                    juries: [...state.juries.map(jury => {
                        if (jury.userId === userId) {
                            return {
                                ...jury,
                                userId: null
                            }
                        }
                        return { ...jury };
                    })]
                }));
            } else {
                setRedactedBattleDetailed(state => ({
                    ...state,
                    [role]: [...state[role].filter(item => item.userId !== userId)]
                }));
            }
        } else {
            console.log(`Добавлена роль: ${role} для id: ${userId}`);
            setRedactedBattleDetailed(state => ({
                ...state,
                [role]: [...state[role], { userId: userId }]
            }));
        }
    }

    //Привязка/удаление члена жюри к определённому критерию
    function changeJury(userId, juryId) {

        userId = +userId;
        juryId = +juryId;
        console.log(`${userId === 0 ? "Удалён" : "Добавлен"} член жюри: ${userId} для id: ${juryId}`);
        setRedactedBattleDetailed(state => ({
            ...state,
            juries: [...state.juries.map(jury => {
                if (jury.id === juryId) {
                    if (userId === 0) {
                        return {
                            ...jury,
                            userId: null
                        }
                    } else {
                        return {
                            ...jury,
                            userId: userId
                        }
                    }
                }
                return jury;
            })]
        }));
    }

    //Распределение ролей с последнего баттла для редактируемого
    function distributePrevBattleRoles(lastBattleDetailed = {}) {

        if (!lastBattleDetailed?.name) {
            getBattleDetailedAll(lastBattleData.id, distributePrevBattleRoles);
        } else {
            console.log(lastBattleDetailed);
            const { juries, battleAdmins, moderators } = lastBattleDetailed;
            setRedactedBattleDetailed(state => ({
                ...state,
                juries: juries,
                battleAdmins: battleAdmins,
                moderators: moderators
            }));
        }
    }

    //Добавление/удаление объекта с двумя полями (материал) для последующей записи в handleInputChange
    function changeMaterial(action, deleteIndex) {

        if (action === "remove") {
            console.log("Удалён материал");
            setRedactedBattleDetailed(state => ({
                ...state,
                materials: [...state?.materials?.filter((_, index) => index !== deleteIndex)]
            }));
        } else {
            console.log("Добавлен новый материал");
            setRedactedBattleDetailed(state => ({
                ...state,
                materials: !state.materials 
                    ? [emptyMaterial]
                    : [...state.materials, emptyMaterial]
            }));
        }
    }

    //Добавление/удаление типа критерия оценок баттла 
    function changeCriterionType(action, elementIndex) {

        if (action === "remove") {
            console.log(`Удалён тип критерия: ${elementIndex}`);
            setRedactedBattleDetailed(state => ({
                ...state,
                juries: [...state?.juries?.filter(jury => jury.criterion.criterionGroupId !== elementIndex)]
            }));
        } else {
            const firstCriterionOfType = getSameTypeCriterions(otherData.criterions.criteries, elementIndex, true)[0];
            const { name: criterionName, id: criterionId } = firstCriterionOfType;
            console.log(`Добавлен тип критерия: ${elementIndex} и критерий: ${criterionName}`);
            setRedactedBattleDetailed(state => ({
                ...state,
                juries: [...state?.juries, {
                    criterion: {
                        name: criterionName,
                        criterionGroupId: elementIndex 
                    }, 
                    id: [...state?.juries]?.pop()?.id + 1 || 1,
                    userId: null,
                    maxValue: 2,
                    criterionId: criterionId
                }]
            }));
        }
    }
    //Добавление/удаление критерия оценок баттла 
    function changeCriterion(action, criterion) {

        const { criterionGroupId, deleteIndex, criterionId } = criterion;
        const { criteries } = otherData.criterions;
        const name = criteries.find(criterion => criterion.id === criterionId)?.name;

        if (action === "remove") {
            console.log("Удалён критерий");
            setRedactedBattleDetailed(state => ({
                ...state,
                juries: [...state?.juries?.filter(jury => jury.criterionId !== deleteIndex)]
            }));
        } else {
            console.log(`Добавлен новый критерий: ${name}`);
            setRedactedBattleDetailed(state => ({
                ...state,
                juries: [...state?.juries, {
                    criterion: {
                        name: name, 
                        criterionGroupId: criterionGroupId 
                    }, 
                    id: [...state?.juries]?.pop()?.id + 1 || 1,
                    userId: null,
                    criterionId: criterionId,
                    maxValue: 2
                }]
            }));
        }
    }

    //Добавление изображения баттла
    function handleFile(e) {

        console.log("Загружено изображение баттла: ", e.target?.files[0]?.name);
        setRedactedBattleDetailed(state =>
        ({
            ...state,
            battleImage: e.target?.files[0]
        })
        )
    }

    //Добавление отредактированного текста для заданий, условий участия и призов
    function handleHTML(name, data) {

        setRedactedBattleDetailed(state =>
        ({
            ...state,
            [name]: data
        })
        )
    }

    //Добавление информации в не объектные поля
    function handleInputChange(e, formType, elementIndex) {

        const { name, value, type } = e.target;

        if (formType === "criterions") {
            setRedactedBattleDetailed(state => 
            ({
                ...state,
                juries: [...state.juries?.map(item =>
                    item.criterionId === elementIndex
                        ? { ...item, [name]: +value }
                        : { ...item }
                )]
            }));
        } else if (formType === "materials") {
            setRedactedBattleDetailed(state => 
            ({
                ...state,
                [formType]: [...state[formType]?.map((item, key) =>
                    key === elementIndex
                        ? { ...item,  [name]: value }
                        : { ...item }
                )]
            }));
        } else {
            setRedactedBattleDetailed(state =>
            ({
                ...state,
                [name]: type === "select-one" ? +value : value //Выбор из выпадающего списка передаёт числовой id
            }));
        }
    }

    //Отправка всех изменений на сервер
    function sendChanges() {

        const CHANGE = typeOfChange === "redact" 
            ? { METHOD: "put", battleId: battleId } 
            : { METHOD: "post", battleId: null } ;
        console.log(`Отправка данных: ${CHANGE.METHOD}`); 
        changeBattleDetailedAll(CHANGE.METHOD, convertToValidData(redactedBattleDetailed), CHANGE.battleId);
    }
    useEffect(() => console.log(redactedBattleDetailed, "Тип формы: ", typeOfChange, otherData), [redactedBattleDetailed]);
    useEffect(() => {
        
        getCategories(data => setOtherData(state => ({...state, categories: data}))),
        getCriterions(data => setOtherData(state => ({...state, criterions: data}))),
        getUsers(data => setOtherData(state => ({...state, users: data})))
    }, []);

    useEffect(() => {

        setOtherData(state => ({...state, typeOfForm: typeOfChange}));
        if (typeOfChange === "redact") 
            getBattleDetailedAll(battleId, setRedactedBattleDetailed);
        else 
            setRedactedBattleDetailed({ ...newBattle });
            setOtherData(state => ({...state, isLastBattle: false}));
    }, [typeOfChange]);

    useEffect(() => {

        if (redactedBattleDetailed?.id && lastBattleData?.id && typeOfChange === "redact") {
            setOtherData(state => ({...state, isLastBattle: redactedBattleDetailed?.id === lastBattleData?.id}))
        }
    }, [redactedBattleDetailed, lastBattleData, typeOfChange]);

    //Обработка ошибок
    useEffect(() => {
        
        chooseException([changeBattleDetailedAllError, getBattleDetailedAllError], handleException);
        resetChangeBattleDetailedAll();
    }, [changeBattleDetailedAllError, getBattleDetailedAllError]);

    if (redactedBattleDetailed?.name === undefined) {
        return <></>;
    } else if (changeBattleDetailedAllSuccess) {
        return <Redirect to="" />
    }
    return (
        <section className="redactBattle">
            <h1 className="adminHeading">{typeOfChange === "redact" ? "Редактировать" : "Создать"} баттл</h1>
            <Tab activeIndex={-1} renderActiveOnly={false} panes={changeBattlePanes(url)} />
            <form ref={form} onSubmit={e => e.preventDefault()} className="inputs many">
                <Switch>
                    {redactBattleRoutes.map(route =>
                        <Route
                            path={path + route.path}
                            key={route.id}
                            children={<route.children
                                redactedBattleDetailed={redactedBattleDetailed}
                                otherData={otherData}
                                handleChanges={{
                                    handleInputChange,
                                    changeMaterial,
                                    changeCriterion,
                                    changeRole,
                                    handleHTML,
                                    handleFile,
                                    changeCriterionType,
                                    changeJury,
                                    distributePrevBattleRoles
                                }}
                            />}
                        />
                    )}
                    <Redirect from={path} to={url + redact_battle_basic} />
                </Switch>
            </form>
            <button onClick={sendChanges} className="enterbutton">
                {typeOfChange === "redact" ? "Сохранить" : "Создать"}
            </button>
        </section>
    )
}

const mapStateToProps = (state) => ({
    getBattleDetailedAllData: state.ajaxReducer.getBattleDetailedAllData,
    getBattleDetailedAllError: state.ajaxReducer.getBattleDetailedAllError,
    changeBattleDetailedAllSuccess: state.ajaxReducer.changeBattleDetailedAllSuccess,
    changeBattleDetailedAllError: state.ajaxReducer.changeBattleDetailedAllError,
    lastBattleData: state.ajaxReducer.lastBattleData
});

const mapDispatchToProps = (dispatch) => ({
    getBattleDetailedAll: (battleId, immediatlySetData) => dispatch(getBattleDetailedAll(battleId, immediatlySetData)),
    changeBattleDetailedAll: (method, battleData, battleId) => dispatch(changeBattleDetailedAll(method, battleData, battleId)),
    getCategories: (immediatlySetData) => dispatch(getCategories(immediatlySetData)),
    getCriterions: (immediatlySetData) => dispatch(getCriterions(immediatlySetData)),
    getUsers: (immediatlySetData) => dispatch(getUsers(immediatlySetData)),
    resetChangeBattleDetailedAll: () => dispatch(resetChangeBattleDetailedAll())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBattle);
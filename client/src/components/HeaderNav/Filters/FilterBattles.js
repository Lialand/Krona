import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setStoreFilteredBattles } from "reduxFolder/actions/Actions";
import { filterBattles } from "utils/filterUtils";

function Filter(props) {

    const { 
        dataBattles,
        setStoreFilteredBattles
    } = props;

    const [filterActive, setFilterActive] = useState({
        all: true,
    });
    const [filteredBattlesValues, setFilteredBattlesValues] = useState({});

    useEffect(() => {
        if (dataBattles.length !== 0)
            setFilteredBattlesValues({
                active: filterBattles(dataBattles, "ACTIVE").battlesAmount(),
                completed: filterBattles(dataBattles, "COMPLETED").battlesAmount(),
                planned: filterBattles(dataBattles, "PLANNED").battlesAmount(),
                all: filterBattles(dataBattles, "ALL").battlesAmount(),
                main_screen: filterBattles(dataBattles, "MAIN_SCREEN").battlesAmount(),
                landing: filterBattles(dataBattles, "LANDING").battlesAmount(),
                promo_page: filterBattles(dataBattles, "PROMO_PAGE").battlesAmount(),
                adaptive: filterBattles(dataBattles, "ADAPTIVE").battlesAmount(),
            })
    }, [dataBattles])

    function filterActivator(filterName) {
        setFilterActive({
            [filterName]: true
        });
    }

    if (dataBattles.length === 0) 
        return <></>;
    return (
        <ul className="headerFilter filterBattles">
            <div className="iconFilter">
                <img src="/assets/images/filter.svg" />
            </div>
            <p className="headingFilter">Фильтровать по</p>
            <li className="topLevelLi">
                состояние
                <ul className="filterMenu filterMenuState">
                    {filteredBattlesValues.active !== 0 && 
                    <li 
                        className={filterActive?.active ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "ACTIVE").battles);
                                filterActivator("active");
                            }
                        }>
                        Активные <span className="filteredBattlesValue">({filteredBattlesValues.active})</span>
                    </li>}
                    {filteredBattlesValues.completed !== 0 && 
                    <li 
                        className={filterActive?.completed ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "COMPLETED").battles);
                                filterActivator("completed");
                            }
                        }>
                        Завершённые <span className="filteredBattlesValue">({filteredBattlesValues.completed})</span>
                    </li>}
                    {filteredBattlesValues.planned !== 0 && 
                    <li 
                        className={filterActive?.planned ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "PLANNED").battles);
                                filterActivator("planned");
                            }
                        }>
                        Запланированные <span className="filteredBattlesValue">({filteredBattlesValues.planned})</span>
                    </li>}
                    {filteredBattlesValues.all !== 0 && 
                    <li 
                        className={filterActive?.all ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "ALL").battles);
                                filterActivator("all");
                            }
                        }>
                        Все <span className="filteredBattlesValue">({filteredBattlesValues.all})</span>
                    </li>}
                </ul>
            </li>
            {/* <li className="topLevelLi">
                статус
                <ul className="filterMenu filterMenuStatus">
                </ul>
            </li> */}
            <li className="topLevelLi">
                категория
                <ul className="filterMenu filterMenuCategory">
                    {filteredBattlesValues.main_screen !== 0 && 
                <li 
                        className={filterActive?.main_screen ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "MAIN_SCREEN").battles);;
                                filterActivator("main_screen");
                            }
                        }>
                        Главный экран <span className="filteredBattlesValue">({filteredBattlesValues.main_screen})</span>
                    </li>}
                    {filteredBattlesValues.landing !== 0 && 
                    <li 
                        className={filterActive?.landing ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "LANDING").battles);;
                                filterActivator("landing");
                            }
                        }>
                        Лендинг <span className="filteredBattlesValue">({filteredBattlesValues.landing})</span>
                    </li>}
                    {filteredBattlesValues.promo_page !== 0 && 
                    <li 
                        className={filterActive?.promo_page ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "PROMO_PAGE").battles);;
                                filterActivator("promo_page");
                            }
                        }>
                        Промо-страница <span className="filteredBattlesValue">({filteredBattlesValues.promo_page})</span>
                    </li>}
                    {filteredBattlesValues.adaptive !== 0 && 
                    <li 
                        className={filterActive?.adaptive ? "active" : ""} 
                        onClick={() => {
                                setStoreFilteredBattles(filterBattles(dataBattles, "ADAPTIVE").battles);;
                                filterActivator("adaptive");
                            }
                        }>
                        Адаптив <span className="filteredBattlesValue">({filteredBattlesValues.adaptive})</span>
                    </li>}
                </ul>
            </li>
            {/* <li className="topLevelLi">
                направление
                <ul className="filterMenu filterMenuDirection">
                </ul>
            </li> */}
        </ul>
    )
}

const mapStateToProps = (state) => ({
    dataBattles: state.reducer.dataBattles,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreFilteredBattles: (storeFilteredBattles) => 
        dispatch(setStoreFilteredBattles(storeFilteredBattles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

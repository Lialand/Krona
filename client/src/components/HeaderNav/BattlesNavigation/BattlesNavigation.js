import React from "react";

function BattlesNavigation(props) {
    return (
        <>
        <div className="emptyNav battles" />
        <nav className="battlesNavigation">
            <ul className="battlesNavUl">
                {props.all !== 0 && props.all !== null && 
                    <li 
                        className={props.activeAll ? "active" : ""}
                        onClick={props.setAll}
                    >
                        {`Все баттлы (${props.all})`}
                    </li>
                }
                {props.active !== 0 && props.active !== null && 
                    <li 
                        className={props.activeActive ? "active" : ""}
                        onClick={props.setActive}
                    >
                        {`Активные (${props.active})`}
                    </li>
                }
                {props.completed !== 0 && props.completed !== null && 
                    <li 
                        className={props.activeCompleted ? "active" : ""}
                        onClick={props.setCompleted}
                    >
                        {`Завершённые (${props.completed})`}
                    </li>
                }
                {props.planned !== 0 && props.planned !== null && 
                    <li 
                        className={props.activePlanned ? "active" : ""}
                        onClick={props.setPlanned}
                    >
                        {`Запланированные (${props.planned})`}
                    </li>
                }
            </ul>
        </nav>
        </>
    );
};

export default BattlesNavigation;
import React from "react";
 
export default function FirstPageWizard(props) {

    const { 
        setChsdActive, 
        chsdActive, 
        setPage 
    } = props;
 
    return (
        <>
            <h3>Отправить работу на баттл</h3>
            <div className="flexrow">
                <div className="buttons sendWork">
                    <button
                        onClick={() => {setChsdActive({refreshWork: true}); setPage(2);}}
                        className="sendNewVersion"
                    >
                        <div
                            className={"choosed-symbol"}
                        />
                        <p className="head-description">Обновить работу</p>
                        <p className="description">
                            Вы уже отправляли работу на данный баттл и хотите
                            обновить уже отправленную работу
                        </p>
                    </button>
                    <button
                        onClick={() => {setChsdActive({newWork: true}); setPage(3)}}
                        className="sendNewWork"
                    >
                        <div
                            className="choosed-symbol"
                        />
                        <p className="head-description">Отправить новую работу</p>
                        <p className="description">
                            Вы еще не отправляли работу на баттл или хотите прислать
                            другую работу
                        </p>
                    </button>
                </div>
            </div>
            {/* <div className="buttons move firstScreen">
                <button
                    className="continue"
                    onClick={() =>
                        chsdActive.refreshWork
                            ? setPage(2)
                            : setPage(3)
                    }
                >
                    Продолжить
                </button>
            </div> */}
        </>
                         
     );
}


 
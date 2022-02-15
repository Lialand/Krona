import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Fancybox from "../Fancybox/Fancybox";

import getGridColumns from "utils/getGridColumns";

import "./Materials.scss";
import MaterialsItem from "./MaterialsItem";

function Materials(props) {

    const { 
        battleDetailedData
    } = props;

    const [materials, setMaterials] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);

    const gridMaterials = useRef(null);

    useEffect(() => {
        if (battleDetailedData?.materials) {
            setMaterials(battleDetailedData?.materials);
        }
    }, [battleDetailedData?.materials]);

    //Блок кода ниже используется для получения ширины грид-области
    const getWidth = () => {
        if (gridMaterials.current !== null) {
            setGridWidth(gridMaterials.current?.offsetWidth);
        }
    }
    useEffect(() => getWidth);
    useEffect(() => {
        
        window.addEventListener("resize", () => {
            getWidth();
        });

        return () => { 
            window.removeEventListener("resize", () => {
                getWidth();
            });
        }
    }, [])
    //////////////////////
    
    if (materials.length === 0) 
        return <></>;
    return (
        <>
            <h1 className="materialsHeading">
                В данном разделе представлены материалы, 
                которые могут помочь пользователям в разработке проекта в рамках дизайн-баттла.
            </h1>
            <section 
                className="materials" 
                style={{gridTemplateColumns: getGridColumns(gridWidth, materials, 580)}}
                ref={gridMaterials}
            >
            <Fancybox>
                <MaterialsItem 
                    materials={materials}
                />
            </Fancybox>  
            </section>
        </>
    );
}

const mapStateToProps = (state) => ({
    battleDetailedData: state.ajaxReducer.battleDetailedData,
});

export default connect(mapStateToProps, null)(Materials);
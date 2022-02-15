function getGridColumns(gridWidth, gridBlocksArr, maxWidthBlock = 480) {

    let gridTemplateColumns;
    let gridColumn = Math.ceil(gridWidth / maxWidthBlock);
    
    if (gridBlocksArr.length <= gridColumn) {
        if (gridBlocksArr.length * maxWidthBlock < gridWidth) {
            gridTemplateColumns = 
                "repeat(auto-fit, minmax(285px, "
                +gridWidth / 
                (gridBlocksArr.length + 
                Math.round(gridWidth / (gridBlocksArr.length * maxWidthBlock)))
                +"px))";
        } else {
            gridTemplateColumns = "repeat(auto-fit, minmax(285px, 1fr))";
        }
    } else {
        gridTemplateColumns = "repeat(auto-fit, minmax(285px, 1fr))";
    }

    return gridTemplateColumns;
}

export default getGridColumns;
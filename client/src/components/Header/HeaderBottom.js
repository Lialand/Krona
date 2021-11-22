 import React from "react";
 import { Link, useLocation } from "react-router-dom";

 import  { 
     works, 
     battles,
     results,
     battleWithParamURL
} from "../../shared/constants/pages"; 

const BackButton = ({ workPage, battleName, battleId, prevPath }) => {
    return workPage
       ?
       <Link className="link" to={prevPath || battleWithParamURL(battleId)+works}><img src="/assets/images/leaf-long.svg" />{`Баттл "${battleName}"`}</Link>
       :
       <Link className="link" to={battles}><img src="/assets/images/leaf-long.svg" />Все баттлы</Link> 
}

function HeaderBottom(props) {

   const {
       battlesPage, 
       workPage, 
       battlesCount,
       battleName,
       battleId
   } = props;

   const location = useLocation();

    return (
        <div className={battlesPage ? "headerBottom battles" : "headerBottom"}>
            {battlesPage 
                ?
                <h1 className="headingBattles">{`Перечень тем дизайн-баттла (${battlesCount})`}</h1>
                :
                <BackButton prevPath={location?.state?.prevPath} workPage={workPage} battleName={battleName} battleId={battleId} />
            }
        </div>
    );
};

export default HeaderBottom;
 
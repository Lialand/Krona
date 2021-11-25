import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { formatToMonthAndYear } from "utils/formatDateUtils";

const anotherPage = {
    title: "Дизайн-баттл — бесплатный конкурс для веб-дизайнеров", 
    description: "Конкурс для веб-дизайнеров с обратной связью и призами" 
}
const battlesPage = {
    title: "Дизайн-баттл — бесплатный конкурс для веб-дизайнеров",
    description: "Конкурс для веб-дизайнеров с обратной связью и призами"
}
const worksPage = props => ({
    title: `Список работ — Дизайн-баттл ${formatToMonthAndYear(props.battleDate)}. ${props.battleName}`,
    description: "Бесплатный конкурс для веб-дизайнеров с обратной связью и призами"
})
const workViewingPage = props => ({
    title: `Работа ${props.username} — Дизайн-баттл ${formatToMonthAndYear(props.battleDate)}`,
    description: props.battleName
})
const missionPage = props => ({
    title: `Дизайн-баттл ${formatToMonthAndYear(props.battleDate)} — ${props.battleName}`,
    description: "Бесплатный конкурс для веб-дизайнеров"
})
const resultsPage = props => ({
    title: `Итоги — Дизайн-баттл ${formatToMonthAndYear(props.battleDate)}. ${props.battleName}`,
    description: "Итоги конкурса для веб-дизайнеров"
})

export default function ReactHelmet(props) {

    const { 
        isBattlesPage, 
        isWorksPage, 
        isWorkViewingPage, 
        isMissionPage,
        isResultsPage,
        
        username
    } = props;

    const [metadata, setMetadata] = useState(anotherPage);

    useEffect(() => {

        if (isBattlesPage) {
            setMetadata(battlesPage);
        } else if (isWorksPage) {
            setMetadata(worksPage(props));
        } else if (isWorkViewingPage) {
            setMetadata(workViewingPage(props));
        } else if (isMissionPage) {
            setMetadata(missionPage(props));
        } else if (isResultsPage) {
            setMetadata(resultsPage(props));
        }
    }, [username]);

    return (
        <Helmet>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
        </Helmet>
    )
}
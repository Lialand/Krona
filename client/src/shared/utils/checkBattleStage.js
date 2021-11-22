export default function checkBattleStage(x) { //возвращает статус баттла в зависимости от battleStageId (пока используется только в Header.js)
    switch(x) {
        case 1: {
            return "Запланирован"
        }
        case 2: {
            return "Первый этап. Прием работ"
        }
        case 3: {
            return "Отбор работ"
        }
        case 4: {
            return "Второй этап. Прием исправлений работ"
        }
        case 5: {
            return "Оценка работ"
        }
        case 6: {
            return "Завершен"
        }
    }
}
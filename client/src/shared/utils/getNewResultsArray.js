export default function getNewResultsArray(arr, placeValue, placeMaxValue) {
    let arrNames = arr.map(item => item.group.name); //Имена групп оценок
    let groupsNamesArray = []; //Имена групп оценок без повторения
    let groupsArray = [[]]; //Группы оценок
    let resultsArray = []; //Результат

    let num, counterSumGrades, counterSumMaxValues, totalGrades, totalMaxValue; //Счётчики
    num = counterSumGrades = counterSumMaxValues = totalGrades = totalMaxValue = 0; 

    let sumGradesArray = []; //Сумма оценок в одной группе
    let sumMaxValuesArray = []; //Сумма максимальных значений оценок в одной группе

    for (let i = 0; i < arr.length; i++) {
        groupsArray[num].push(arr[i]);

        counterSumGrades += arr[i].grade;
        counterSumMaxValues += arr[i].maxValue;

        if (arrNames[i] !== arrNames[i + 1] && arrNames[i + 1]) {
            groupsNamesArray.push(arrNames[i]);
            groupsArray.push([]);
            sumGradesArray.push(counterSumGrades);
            sumMaxValuesArray.push(counterSumMaxValues);

            totalGrades += counterSumGrades; //Итоговая оценка
            totalMaxValue += counterSumMaxValues; //Максимальная итоговая оценка

            counterSumGrades = counterSumMaxValues = 0;
            num++;
        }
        if (i === arr.length - 1) {
            groupsNamesArray.push(arrNames[i]);
            sumGradesArray.push(counterSumGrades);
            sumMaxValuesArray.push(counterSumMaxValues);
            totalGrades += counterSumGrades;
            totalMaxValue += counterSumMaxValues;
        }
    }

    resultsArray.push({
        name: "Итог", 
        details: [
            {
                name: "Итоговый балл",
                grade: totalGrades,
                maxValue: totalMaxValue
            },
            {
                name: "Место среди участников",
                grade: placeValue,
                maxValue: placeMaxValue
            }
        ]
    });
    for (let t = 0; t < groupsArray.length; t++) {
        resultsArray.push({
            name: groupsNamesArray[t], 
            grade: sumGradesArray[t], 
            maxValue: sumMaxValuesArray[t], 
            details: groupsArray[t]
        });
    }

    return resultsArray;
}
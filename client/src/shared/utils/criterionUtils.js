export function getSameTypeCriterions(juries, criterionGroupId, isCriterions = false) {
    if (isCriterions) 
        return juries.filter(criterion => criterion.criterionGroupId === criterionGroupId);
    return juries.filter(jury => jury.criterion.criterionGroupId === criterionGroupId);
}

export function getOtherSameTypeCriterions(juries, allCriterions, criterionGroupId) {
    let result = [];
    let sameTypeCriterionAll = getSameTypeCriterions(allCriterions, criterionGroupId, true);
    let juryIds = juries.map(jury => jury.criterionId);
    sameTypeCriterionAll.forEach(criterion => {
        if (!juryIds.includes(criterion.id))
            result.push(criterion);
    });
    return result;
}

export function getCriterionTypes(juries, criterionGroupsAll, isCriterions = false) {
    let result = {thisBattle: [], other: []};
    let criterionGroupsIds;
    if (isCriterions)
        criterionGroupsIds = juries.map(criterion => criterion.criterionGroupId);
    else
        criterionGroupsIds = juries.map(jury => jury.criterion.criterionGroupId);
    criterionGroupsAll?.forEach(criterionGroup => {
        if (criterionGroupsIds.includes(criterionGroup.id))
            result.thisBattle.push(criterionGroup);
        else 
            result.other.push(criterionGroup);
    });
    return result;
}

export function getCriterionsWithoutJury(juries) {
    return juries.filter(jury => !jury.userId);
}

export function getSameJuryCriterions(juries, userId) {
    return juries.filter(jury => jury.userId === +userId);
}
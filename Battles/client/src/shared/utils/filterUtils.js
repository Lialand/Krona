export function filterBattles(battles, filterType) {
    switch (filterType) {
        //Для состояния баттла
        case("ACTIVE"): 
            return {
                battles: battles.filter(
                    (param) => 
                        param.battleStageId !== 1
                        && param.battleStageId !== 6
                ), 
                battlesAmount() {
                    return this.battles.length
                }
            };
        case("COMPLETED"): 
            return {
                battles: battles.filter(
                    (param) => 
                        param.battleStageId === 6
                ), 
                battlesAmount() {
                    return this.battles.length
                }
            };
        case("PLANNED"): 
            return {
                battles: battles.filter(
                    (param) => 
                        param.battleStageId === 1
                ), 
                battlesAmount() {
                    return this.battles.length
                }
            };
        case("ALL"): 
            return {
                battles: battles, 
                battlesAmount() {
                    return this.battles.length
                }
            };
        //Для категории
        case("MAIN_SCREEN"): 
            return {
                battles: battles.filter(
                    (param) => 
                        param.category.name === "Главный экран"
                ), 
                battlesAmount() {
                    return this.battles.length
                }
            };
        case("LANDING"): 
            return {
                battles: battles.filter(
                    (param) => 
                        param.category.name === "Лендинг"
                ), 
                battlesAmount() {
                    return this.battles.length
                }
            };
        case("PROMO_PAGE"): 
            return {
                battles: battles.filter(
                    (param) => 
                        param.category.name === "Промо-страница"
                ), 
                battlesAmount() {
                    return this.battles.length
                }
            };
        case("ADAPTIVE"): 
            return {
                battles: battles.filter(
                    (param) =>
                        param.category.name === "Адаптив"
                ),
                battlesAmount() {
                    return this.battles.length
                }
            };
    };
};

export function filterWorks(works, filterType) {
    switch(filterType) {
        //Для этапов баттла
        case("FIRST_STAGE"):
            return {
                works: works, 
                worksAmount() {
                    return this.works.length
                }
            };
        case("SECOND_STAGE"):
            return {
                works: works.filter(
                    param => param.filtered
                ), 
                worksAmount() {
                    return this.works.length
                }
            };
        //Для победителей
        case("WINNERS"):
            return {
                works: "WINNERS", 
                worksAmount() {
                    return "WINNERS"
                }
            };
    }
}
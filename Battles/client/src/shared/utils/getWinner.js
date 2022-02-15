export default function getWinner(winners, workId) { 
    for (let i = 0; i < winners?.length; i++) {
        if (winners[i].id === workId) {
            return {
                isWinner: true,
                prizeWork: winners[i].prizeWork[0],
                prizeName() {
                    return this.prizeWork?.battlePrize?.prize.name;
                },
                prizeImage() {
                    if (this.prizeName() === "1 место")  {
                        return "assets/images/firstplace.svg";
                    } else if (this.prizeName() === "2 место") {
                        return "assets/images/secondplace.svg";
                    } else if (this.prizeName() === "3 место") {
                        return "assets/images/thirdplace.svg";
                    } else {
                        return null;
                    }
                }
            }
        }
    }
    return {
        isWinner: false,
        prizeWork: {},
        prizeName() {
            return null;
        },
        prizeImage() {
            return null;
        }
    };
}
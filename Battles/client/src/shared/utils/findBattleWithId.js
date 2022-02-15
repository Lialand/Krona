export default function findBattleWithId(battleId, battles) {
    return battles.filter(item => item.id === battleId)[0];
}
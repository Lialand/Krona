export default function declentionWord(num) {
    let remainder = num % 10; 
    let hundredthRemainder = num % 100;

    if (remainder === 1 && hundredthRemainder !== 11) {
        return "("+num+" работа)";
    } else if (remainder > 1 && 
        remainder < 5 && 
        (hundredthRemainder < 10 ||
        hundredthRemainder > 14)) {
        return "("+num+" работы)";
    } else {
        return "("+num+" работ)";
    };
};
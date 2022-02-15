export default function findWorkWithId(works, id) {
    for (let work in works) {
        if (works[work].id === id) {
            return {
                work: works[work],
                workArrNumber: +work
            };
        }
    }
};
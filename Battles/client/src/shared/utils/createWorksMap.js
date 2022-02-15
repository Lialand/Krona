export default function createWorksMap(works) {
    
    let worksMap = new Map();

    works.map((item, index) => worksMap.set(item.id, index+1));

    return worksMap;
}
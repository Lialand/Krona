import { Certificate } from "types";

function getItem(array: any[], CODE: string) {
    return array.filter((item: Certificate) => item.CODE === CODE);
}

export default function getCertificate(array: any[], CODE: string):Certificate | null {

    for (let i = 0; i < array.length; i++) {
        let certificateItem = getItem(array[i][1], CODE);
        if (certificateItem.length !== 0)
            return certificateItem[0];
    }
    return null;
}
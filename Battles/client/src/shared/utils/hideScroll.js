import { useEffect } from "react";

export default function hideScroll(hideScrollCondition, isUnmounting = false) {

    return useEffect(() => {
        
        const htmlClass = document?.getElementsByTagName("html")[0].classList;

        if (hideScrollCondition) {
            htmlClass.add("scrollLock");
        } else {
            htmlClass.remove("scrollLock");
        }

        if (isUnmounting)
            return () => htmlClass.remove("scrollLock");
    }, [hideScrollCondition]);
}
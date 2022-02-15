//Привязывает клавишу escape к закрытию модального окна.
//Использовать только в методе useEffect

export default function setCloseOnEsc(closeModal, remove = false) {

    const closeModalBtn = e => {
        if (e.code === "Escape") {
            closeModal();
        }
    }

    if (remove)
        return document.removeEventListener("keydown", e => closeModalBtn(e));
    else 
        return document.addEventListener("keydown", e => closeModalBtn(e));
} 
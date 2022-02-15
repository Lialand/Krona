function getImageSizes(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = src;
        image.onerror = reject;
        image.onload = () => resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    });
}

export default getImageSizes;
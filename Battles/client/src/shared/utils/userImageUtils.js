const UNIFIED_IMAGE_FORMAT = "jpeg";
const PREVIEW_IMAGE = "preview." + UNIFIED_IMAGE_FORMAT;
const WORK_IMAGE = "work." + UNIFIED_IMAGE_FORMAT;

export function getPreviewImageURL(path) {
    return path + "/" + PREVIEW_IMAGE;
}

export function getWorkImageURL(path) {
    return path + "/" + WORK_IMAGE;
}

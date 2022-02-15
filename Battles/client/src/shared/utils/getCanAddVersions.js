export default function getCanAddVersions(myWorksData) {
    return myWorksData.works?.filter(work => work.canAddVersion);
}
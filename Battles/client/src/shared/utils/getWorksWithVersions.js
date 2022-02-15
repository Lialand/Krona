export default function getWorksWithVersions(works) {

    let filtered = works?.filter(item => item.versions[0]);

    if (!filtered || filtered.length === 0)
        return [];
    return filtered;
}
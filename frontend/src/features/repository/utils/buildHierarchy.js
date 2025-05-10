export function buildHierarchy(paths) {
    let result = {};

    for (let path of paths) {
        let cleanPath = path.trim();
        let parts = cleanPath.split("\\");
        // parts.splice(0, 2); // Remove unnecessary parts
        let current = result;

        for (let part of parts) {
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];
        }
    }

    return result;
}
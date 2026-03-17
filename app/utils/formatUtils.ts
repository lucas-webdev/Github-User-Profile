// Format repository size to display in a good user perspective (KB, MB, GB)
export function formatRepoSize(sizeInKB: number): string {
    if (sizeInKB === 0) return '0 KB';

    if (sizeInKB < 1024) {
        return `${sizeInKB} KB`;
    }

    const sizeInMB = sizeInKB / 1024;

    if (sizeInMB < 1024) {
        return `${sizeInMB.toFixed(2)} MB`;
    }

    const sizeInGB = sizeInMB / 1024;
    return `${sizeInGB.toFixed(2)} GB`;
}
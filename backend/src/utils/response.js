export function shouldUseHumanReadableFormat(request) {
    const value = request.query?.humanReadable;

    return value === true || value === 'true' || value === '1' || value === 'yes';
}

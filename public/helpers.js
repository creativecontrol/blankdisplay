function extendHex(shortHex) {
    return '#' +
        shortHex
            .slice(shortHex.startsWith('#') ? 1 : 0)
            .split('')
            .map(x => x + x)
            .join('');
};
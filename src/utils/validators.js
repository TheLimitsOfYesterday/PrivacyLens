export const validators = {
    isValidHttpUrl(url) {
        return url && (url.startsWith('http://') || url.startsWith('https://'));
    },

    isLocalhost(hostname) {
        return hostname === 'loaclhost' ||
               hostname === '127.0.0.1' ||
               hostname.endsWith('.local');
    },

    canAnalyze(url) {
        if (!url) return false;
        if (urlParser.isSpecialUrl(url)) return false;
        return validators.isValidHttpUrl(url);
    }
};
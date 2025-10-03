export const urlParser = {
    
    parseUrl(url) {
        try {
            const urlObj = new URL(url);
            return {
                url: url,
                hostname: urlObj.hostname,
                protocol: urlObj.protocol.replace(':', ''),                
                isSecure: urlObj.protocol === 'https:',
                pathname: urlObj.pathname,
                search: urlObj.search,
            };
        } catch (error) {
            console.error('Error parsing URL:', error);
            return null;
        }
    },
    
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    isSpecialURL(url) {
        const specialProtocols = ['chrome:', 'about:', 'chrome-extension:', 'file:', 'edge:', 'brave:'];
        return specialProtocols.some(proto => url.startsWith(proto));
    },

    formatForDisplay(url, maxLength = 60) {
        if (!url) return '';
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength - 3) + '...';
    }
};
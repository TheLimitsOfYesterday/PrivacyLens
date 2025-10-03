export class Website {
    constructor(url, hostname, protocol, isSecure) {
        this.url = url;
        this.hostname = hostname;
        this.protocol = protocol;
        this.isSecure = isSecure;
        this.timestamp = Date.now();
    }

    isValid() {
        return this.url && this.hostname && this.protocol;
    }

    isSpecialPage() {
        const specialPages = ['chrome:', 'about:', 'chrome-extension:', 'file:',];
        return specialProtocols.some(proto => this.url.startsWith(proto));
    }

    getDisplayUrl() {
        if (this.url.length > 60) {
            return this.url.substring(0, 57) + '...';
        }
        return this.url;
    }
}
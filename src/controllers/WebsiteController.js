import { Website } from '../models/Website';
import { urlParser, validators } from '../utils/urlParser';
import { StorageService } from '../services/StorageService';
import { CONSTANTS } from '../utils/constants';

export class WebsiteController {
    constructor() {
        this.StorageService = new StorageService();
        this.currentWebsite = null;
    }

    async detectWebsite(url) {
        if (!url) return null;

        const parsedUrl = urlParser.parse(url);
        if (!parsedUrl) return null;

        const website = new Website (
            parsedUrl.url,
            parsedUrl.hostname,
            parsedUrl.protocal,
            parsedUrl.isSecure
        );

        if (website.isValid) {
            this.currentWebsite = website;
            await this.StorageService.save(CONSTANTS.STORAGE_KEYS.CURRENT_WEBSITE, {
                url: website.url,
                hostname: website.hostname,
                protocol: website.protocol,
                isSecure: website.isSecure,
                timestamp: website.timestamp
            });
            return website;
        }
        
        return null;
    }

    async getCurrentWebsite() {
        return this.currentWebsite;
    }

    canAnalyzeWebsite(website) {
        if (!website) return false;
        return validators.canAnalyze(website.url);
    }

    getWebsiteDisplayInfo(website) {
        if (!website) {
            return {
                displayUrl: 'No Website Detected',
                canAnalyze: false,
                isSecure: false,
                message: 'Please Navigate To A Website'
            };
        }

        if (website.isSpecialPage()) {
            return {
                displayUrl: website.getDisplayUrl(),
                canAnalyze: false,
                isSecure: false,
                message: 'Cannot Analyze Browser Internal Pages'
            };
        }

        return {
            displayUrl: website.getDisplayUrl(),
            fullUrl: website.url,
            hostname: website.hostname,
            canAnalyze: true,
            isSecure: website.isSecure,
            message: website.isSecure ? 'Secure Connection' : 'Insecure Connection'
        };
    }
}
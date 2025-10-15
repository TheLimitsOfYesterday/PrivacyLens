import { WebsiteController } from './WebsiteController';
import { BrowserAPIService } from '../services/BrowserAPIService.js'

export class PopupController {
    constructor() {
        this.websiteController = new WebsiteController();
        this.browserService = new BrowserAPIService();
    }

    async initialize() {
        try {
            const tab = await this.browserService.getCurrentTab();
            if (tab && tab.url) {
                const website = await this.websiteController.detectWebsite(tab.url);
                return this.websiteController.getWebsiteDisplayInfo(website);
            }
            return this.websiteController.getWebsiteDisplayInfo(null);
        } catch(error) {
            console.error('Error Initializing Popup:', error)
            return {
                displayUrl: 'Error Loading Website',
                canAnalyze: false,
                isSecure: false,
                message: 'An Error Occurred'
            };
        }
    }

    async refreshWebsiteInfo() {
        return await this.initialize();
    }
}
import { BrowserAPIService } from '../services/BrowserAPIService.js';
import { WebsiteController } from '../controllers/WebsiteController.js';

class BackgroundService {
    constructor() {
        this.browserService = new BrowserAPIService();
        this.websiteController = new WebsiteController();
        this.init();
    }

    init() {
        console.log('Privacy Lens Background Service Initialized');

        //Listen for tab updates
        this.browserService.onTabUpdated((tab) => {
            this.handleTabChange(tab);
        });

        //Listen for tab actvation
        this.browserService.onTabActivated((tab) => {
            this.handleTabChange(tab);
        });
    }

    async handleTabChange(tab) {
        if (!tab.url) return;

        console.log('Tab Changed To:', tab.url);
        const website = await this.websiteController.detectWebsite(tab.url);

        if (website && this.websiteController.canAnalyzeWebsite(website)) {
            console.log('Website Detected:', website.hostname);
            //Future: Trigger Privacy Data Collection Here
        }
    }
}

//Initialize Background Service
const backgroundService = new BackgroundService();
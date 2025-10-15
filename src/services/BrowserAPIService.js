import { createFetchableDevEnvironment } from "vite";

export class BrowserAPIService {
    async getCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            return tab;
        } catch (error) {
            console.error('Error Getting Current Tab:', error);
            return null;
        }
    }

    async getTabURL(tabId) {
        try {
            const tab = await chrome.tabs.get(tabId);
            return tab?.url;
        } catch (error) {
            console.error('Error Getting Tab URL:', error);
            return null;
        }
    }

    onTabUpdated(callback) {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.url) {
                callback(tab);
            }
        });
    }

    onTabActivated(callback) {
        chrome.tabs.onActivated.addListener(async (activeInfo) => {
            const tab = await chrome.tabs.get(activeInfo.tabId);
            if (tab.url) {
                callback(tab);
            }
        });
    }
}
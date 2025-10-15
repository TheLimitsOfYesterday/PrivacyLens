export class StorageService {
    async save (key, value) {
        try{
            await chrome.storage.local.set({ [key]: value});
            return true;
        } catch(error) {
            console.error('Error Saving To Storage:', error);
            return false;
        }
    }

    async get(key) {
        try {
            const result = await chrome.storage.local.get(key);
            return result[key];
        } catch(error) {
            console.error('Error Reading From Storage:', error);
            return null;
        }
    }

    async clear(key) {
        try {
            await chrome.storage.local.remove(key);
            return true;
        } catch(error) {
            console.error('Error Clearing Storage:', error);
            return false;
        }
    }

    async clearAll(){
        try {
            await chrome.storage.local.clear();
            return true;
        } catch(error) {
            console.error('Error Clearing All Storage:', error);
            return false;
        }
    }
}
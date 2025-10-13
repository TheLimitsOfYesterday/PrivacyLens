// -------------------------------------------------------------------------------------
// JS file to detect URLs
// 1. Will use ask Chrome which tab the user is on
// 2. What that tab's URL is
// 3. Then will simplify the display URL for popup usage
//   Ex: will use "help.amazon.com" even if user is on "help.amazon.com/something"
// -------------------------------------------------------------------------------------


// Ask Chrome which tab the user is on
// Needs Chrome's tab query to detect
export async function getTab() {
	// Flags to use to find the active tab is { active: true, currentWindow: true}
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    return tab || null;
}


// Remove paths/hash/query from display (full path and URL still used for data)
export function simplifyDomain(url) {
	// Uses URL class from JS to be able to collect hostname
	try {
		const i = new URL(url);
		return i.hostname || null;
	} catch {
		return null;
	}
}

// Export info for popup
export async function detectURL() {
	// Get tab info & full url, display url (simplified domain for popup)
	const tab = await getTab();
	const url = tab?.url || null;
	const domainDisplay = url ? simplifyDomain(url) : null;

	// Return full URL, popup URL, and tab id
	return {
		url, domainDisplay, tabId: tab?.id ?? null
	};

}
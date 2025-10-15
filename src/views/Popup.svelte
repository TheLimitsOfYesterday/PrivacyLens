<script>
    import { onMount } from 'svelte';
    import { PopupController } from '../controllers/PopupController';
    import Header from './components/Header.svelte';
    import UrlDisplay from './components/Header.svelte';
    import PrivacyScore from './components/PrivacyScore.svelte';
    import DataCollectionSummary from './components/DataCollectionSummary.svelte';
  import { on } from 'svelte/events';

    let websiteInfo = {
        displayUrl: 'Loading...',
        canAnalyze: false,
        isSecure: false,
        message: 'Initializing...'
    };
    let isLoading = true;

    const popupController = new PopupController();

    onMount(async () => {
        await loadWebsiteInfo();
    });

    async function loadWebsiteInfo() {
        isLoading = true;
        try {
            websiteInfo = await popupController.initialize();
        } catch(error) {
            console.error('Error Loading Website Info:', error)
            websiteInfo = {
                displayUrl: 'Error Loading Website',
                canAnalyze: false,
                isSecure: false,
                message: 'An Error Occurred'
            };
        } finally {
            isLoading = false;
        }
    }

    async function handleRefresh() {
        await loadWebsiteInfo();
    }
</script>
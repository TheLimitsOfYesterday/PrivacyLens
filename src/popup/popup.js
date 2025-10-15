import Popup from '../views/Popup.svelte';
import '../views/styles/app.css';

const app = new Popup({
    target: document.getElementById('app')
});

export default app;
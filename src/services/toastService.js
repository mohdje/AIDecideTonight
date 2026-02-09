import { createApp } from 'vue';
import ToastMessageComponent from '@/components/ToastMessage.vue';

const toastContainer = document.createElement('div');
document.body.appendChild(toastContainer);

let appToast = null;

export const ToastHideRequestedEventName = 'toastHideRequested';

export function showToastMessage(text) {
    if (appToast) {
        console.warn("A toast is already opened");
        return;
    }

    appToast = createApp(ToastMessageComponent, { message: text });
    appToast.mount(toastContainer);
    setTimeout(() => {
        hideToastMessage();
    }, 3000);
}

function hideToastMessage() {
    document.dispatchEvent(new CustomEvent(ToastHideRequestedEventName));
    setTimeout(() => {
        appToast.unmount();
        appToast = null;
    }, 1000);
}


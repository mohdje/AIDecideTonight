import { createApp } from 'vue';
import MediaPickerModal from '@/components/modals/MediaPickerModal.vue';
import RecommendedMediasModal from '@/components/modals/RecommendedMediasModal.vue';

const modalContainer = document.createElement('div');
document.body.appendChild(modalContainer);

let appModal = null;

export const ModalCloseRequestedEventName = 'modalCloseRequested';

export function showMediaPickerModal() {
    return showModal(MediaPickerModal);
}

export function showRecommendedMediasModal() {
    return showModal(RecommendedMediasModal);
}

export function closeModal() {
    document.dispatchEvent(new CustomEvent(ModalCloseRequestedEventName));
    setTimeout(() => {
        appModal?.unmount();
        appModal = null;
    }, 500);
}

function showModal(vueComponent) {
    if (appModal) {
        console.warn("A modal is already opened");
        return;
    }
    appModal = createApp(vueComponent);
    appModal.mount(modalContainer);
}

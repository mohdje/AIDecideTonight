<template>
    <div class="toast-message" :class="{ visible: isVisible }">
        <h3>{{ message }}</h3>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ToastHideRequestedEventName } from '@/services/toastService';

const props = defineProps({
    message: String
})

const isVisible = ref(false);

onMounted(() => {
    document.addEventListener(ToastHideRequestedEventName, onToastHideRequested);
    setTimeout(() => {
        isVisible.value = true;
    }, 10);
})

onBeforeUnmount(() => {
    document.removeEventListener(ToastHideRequestedEventName, onToastHideRequested);
});

const onToastHideRequested = () => {
    isVisible.value = false;
}
</script>

<style scoped lang="less">
@import '../variables.less';

.toast-message {
    position: fixed;
    width: 70%;
    max-width: @width-2xl;
    height: @height-sm;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: fade(rgba(197, 197, 197, 0.404), 50%);
    backdrop-filter: blur(5px);
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 3;
    border-radius: @border-radius-lg;
    border: 1px solid grey;
    transition: all 0.5s ease-out;

    &.visible {
        transform: translate(-50%, 10%);
    }

    h3 {
        text-align: center;
    }

}
</style>
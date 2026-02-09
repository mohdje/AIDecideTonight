<template>
    <div class="modal-container" :class="{ 'visible': isVisible }">
        <CustomButton v-if="enableCloseButton" theme="transparent" smallRounded class="close-btn" @click="closeModal()"
            imgSrc="/src/assets/close.svg" />
        <slot></slot>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ModalCloseRequestedEventName, closeModal } from "@/services/modalsService";
import CustomButton from "@/components/CustomButton.vue";

const props = defineProps({
    enableCloseButton: {
        type: Boolean
    }
});
const isVisible = ref(false);


onMounted(() => {
    document.addEventListener(ModalCloseRequestedEventName, onModalCloseRequested);
    setTimeout(() => {
        isVisible.value = true;
    }, 10);
})

onBeforeUnmount(() => {
    document.removeEventListener(ModalCloseRequestedEventName, onModalCloseRequested);
});

const onModalCloseRequested = () => {
    isVisible.value = false;
}
</script>
<style lang="less" scoped>
@import '@/variables.less';

.modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: fade(black, 60%);
    backdrop-filter: blur(5px);
    opacity: 0;
    transition: opacity 0.5s ease;

    &.visible {
        opacity: 1;
    }

    .close-btn {
        position: fixed;
        top: @spacing-md;
        right: 3%;
        cursor: pointer;
        z-index: 3;
    }
}
</style>
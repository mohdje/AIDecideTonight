<template>
    <ModalContainer :enableCloseButton="!isLoading">
        <LoadingAnimation v-if="isLoading" />
        <RecommendedMedias v-else :recommended-medias="recommendedMedias" />
    </ModalContainer>
</template>
<script setup lang="js">
import { onMounted, ref } from "vue";
import ModalContainer from "@/components/modals/ModalContainer.vue";
import RecommendedMedias from "@/components/RecommendedMedias.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";
import { selectedMediaType, selectedMedias } from '@/utils/store';
import { getRecommendedMedias } from "@/services/searchMediasService.js";
import { closeModal } from "@/services/modalsService.js";

const recommendedMedias = ref([])
const isLoading = ref(false)
onMounted(async () => {
    isLoading.value = true;
    recommendedMedias.value = await getRecommendedMedias(selectedMediaType.value, selectedMedias.value);

    if (recommendedMedias.value.length === 0) {
        closeModal();
    }
    isLoading.value = false;
})

</script>
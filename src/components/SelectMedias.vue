<template>
    <div class="select-medias">
        <h2>{{ title }}</h2>
        <div class="selected-medias-container">
            <div class="selected-media" v-for="i in 3" :key="i">
                <template v-if="selectedMedias[i - 1]">
                    <img :src="selectedMedias[i - 1].coverImageUrl">
                    <CustomButton theme="secondary" @on-button-click="onRemoveMediaClick(selectedMedias[i - 1])"
                        smallRounded :imgSrc="trashIcon" class="delete-btn" />
                </template>
                <template v-else>
                    <img src="/src/assets/placeholder.png" />
                    <CustomButton theme="secondary" @on-button-click="showMediaSearchModal" rounded :imgSrc="plusIcon"
                        class="add-btn" />
                </template>
            </div>
        </div>
        <CustomButton theme="secondary" :disabled="selectedMedias.length < 3"
            @on-button-click="() => emits('get-ai-recommandations')" text="AI Recommandations" />
        <button class="back-btn" @click="() => emits('back')">Back</button>
    </div>
</template>
<script setup>
import { computed, defineEmits } from "vue";
import { selectedMediaType, selectedMedias } from '@/utils/store';
import { showMediaPickerModal } from "@/services/modalsService";
import CustomButton from '@/components/CustomButton.vue';

import plusIcon from '@/assets/plus.svg';
import trashIcon from '@/assets/trash.svg';

const title = computed(() => `To have recommendations fitting your taste, pick three ${selectedMediaType.value.labelPluralLowerCase} you like :`);

const emits = defineEmits([
    "get-ai-recommandations",
    "back"
]);
const showMediaSearchModal = () => {
    showMediaPickerModal();
}

const onRemoveMediaClick = (media) => {
    selectedMedias.value = selectedMedias.value.filter(m => m.id !== media.id)
}

const onGetRecommendationsClick = () => {
    emits("get-ai-recommandations");
}

</script>
<style lang="less" scoped>
@import '@/variables.less';

.select-medias {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: @spacing-md;

    .selected-medias-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: @spacing-md;
        width: 70%;
        margin: @spacing-md 0;

        @media (orientation: portrait) {
            width: 95%;
        }

        .selected-media {
            position: relative;
            width: 30%;
            max-width: 300px;

            img {
                height: auto;
                width: 100%;

                border-radius: @border-radius-lg;
                box-shadow: rgba(193, 0, 231, 0.274) 0px 7px 29px 0px;
            }

            .delete-btn {
                position: absolute;
                bottom: 4%;
                right: 2%;
            }

            .add-btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

    }

    .back-btn {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        color: white;
        font-weight: 700;
    }
}
</style>
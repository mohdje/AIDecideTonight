<template>
    <ModalContainer enableCloseButton>
        <div class="media-picker-container">
            <div class="search-section">
                <h2>{{ message }}</h2>
                <div class="media-search-input-container">
                    <transition name="fade">
                        <img v-if="textInput" class="clear-btn" src="/src/assets/close.svg" @click.stop="onClearClick"
                            :disabled="searching" />
                    </transition>
                    <input type="text" class="media-search-input"
                        :placeholder="`Type ${selectedMediaType?.labelLowerCase} title...`" v-model="textInput"
                        @click.stop :disabled="searching"></input>
                </div>
            </div>
            <div class="medias-list-container">
                <transition name="fade">
                    <img v-if="searching" class="loading-spinner" src="/src/assets/spinner.svg" alt="Loading spinner" />
                </transition>
                <transition name="fade">
                    <div v-if="!searching && searchResults.length > 0" class="medias-list">
                        <MediaElement v-for="media in searchResults" :key="media.id"
                            :cover-image-url="media.coverImageUrl"
                            :is-selected="selectedMedias.some(m => m.id === media.id)"
                            @click.stop="onMediaClick(media)" />
                    </div>
                </transition>
            </div>
        </div>
    </ModalContainer>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import ModalContainer from "@/components/modals/ModalContainer.vue";
import MediaElement from '@/components/MediaElement.vue';
import { searchMedia } from '@/services/searchMediasService';
import { showToastMessage } from '@/services/toastService';
import { selectedMediaType, selectedMedias } from '@/utils/store';

const message = computed(() =>
    searchResults.value?.length > 0 ? "Click to pick a " + selectedMediaType.value.labelLowerCase : "Start typing to search"
)
const textInput = ref("")

const searchResults = ref([])
const searching = ref(false)

let lastTextInputModificationTime = null
const msToWaitBeforeSearch = 1000;

watch(textInput, async () => {
    if (textInput.value.length >= 3) {
        lastTextInputModificationTime = new Date()
        setTimeout(async () => {
            const now = new Date()
            if ((now - lastTextInputModificationTime) >= msToWaitBeforeSearch && textInput.value.length >= 3) {
                searching.value = true;
                const result = await searchMedia(selectedMediaType.value, textInput.value)

                if (result.length === 0) {
                    showToastMessage(`No ${selectedMediaType.value.labelPluralLowerCase} found for "${textInput.value}"`);
                }

                searchResults.value = result.filter(media => media.coverImageUrl != null);
                searching.value = false;
            }

        }, msToWaitBeforeSearch);
    }
    else {
        searchResults.value = [];
    }
})

const onClearClick = () => {
    if (searching.value)
        return;

    textInput.value = "";
    searchResults.value = [];
}

const onMediaClick = (selectedMedia) => {
    const media = selectedMedias.value.find(m => m.id === selectedMedia.id)
    if (media)
        selectedMedias.value = selectedMedias.value.filter(m => m.id !== media.id)
    else {
        if (selectedMedias.value.length >= 3) {
            showToastMessage(`You can only select up to 3 ${selectedMediaType.value.labelPluralLowerCase}.`)
            return
        }
        selectedMedias.value.push(selectedMedia)
    }
}

</script>
<style lang="less" scoped>
@import '@/variables.less';

.media-picker-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    .search-section {
        height: 30%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        h2 {
            margin: 0;
        }

        .media-search-input-container {
            width: 50%;

            @media (max-width: @screen-sm) {
                width: 80%;
            }

            position: relative;

            .clear-btn {
                position: absolute;
                right: 2%;
                top: 50%;
                transform: translateY(-50%);
                width: @width-2xs;
                height: @height-3xs;
                z-index: 1;
                cursor: pointer;
                opacity: 0.8;
                border-radius: 50%;
                padding: @spacing-2xs;
                transition: all 0.5s ease;

                &:hover {
                    background-color: rgba(36, 5, 94, 0.637);
                }

                &:active {
                    background-color: rgba(64, 6, 170, 0.637);
                }
            }

            .media-search-input {
                background-color: fade(rgb(68, 68, 68), 50%);
                border-radius: @border-radius-lg;
                color: white;
                border: none;
                padding: @spacing-md 0;
                margin: @spacing-md 0;
                width: 100%;
                font-size: 1rem;
                outline: none;
                text-align: center;
                box-shadow: rgba(53, 53, 53, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
                position: relative;
            }
        }

    }

    .medias-list-container {
        position: relative;
        width: 100%;
        flex-grow: 1;
        max-height: 70%;
        overflow-y: auto;

        .loading-spinner {
            position: absolute;
            left: calc(50% - (@width-sm/2));
            width: @width-sm;
            height: auto;
            animation: rotate 1s infinite linear;
        }

        .medias-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: @spacing-xs;
            padding: @spacing-sm;
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
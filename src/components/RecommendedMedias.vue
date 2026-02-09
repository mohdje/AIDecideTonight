<template>
    <div class="recommended-medias-list-container">
        <h2 class="list-title">Your AI recommendations</h2>
        <div class="recommanded-media-container" :class="{ 'selected-media': selectedMediaIndex === index }"
            :style="{ left: computePosition(index) }" v-for="(recommandation, index) in recommendedMedias"
            :key="recommandation.media.id">
            <div class="recommended-media">
                <div class="media-info-container">
                    <img class="media-cover-img" :src="recommandation.media.coverImageUrl"
                        :alt="recommandation.media.title" />
                    <div class="media-info">
                        <h4>{{ recommandation.media.year }}</h4>
                        <h5>&#9679</h5>
                        <h3>{{ getStarsRating(recommandation.media.rating) }}</h3>
                    </div>
                </div>
                <div class="explanation-container">
                    <p class="explanation">{{ recommandation.explanation }}</p>
                    <a class="more-info" :href="mediaUrl(recommandation.media.id)" target="_blank">
                        <div>
                            <h4>More info</h4>
                        </div>
                    </a>
                </div>
                <CustomButton class="nav-medias-btn" v-if="selectedMediaIndex === index" v-show="selectedMediaIndex > 0"
                    @click="selectedMediaIndex--" smallRounded theme="transparent"
                    imgSrc="/src/assets/arrow-left.svg" />
                <CustomButton class="nav-medias-btn" v-if="selectedMediaIndex === index"
                    v-show="selectedMediaIndex < recommendedMedias.length - 1" @click="selectedMediaIndex++"
                    smallRounded theme="transparent" imgSrc="/src/assets/arrow-right.svg" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import { selectedMediaType } from "@/utils/store";

const props = defineProps({
    recommendedMedias: Array
})
const selectedMediaIndex = ref(0);

const getStarsRating = (rating) => {
    const plainStar = "★";
    const emptyStar = "☆";

    const fullStarsCount = Math.floor(rating / 2);
    return plainStar.repeat(fullStarsCount) + emptyStar.repeat(5 - fullStarsCount);
}

const mediaUrl = (mediaId) => {
    return `https://www.themoviedb.org/${selectedMediaType.value.tmdbCategory}/${mediaId}`;
}

const mediaCardWidth = computed(() => window.innerWidth > window.innerHeight ? 500 : 250);
const mediaCardWidthPx = computed(() => mediaCardWidth.value + "px");
const selectedCardScale = ref(1.2);
const computePosition = (mediaIndex) => {
    const center = (window.innerWidth / 2) - ((mediaCardWidth.value * selectedCardScale.value) / 2);
    const offset = (mediaIndex - selectedMediaIndex.value) * (mediaCardWidth.value * 1.4);
    return `${center + offset}px`;
}

</script>
<style lang="less" scoped>
@import '@/variables.less';

.recommended-medias-list-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    gap: @spacing-lg;

    .list-title {
        text-align: center;
        padding: @spacing-md;
    }

    .recommanded-media-container {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        filter: blur(5px);
        transition: all 0.5s ease;

        &.selected-media {
            filter: blur(0);
            transform: scale(v-bind(selectedCardScale)) translateY(-40%);
            z-index: 2;
        }

        .recommended-media {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: fade(rgb(75, 75, 75), 50%);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(5px);
            box-shadow: rgba(0, 0, 0, 0.527) 0px 3px 8px;
            border: fade(white, 60%) solid 1px;
            border-radius: @border-radius-md;
            padding: @spacing-md;
            gap: @spacing-sm;
            width: v-bind(mediaCardWidthPx);

            @media (orientation: portrait) {
                height: 70vh;
            }

            @media (orientation: landscape) {
                flex-direction: row;
                gap: @spacing-md;
            }

            .media-info-container {
                width: 40%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: @spacing-sm;

                @media (orientation: portrait) {
                    height: 40%;
                    width: auto;
                }

                .media-cover-img {
                    width: 100%;
                    height: auto;
                    border-radius: @border-radius-md;

                    @media (orientation: portrait) {
                        height: 75%;
                        width: auto;
                    }
                }

                .media-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: @spacing-xs;
                    padding: @spacing-2xs @spacing-base;
                    background-color: fade(rgb(98, 34, 182), 30%);
                    border-radius: @border-radius-lg;
                }
            }

            .explanation-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: @spacing-sm;

                @media (orientation: portrait) {
                    height: 60%;
                }

                .more-info {
                    text-decoration: none;

                    div {
                        background-color: #042140;
                        padding: @spacing-xs @spacing-sm;
                        border-radius: @border-radius-lg;

                        h4 {
                            background: -webkit-linear-gradient(left, #77d4a8, #00b2e3);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                    }
                }

                .explanation {
                    flex-grow: 1;
                    margin: 0;
                    overflow-y: auto;
                }
            }

            .nav-medias-btn {
                position: absolute;
                top: 50%;

                &:first-of-type {
                    left: 0;
                    transform: translate(-50%, -50%);
                }

                &:last-of-type {
                    right: 0;
                    transform: translate(50%, -50%);
                }
            }

        }
    }
}
</style>
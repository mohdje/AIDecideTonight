<template>
    <div>
        <h2>What are you in the mood for?</h2>
        <div class="media-types-container">
            <button v-rippleEffect v-for="mediaType in mediaTypes" :key="mediaType.name"
                @click="onMediaTypeClick(mediaType)">
                <img class="media-type-mosaic" :src="mediaType.mosaic" />
                <div class="media-btn-content">
                    <img :src="mediaType.icon" :alt="mediaType.name" width="50" height="50" />
                    <h3>{{ mediaType.labelPlural }}</h3>
                </div>
            </button>
        </div>
    </div>
</template>
<script setup>
import { defineEmits } from 'vue';
import { mediaTypes, selectedMediaType } from '@/utils/store';
import { vRippleEffect } from '@/utils/directives.js';

const emit = defineEmits(['media-type-selected']);

const onMediaTypeClick = (mediaType) => {
    selectedMediaType.value = mediaType;
    setTimeout(() => {
        emit('media-type-selected');
    }, 500);
}

</script>
<style lang="less">
@import '../variables.less';

.media-types-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: @spacing-md;
    margin-top: @spacing-lg;

    button {
        border: 3px solid white;
        border-radius: @border-radius-lg;
        background: linear-gradient(to right, rgb(1, 15, 95), 10%, rgb(80, 2, 80));
        padding: 0;
        display: flex;
        cursor: pointer;
        width: @width-2xl;
        height: @height-lg;
        max-width: 80%;
        max-height: 5%;
        overflow: hidden;

        @media (orientation: portrait) {
            height: @height-base;
        }

        &:hover {
            background: linear-gradient(to right, rgb(1, 15, 95), 50%, rgb(80, 2, 80));
            border: 3px solid #d477cc;
        }

        .media-type-mosaic {
            width: auto;
            height: 100%;
            opacity: 0.2;
            transition: all 0.7s ease;

            @media (orientation: portrait) {
                width: 50%;
                height: auto;
            }
        }

        &:hover .media-type-mosaic {
            transform: scale(1.1) translateX(5%);
            opacity: 0.8;
        }

        .media-btn-content {
            border-radius: inherit;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            padding-right: 15%;
            width: 100%;
            height: 100%;
            color: white;
            transition: all 0.7s ease;
        }

        &:hover .media-btn-content {
            align-items: flex-end;
            padding-right: 10%;
        }
    }
}
</style>
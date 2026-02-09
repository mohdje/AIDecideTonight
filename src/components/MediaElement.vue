<template>
    <div class="media-element" @click="onClick">
        <transition name="fade">
            <div v-if="isSelected" class="picked">
                <img src="/src/assets/check.svg">
            </div>
        </transition>
    </div>
</template>
<script setup>
import { defineEmits } from "vue";

const props = defineProps({
    coverImageUrl: String,
    isSelected: Boolean
})

const emits = defineEmits([
    "onMediaClick"
])

const coverImageUrl = props.coverImageUrl;

const onClick = () => {
    emits("onMediaClick")
}
</script>
<style lang="less" scoped>
@import '../variables.less';

.media-element {
    background-image: v-bind("'url(' + coverImageUrl + ')'");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: @border-radius-sm;
    width: @width-md;
    height: @height-md;


    @media (min-width: @screen-lg) {
        width: @width-xl;
        height: @height-xl;
    }

    cursor: pointer;
    transition: all 0.5s ease;

    &:hover {
        box-shadow: rgba(255, 255, 255, 0.3) 1px 1px 20px 1px
    }

    .picked {
        background-color: fade(black, 80%);
        width: 100%;
        height: 100%;
        border-radius: inherit;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: @height-2xs;
            width: auto;
        }
    }
}
</style>
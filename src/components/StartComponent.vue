<template>
    <div class="start-component-container">
        <div class="catch-phrase">
            <h1 class="big"><span class="hightlight">Don't waste time</span> trying to find something to watch</h1>
            <h2 class="mid">Let <span class="hightlight">AI Decide</span> Tonight
            </h2>
        </div>
        <button v-rippleEffect class="start-btn" @click="onStartClick">Find My
            Perfect Watch</button>
    </div>
</template>
<script setup>
import { defineEmits } from "vue";
import { vRippleEffect } from '@/utils/directives.js';

const emits = defineEmits([
    "startClick"
]);

function onStartClick() {
    setTimeout(() => emits('startClick'), 500)
}
</script>
<style lang="less" scoped>
@import "@/variables.less";

.start-component-container {
    padding: @spacing-lg;
    display: flex;
    flex-direction: column;
    align-items: center;

    .catch-phrase {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: @spacing-md;

        .big {
            font-weight: 400;
            font-size: 60px;
            max-width: 80%;

            @media (orientation: portrait) {
                font-size: 40px;
                max-width: 90%;
            }
        }

        .mid {
            font-weight: 400;
            font-size: 40px;

            @media (orientation: portrait) {
                font-size: 30px;
            }
        }

        .hightlight {
            background: linear-gradient(90deg, #a259ff 0%, #ff3de5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-style: italic;
        }
    }

    .start-btn {
        margin-top: @spacing-lg;
        color: white;
        border: none;
        padding: @spacing-base;
        font-size: large;
        font-weight: 600;
        cursor: pointer;
        background:
            linear-gradient(#4a144b, #0d026b) padding-box,
            linear-gradient(60deg, #a259ff, #ff008c) border-box;
        padding: 20px;
        border: 3px solid transparent;
        border-radius: 40px;
        transition: all 0.5s ease;

        &:hover {
            box-shadow: rgba(255, 255, 255, 0.589) 0px 0px 10px 6px;
        }
    }
}
</style>
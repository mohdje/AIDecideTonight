<template>
  <button :class="['app-button', theme, { 'rounded': rounded, 'rounded small': smallRounded }]" @click="handleClick()"
    :disabled="disabled">
    <img v-if="imgSrc" :src="imgSrc" />
    <h4 v-if="text">{{ text }}</h4>
  </button>
</template>
<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  theme: String,
  disabled: Boolean,
  rounded: Boolean,
  smallRounded: Boolean,
  text: String,
  imgSrc: String
});

const emits = defineEmits([
  "onButtonClick"
]);

const clickDone = ref(false)

const handleClick = () => {
  clickDone.value = true
  emits("onButtonClick");
}
</script>
<style lang="less">
@import '../variables.less';

.app-button {
  border-radius: @border-radius-md;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: none;
  padding: @spacing-base;
  font-size: large;
  font-weight: 600;
  cursor: pointer;

  &.primary {
    background: linear-gradient(168deg, rgba(192, 20, 222, 1) 0%, rgba(27, 34, 168, 1) 50%, rgba(28, 23, 92, 1) 100%);

    &:not(:disabled) {
      &:hover {
        box-shadow: rgba(121, 120, 120, 0.35) 0px 5px 15px;
      }

      &:active {
        background: linear-gradient(168deg, rgba(172, 0, 202, 1) 0%, rgba(7, 34, 148, 1) 50%, rgba(8, 3, 72, 1) 100%);
      }
    }
  }

  &.secondary {
    background: linear-gradient(168deg, #00b6df 0%, #000be9 50%, #6e67d5 100%);

    &:not(:disabled) {
      &:hover {
        box-shadow: rgba(121, 120, 120, 0.35) 0px 5px 15px;
      }

      &:active {
        background: linear-gradient(168deg, rgba(172, 0, 202, 1) 0%, rgba(7, 34, 148, 1) 50%, rgba(8, 3, 72, 1) 100%);
      }
    }
  }

  &.transparent {
    background: fade(gray, 50%);

    &:not(:disabled) {
      &:hover {
        background: fade(gray, 70%);
      }

      &:active {
        background: fade(gray, 80%);
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.rounded {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @size: @width-md;
    height: @size;
    width: @size;

    @media (orientation: portrait) {
      @size: @width-sm;
      height: @size;
      width: @size;
    }

    img {
      width: calc((@size / 2) - @spacing-xs);
      height: auto;
    }

    &.small {
      @size: @width-xs;
      height: @size;
      width: @size;

      img {
        width: calc((@size / 2) - @spacing-xs);
        height: auto;
      }
    }
  }
}
</style>
<template>
  <div class="app-container">
    <BackgroundAnimation />
    <AppHeader />
    <div class="app-content">
      <transition name="fade" mode="out-in">
        <StartComponent v-if="stepIndex === 0" @start-click="stepIndex++" />
        <MediaTypeSelector v-else-if="stepIndex === 1" @media-type-selected="stepIndex++" />
        <SelectMedias v-else-if="stepIndex === 2" @get-ai-recommandations="onGetRecommendationsClick"
          @back="stepIndex--" />
      </transition>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import BackgroundAnimation from '@/components/BackgroundAnimation.vue';
import StartComponent from '@/components/StartComponent.vue';
import SelectMedias from '@/components/SelectMedias.vue';
import MediaTypeSelector from '@/components/MediaTypeSelector.vue';
import { showRecommendedMediasModal } from "@/services/modalsService.js";


const stepIndex = ref(0);

const onGetRecommendationsClick = () => {
  showRecommendedMediasModal();
}
</script>

<style lang="less">
@import '@/variables.less';

.app-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  .app-content {
    flex-grow: 1;
    width: 100%;
    padding: @spacing-lg 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  animation: ripple-animation 0.6s linear;
  background-color: rgba(255, 255, 255, 0.7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  opacity: 0;
}

@keyframes ripple-animation {
  50% {
    transform: translate(-50%, -50%) scale(300);
    opacity: 0.5;
  }

  100% {
    transform: translate(-50%, -50%) scale(600);
    opacity: 0;
  }
}
</style>

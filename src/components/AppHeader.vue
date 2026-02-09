<template>
    <div class="app-header">
        <h1 class="main-title">What do we watch tonight ?</h1>
        <h3 class="second-title">Powered by TMDB and AI</h3>
        <a class="repo-link" href="https://www.google.com/" target="blank">
            <img src="/src/assets/github.svg" />
        </a>
    </div>
</template>
<script setup>
</script>
<style lang="less" scoped>
@import "@/variables.less";

.app-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: @spacing-md;
    padding: @spacing-sm;

    .main-title {
        background: linear-gradient(90deg, #a259ff 0%, #3d4dff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        font-weight: bold;
        text-shadow: 0 2px 8px #ffffff3a;
    }

    .second-title {
        text-shadow: 0 2px 8px #fc07dbb0;

    }

    .repo-link {
        img {
            height: @height-2xs;
            width: auto;
            border-radius: 50%;
            box-shadow: 0px 0px 8px 5px #ffffff59;
        }
    }
}
</style>
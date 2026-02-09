<template>
    <div class="loading-animation-container">
        <div class="center random-shape big"></div>
        <div class="center random-shape medium"></div>
        <div class="center random-shape small"></div>
        <div class="center circle"></div>
        <h3 class="center">AI thinking</h3>
    </div>
</template>
<style lang="less" scoped>
.loading-animation-container {
    position: relative;
    width: 100%;
    height: 100%;
    @size: 220px;
    @step: 20px;

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .random-shape {
        filter: blur(2px);

        &.big {
            background-color: rgba(146, 255, 255, 0.63);
            width: @size;
            height: @size;
            opacity: 0.8;
            animation: shape-change-1 5s linear infinite;
        }

        &.medium {
            background-color: rgba(119, 0, 255, 0.637);
            width: calc(@size - @step);
            height: calc(@size - @step);
            opacity: 0.7;
            animation: shape-change-2 4s linear infinite;
        }

        &.small {
            background-color: rgba(212, 0, 255, 0.637);
            width: calc(@size - 2 * (@step));
            height: calc(@size - 2 * (@step));
            opacity: 0.5;
            animation: shape-change-3 3s linear infinite;
        }
    }

    .circle {
        border-radius: 50%;
        width: calc(@size - 2 * (@step));
        height: calc(@size - 2 * (@step));
        background: radial-gradient(circle, rgb(2, 12, 78) 17%, rgba(30, 40, 157, 0) 47%);
        filter: blur(3px);
        animation: pulse 2.5s infinite;
    }

    h3 {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
}

@shape-1: 170px 120px 160px 100px;
@shape-2: 110px 180px 100px 120px;
@shape-3: 150px 100px 110px 190px;
@shape-4: 110px 130px 180px 150px;

@keyframes shape-change-1 {

    0%,
    100% {
        border-radius: @shape-1;
    }

    25% {
        border-radius: @shape-2;
    }

    50% {
        border-radius: @shape-3;
    }

    75% {
        border-radius: @shape-4;
    }
}

@keyframes shape-change-2 {

    0%,
    100% {
        border-radius: @shape-4;
    }

    25% {
        border-radius: @shape-3;
    }

    50% {
        border-radius: @shape-2;
    }

    75% {
        border-radius: @shape-1;
    }
}

@keyframes shape-change-3 {

    0%,
    100% {
        border-radius: @shape-2;
    }

    25% {
        border-radius: @shape-1;
    }

    50% {
        border-radius: @shape-4;
    }

    75% {
        border-radius: @shape-3;
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
    }

    10% {
        transform: translate(-50%, -50%) scale(1.1);
    }

    30% {
        transform: translate(-50%, -50%) scale(1.3);
    }
}
</style>
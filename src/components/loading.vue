<template>
    <div class="htmleaf-container">
        <div class="loader">
            <div class="my-loading"></div>
        </div>
    </div>
</template>
 
<script setup lang="ts">
</script>
 
<style lang="scss"  scoped>
.htmleaf-container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
}

.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
}

.loader .my-loading {
    position: relative;
    width: 100%;
    height: 10px;
    border: 1px solid var(--ant-primary-color);
    border-radius: 10px;
}

.loader .my-loading:before {
    content: "";
    display: block;
    position: absolute;
    width: 0%;
    height: 100%;
    background: var(--ant-primary-color);
    box-shadow: 10px 0px 15px 0px var(--ant-primary-color);
    animation: load 2s linear infinite;
}

@keyframes load {
    0% {
        width: 0%;
    }

    87.5%,
    100% {
        width: 100%
    }
}

@keyframes turn {
    0% {
        transform: rotateY(0deg);
    }

    6.25%,
    50% {
        transform: rotateY(180deg);
    }

    56.25%,
    100% {
        transform: rotateY(360deg);
    }
}</style>
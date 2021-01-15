<template>
    <div id="main-wrap">

    </div>
</template>

<script>
    export default {
        name: "MainIndex"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config";

    #main-wrap {
        position: fixed;
        left: $navMenu;
        top: $headerNav;
        right: 0;
        bottom: 0;
        border: 30px solid;
        -webkit-box-sizing: content-box;
    }
</style>
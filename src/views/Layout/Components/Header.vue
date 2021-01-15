<template>
    <div id="header-wrap">

    </div>
</template>

<script>
    export default {
        name: "HeaderIndex"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config";
    #header-wrap{
        position: fixed;
        top: 0;
        right: 0;
        left: $navMenu;
        height: $headerNav;
        background-color: white;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    }
</style>
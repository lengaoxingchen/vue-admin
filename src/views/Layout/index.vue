<template>
    <div id="layout">
        <LayoutHeader/>
        <LayoutNav/>
        <LayoutMain/>
    </div>
</template>

<script>
    import LayoutHeader from "./Components/Header";
    import LayoutNav from "./Components/Nav";
    import LayoutMain from "./Components/Main";

    export default {
        name: "index",
        components: {LayoutHeader, LayoutMain, LayoutNav},
        setup() {

        }
    }
</script>

<style lang="scss" scoped>
#layout{
    background-color: #f7f7f7;
}
</style>
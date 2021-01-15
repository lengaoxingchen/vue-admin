<template>
    <div id="nav-wrap">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
            <el-submenu v-for="(item,index) in routers" :key="item.id" :index="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.meta.name}}</span>
                </template>
                <el-menu-item index="1-1"></el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import {ref, reactive} from "@vue/composition-api"

    export default {
        name: "NavIndex",
        setup(props, {root}) {
            const isCollapse = ref(true);

            const routers = reactive(root.$router.options.routes);

            console.log(routers);

            const handleOpen = ((key, keyPath) => {
                console.log(key, keyPath);
            });
            const handleClose = ((key, keyPath) => {
                console.log(key, keyPath);
            });
            return {
                routers,
                isCollapse,
                handleClose,
                handleOpen
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    #nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: $navMenu;
        height: 100vh;
        background-color: #344a5f;
    }
</style>
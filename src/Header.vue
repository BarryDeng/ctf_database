<template>
    <header>
        <div class="line"></div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/">CTF赛事信息</el-menu-item>
            <el-submenu index="/competition">
                <template slot="title">赛事</template>
                <el-menu-item index="/1">所有赛事</el-menu-item>
                <el-menu-item index="/2">国内赛事</el-menu-item>
                <el-menu-item index="/3">国际赛事</el-menu-item>
            </el-submenu>
            <el-submenu index="/team">
                <template slot="title">战队</template>
                <el-menu-item index="/1">所有战队</el-menu-item>
                <el-menu-item index="/2">前十战队</el-menu-item>
            </el-submenu>
            <el-submenu index="/player">
                <template slot="title">选手</template>
                <el-menu-item index="/1">所有选手</el-menu-item>
                <el-menu-item index="/2">前十选手</el-menu-item>
            </el-submenu>
            <el-menu-item index="/">得分榜</el-menu-item>
        </el-menu>
    </header>
</template>
<script>

export default {
    data() {
        return {
            activeIndex: this.$route.name
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            window.location = keyPath.join('');
        }
    }
}
</script>
<style>

</style>


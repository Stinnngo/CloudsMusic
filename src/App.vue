<template>
    <div id="app">
        <!-- 首页组件 -->
        <Head />
        <!-- 路由部分 -->
        <section class="list">
            <div
                class="router-push"
                v-for="(data, index) in text"
                :key="index"
                :class="{ active: index == number }"
                @click="change(index)"
            >
                {{ data }}
            </div>
        </section>

        <!-- 路由视图部分 -->
        <section class="router-view">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            text: ["推荐音乐", "热歌榜", "华语歌手"],
            number: 0,
            flag: {},
            routerList: ["/recommends", "/hot", "/singers"],
        };
    },
    methods: {
        change(index) {
            this.number = index;
            this.$router.push(this.routerList[index]);
        },
    },
    mounted() {
        this.$router.push("/");
        this.$bus.$on("unstyle", (en) => {
            this.number = en;
        });
    },
};
</script>

<style lang="less" scoped>
.list {
    position: fixed;
    z-index: 999;
    display: flex;
    top: 60px;
    width: 100%;
    height: 50px;
    justify-content: space-around;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    .router-push {
        width: 20%;
        height: 96%;
        text-align: center;
        line-height: 50px;
    }

    .active {
        color: #dd001b;
        border-bottom: solid 2px #dd001b;
    }
}
.router-view {
    width: 100%;
    position: absolute;
    top: 110px;
}
</style>

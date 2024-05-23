<template>
    <div class="header">
        <div class="searches">
            <!-- 网易云logo -->
            <div class="logo iconfont icon-wangyiyun"></div>
            <!-- 输入框图表 -->
            <div class="icons">
                <van-icon name="search" size="20" color="#333" />
            </div>
            <!-- 输入框 -->
            <input
                type="text"
                class="search"
                :placeholder="inputText"
                v-model="searchKey"
                @keyup.enter="showSearchPage"
            />
            <div class="icons radius">
                <van-icon name="close" size="18" color="#333" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputText: "搜索歌曲、歌手、专辑",
            searchKey: "",
        };
    },
    methods: {
        // 跳转路由
        showSearchPage() {
            let { searchKey } = this;
            if (this.searchKey.trim() != "") {
                if (this.$route.path != "/search") {
                    this.$router.push({
                        path: "/search",
                        query: { searchKey },
                    });
                } else if (this.$route.path == "/search") {
                    this.$bus.$emit("searchKey", searchKey);
                }
                this.$bus.$emit("unstyle", -1);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.header {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 60px;
    background-color: #d43c33;
    display: flex;
    justify-content: center;
    align-items: center;

    .searches {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        // 网易云logo
        .logo {
            width: 10%;
            height: 70%;
        }
        .iconfont {
            font-family: "iconfont" !important;
            font-size: 30px;
            line-height: 44px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .icon-wangyiyun {
            color: #fff;
        }

        // 输入框图标样式
        .icons {
            display: flex;
            width: 8%;
            height: 70%;
            background-color: #ebecec;
            border-radius: 50px 0 0 50px;
            justify-content: center;
            align-items: center;
        }
        .radius {
            border-radius: 0 50px 50px 0;
        }

        // 输入框样式
        .search {
            display: flex;
            width: 70%;
            height: 70%;
            border: none;
            animation: cursor-blink 0.7s infinite;

            //  font-size:1px ;
            font-weight: 500;
            color: #333;
            font-family: Helvetica, sans-serif, STHeiTi;
            background-color: #ebecec;
        }
    }
}
</style>

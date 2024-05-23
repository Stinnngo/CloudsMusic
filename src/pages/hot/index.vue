<template>
    <div>
        <section class="topStyle">
            <div class="hotTop" ref="hotTop" :style="{ height: swipeHeight }">
                <van-swipe
                    class="swipe"
                    :autoplay="4000"
                    indicator-color="white"
                >
                    <van-swipe-item
                        v-for="(item, index) in swipeData"
                        :key="index"
                    >
                        <img :class="index" :src="item.imageUrl" alt="" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <Songs :songData="songData" :rankShow="true" />
        </section>
    </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
    data() {
        return {
            swipeHeight: 0,
            swipeData: [],
            songData: [],
        };
    },
    methods: {
        autoHeight() {
            let father = this.$refs.hotTop;
            this.swipeHeight = father.style.height = screen.width * 0.37 + "px";
            window.onresize = () => {
                this.swipeHeight = father.style.height =
                    screen.width * 0.37 + "px";
            };
        },
        async reqSwipeData() {
            let res = await this.$api.getSwipeData();
            this.swipeData = res.data.banners;
            // console.log(this.swipeData);
        },
        async reqHotSong() {
            let res = await this.$api.getPlayList("3778678");
            this.songData = res.data.playlist.tracks.slice(0, 20);
        },
    },
    mounted() {
        this.autoHeight();
        this.reqSwipeData();
        this.reqHotSong();
    },
};
</script>

<style scoped lang="less">
.topStyle {
    padding-top: 0;
    .hotTop {
        width: 100%;
        // background-color: orange;
        .swipe {
            height: 100%;
            img {
                width: 100%;
            }
        }
    }
}
</style>

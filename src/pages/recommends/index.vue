<template>
    <div>
        <section class="topStyle" :style="{ height: tostyleheight }">
            <div class="t1">
                <div class="allTextLeft"></div>
                <div class="allText">编辑推荐</div>
            </div>
            <div class="musicdata" ref="screenheight">
                <div
                    class="musiconfather"
                    v-for="item in musicdata"
                    :key="item.id"
                    :style="{ height }"
                    @click="goPlayList(item.id)"
                >
                    <div class="musicson">
                        <img :src="item.coverImgUrl" alt="" />
                    </div>
                    <div class="muscsontext">{{ item.name }}</div>
                </div>
            </div>
        </section>
        <div class="bottomstyle">
            <div class="t1">
                <div class="allTextLeft"></div>
                <div class="allText">最新音乐</div>
            </div>
            <Songs :songData="songData" />
        </div>
    </div>
</template>

<script>
import { Loading } from "vant";

export default {
    data() {
        return {
            musicdata: [],
            newData: [],
            idList: "",
            songData: [],
            height: 0,
            tostyleheight: 0,
        };
    },
    methods: {
        // 设置图片高度的自适应
        heights() {
            let father = this.$refs.screenheight;
            this.height = father.style.height = screen.width * 0.33 + "px";
            this.tostyleheight = screen.width * 0.33 * 2 + 65 + "px";
            window.onresize = () =>
                (() => {
                    this.height = father.style.height =
                        screen.width * 0.33 + "px";
                    this.tostyleheight = screen.width * 0.33 * 2 + 65 + "px";
                })();
        },
        async requestmusicdata() {
            let resulttag = await this.$api.reqmusictags();
            resulttag.data.tags.splice(6, 1);
            let tag =
                resulttag.data.tags[
                    Math.floor(Math.random() * resulttag.data.tags.length)
                ];
            let result = await this.$api.reqmusicdata(tag.name);
            // let result = await this.$api.reqmusicdata(tag.name);

            this.musicdata = result.data.playlists;
        },
        //  获取最新音乐
        async reqNewSong() {
            let res1 = await this.$api.getNewSong();
            this.newData = res1.data.result;
            this.newData.forEach((item, index) => {
                !index
                    ? (this.idList = item.song.id)
                    : (this.idList += "," + item.song.id);
            });
            let res2 = await this.$api.getSongDetail(this.idList);
            this.songData = res2.data.songs;
            // console.log(this.songData);
        },
        goPlayList(id) {
            this.$router.push({ path: "/playlist", query: { id } });
        },
    },
    mounted() {
        // 设置图片高度的自适应
        this.heights();

        // 请求精品歌单的内容
        this.requestmusicdata();

        // 请求最新音乐
        this.reqNewSong();
    },
};
</script>

<style lang="less">
// 上部分内容样式
.topStyle {
    width: 100%;
    // background-color: #000;
    font-size: 14px;
    padding-top: 20px;
    .musicdata {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 24px;
        // background-color: #000;

        .musiconfather {
            width: 33%;
            margin-bottom: 30px;
            margin-left: 0.3%;
            // background-color: red;
            .musicson {
                width: 100%;
                height: 100%;
                // background-color: blue;
                img {
                    width: 100%;
                }
            }
            .muscsontext {
                width: 100%;
                font-size: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-top: 2px;
            }
        }
    }
}
// 下部分内容样式
.bottomstyle {
    position: absolute;
    width: 100%;
    height: 100px;
    top: 110%;
}

// 设置标题栏文字样式，通用
.t1 {
    display: flex;
    width: 100%;
    margin-bottom: 14px;
    position: relative;
    .allTextLeft {
        width: 2%;
        height: 16px;
        border-left: 2px solid #d33a31;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -9px;
    }
    .allText {
        width: 100%;
        height: 20px;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        margin-left: 9px;
    }
}
</style>

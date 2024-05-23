<template>
    <section class="topStyle">
        <div class="playListHeader">
            <div
                class="headerBackground"
                :style="{ backgroundImage: `url(${playList.coverImgUrl})` }"
            ></div>
            <div class="headerWrap">
                <div class="wrapCover">
                    <img :src="playList.coverImgUrl" alt="" />
                    <span class="wrapIcon">歌单</span>
                    <i
                        class="viewNum"
                        :style="{ backgroundImage: `url(${viewNumIcon})` }"
                        >{{ playList.playCount }}</i
                    >
                </div>
                <div class="wrapContent">
                    <div class="contentTitle">
                        {{ playList.name }}
                    </div>
                    <div class="contentCreator">
                        <div class="creatorAvatar">
                            <img :src="playList.creator.avatarUrl" alt="" />
                        </div>
                        {{ playList.creator.nickname }}
                    </div>
                </div>
            </div>
        </div>
        <div class="sepTitle">歌曲列表</div>
        <Songs :songData="songData" :indexShow="true" />
    </section>
</template>

<script>
export default {
    data() {
        return {
            playListId: "",
            playList: {
                coverImgUrl: "",
                playCount: "",
                name: "",
                creator: { avatarUrl: "", nickname: "" },
            },
            idList: "",
            songData: [],
            viewNumIcon:
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+",
        };
    },
    methods: {
        async reqPlayList() {
            this.playListId = this.$route.query.id;
            let res1 = await this.$api.getPlayList(this.playListId);
            this.playList = res1.data.playlist;
            this.playList.trackIds.forEach((song, index) => {
                !index
                    ? (this.idList = song.id)
                    : (this.idList += "," + song.id);
            });
            let res2 = await this.$api.getSongDetail(this.idList);
            this.songData = res2.data.songs;
            // console.log(this.songData);
        },
    },
    mounted() {
        this.reqPlayList();
    },
};
</script>

<style scoped lang="less">
.topStyle {
    background-color: #fff;
    min-height: 100%;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    .playListHeader {
        position: relative;
        padding: 30px 10px 30px 15px;
        overflow: hidden;
        .headerBackground {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            filter: blur(20px);
            transform: scale(1.5);
            &::after {
                content: " ";
                background-color: rgba(0, 0, 0, 0.25);
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }
        }
        .headerWrap {
            display: flex;
            position: relative;
            z-index: 2;
            .wrapCover {
                width: 126px;
                height: 126px;
                position: relative;
                background-color: #e2e2e3;
                img {
                    width: 100%;
                    vertical-align: middle;
                    border: 0;
                }
                .wrapIcon {
                    position: absolute;
                    z-index: 3;
                    top: 10px;
                    left: 0;
                    padding: 0 8px;
                    height: 17px;
                    color: #fff;
                    font-size: 9px;
                    text-align: center;
                    line-height: 17px;
                    background-color: rgba(217, 48, 48, 0.8);
                    border-top-right-radius: 17px;
                    border-bottom-right-radius: 17px;
                }
                .viewNum {
                    position: absolute;
                    right: 2px;
                    top: 0;
                    z-index: 3;
                    padding-left: 15px;
                    color: #fff;
                    font-size: 12px;
                    background-position: 0;
                    background-repeat: no-repeat;
                    background-size: 11px 10px;
                    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
                }
                &::after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 18px;
                    z-index: 2;
                    background-image: linear-gradient(
                        90deg,
                        rgba(0, 0, 0, 0),
                        rgba(0, 0, 0, 0.2)
                    );
                }
            }
            .wrapContent {
                flex: 1 1 auto;
                width: 1%;
                margin-left: 16px;
                padding-top: 3px;
                .contentTitle {
                    padding-top: 1px;
                    font-size: 17px;
                    line-height: 1.3;
                    color: #fefefe;
                    height: 44px;
                    display: -webkit-box;
                    -webkit-box-pack: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-wrap: break-word;
                    white-space: normal;
                }
                .contentCreator {
                    position: relative;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                    word-break: normal;
                    color: hsla(0, 0%, 100%, 0.7);
                    .creatorAvatar {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        vertical-align: middle;
                        margin-right: 5px;
                        img {
                            width: 100%;
                            vertical-align: middle;
                            border-radius: 50%;
                            border: 0;
                        }
                    }
                }
            }
        }
    }
    .sepTitle {
        height: 23px;
        line-height: 23px;
        padding: 0 10px;
        font-size: 12px;
        color: #666;
        background-color: #eeeff0;
    }
}
</style>

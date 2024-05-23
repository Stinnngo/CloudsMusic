<template>
    <div class="songList">
        <a
            v-for="(item, index) in songData"
            :key="item.id"
            :id="index"
            class="songItem"
            @click="goPlayer(item.id)"
        >
            <div v-if="rankShow" class="itemRank" :id="'rank' + (index + 1)">
                {{ (Array(2).join(0) + (index + 1)).slice(-2) }}
            </div>
            <div v-else-if="indexShow" class="itemRank">
                {{ index + 1 }}
            </div>
            <div class="itemCont">
                <div class="itemText">
                    <div class="itemTitle">
                        {{ item.name
                        }}<span v-if="item.alia[0]" class="subTitle"
                            >({{ item.alia[0] }})</span
                        >
                    </div>
                    <div class="itemInfo">
                        <i v-if="item.sq" class="sqIcon icons"></i>
                        <span>{{ item.ar[0].name }}</span>
                        <span
                            v-for="(artist, index) in item.ar.slice(1)"
                            :key="artist.id"
                            :id="index"
                        >
                            / {{ artist.name }}</span
                        >
                        <span> - {{ item.al.name }}</span>
                    </div>
                </div>
                <div class="play">
                    <span class="playIcon icons"></span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    props: ["songData", "rankShow", "indexShow"],
    methods: {
        goPlayer(id) {
            this.$router.push({ path: "/player", query: { id } });
        },
    },
};
</script>

<style scoped lang="less">
.icons {
    background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat;
    background-size: 166px 97px;
}
.songList {
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    .songItem {
        display: flex;
        text-decoration: none;
        cursor: pointer;
        color: #333;
        padding-left: 10px;
        // border: 1px solid orange;
        .itemRank {
            width: 40px;
            font-size: 17px;
            color: #999;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: -10px;
        }
        #rank1,
        #rank2,
        #rank3 {
            color: #df3436;
        }
        .itemCont {
            display: flex;
            flex: 1;
            position: relative;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            .itemText {
                width: 0;
                flex: 1;
                padding: 6px 0;
                .itemTitle,
                .itemInfo {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: normal;
                }
                .itemTitle {
                    font-size: 17px;
                    .subTitle {
                        color: #888;
                        margin-left: 4px;
                    }
                }
                .itemInfo {
                    font-size: 12px;
                    color: #888;
                    .sqIcon {
                        display: inline-block;
                        width: 12px;
                        height: 8px;
                        margin-right: 4px;
                    }
                }
            }
            .play {
                display: flex;
                align-items: center;
                padding: 0 10px;
                .playIcon {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    background-position: -24px 0;
                }
            }
        }
    }
}
</style>

<template>
    <div>
        <Songs v-if="haveResult" :songData="songData" />
        <div v-else class="noResult">老弟，汗流浃背了吧？</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchData: [],
            haveResult: false,
            idList: "",
            songData: [],
        };
    },
    methods: {
        async reqSearchData(key) {
            let res1 = await this.$api.getSearchData(key);
            if (res1.data.result) {
                this.haveResult = true;
                this.searchData = res1.data.result.songs;
            } else {
                this.haveResult = false;
            }
            this.searchData.forEach((song, index) => {
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
        if (this.$route.query.searchKey) {
            this.reqSearchData(this.$route.query.searchKey);
        }
        this.$bus.$on("searchKey", (key) => {
            this.reqSearchData(key);
        });
    },
};
</script>

<style scoped lang="less">
.noResult {
    color: #333;
    font-size: 14px;
    padding: 20px 0;
    text-align: center;
}
</style>

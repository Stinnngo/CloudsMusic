<template>
    <div>
        <section ref="pesons" class="penson">
            <div
                class="father"
                :style="{ height: pesonheight }"
                v-for="(data, index) in pesondata"
                :key="data.id"
            >
                <div class="fatherpeson">
                    <div class="text">
                        <span class="num">{{ index + 1 }}</span
                        >{{ "\t" + data.name }}
                    </div>
                    <img :src="data.picUrl" alt="" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pesondata: [],
            pesonheight: 0,
        };
    },
    methods: {
        // 设置动态高度
        heights() {
            this.pesonheight = this.$refs.pesons.style.height =
                screen.width * 0.3 * 0.8 + "px";
            window.onresize = () => {
                this.pesonheight = this.$refs.pesons.style.height =
                    screen.width * 0.3 * 0.8 + "px";
            };
        },
        // 请求数据
        async querypenson() {
            let res = await this.$api.getpenson();
            this.pesondata = res.data.list.artists;
            // console.log(this.pesondata);
            this.pesondata.pop();
        },
    },
    mounted() {
        this.heights();

        this.querypenson();
        //  console.log(this.pesondata);
    },
};
</script>

<style lang="less" scoped>
.penson {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    padding-top: 20px;
    color: #fff;
    .father {
        width: 30%;
        margin-bottom: 35px;
        .fatherpeson {
            width: 100%;
            height: 100%;
            .text {
                height: 24px;
                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                background-color: #d43c33;
                padding-left: 10px;
                padding-top: 2px;
                .num {
                    color: #ccc;
                }
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>

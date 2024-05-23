<template>
    <section class="play">
        <div class="yuanxing"></div>
        <div class="yuanxingtouming"></div>
        <div class="zhongjianyuan"></div>

        <!-- 唱片的长长的那个东西 -->
        <div class="chang"></div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            changpian: [
                "https://s3.music.126.net/mobile-new/img/disc-plus.png?b700b62e1971b351dcb8b8ce1c9ceea3=",
                "http://s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3fd11569809b817b4988f12bc7=",
                "http://s3.music.126.net/mobile-new/img/needle-ab.png",
            ],
        };
    },
    mounted() {
        console.log(100);
    },
};
</script>

<style lang="less" scoped>
.play {
    width: 100%;
    height: 500px;
    // background-color: red;

    .yuanxing {
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        background: url("https://s3.music.126.net/mobile-new/img/disc-plus.png?b700b62e1971b351dcb8b8ce1c9ceea3=");
        background-size: 100% 100%;
        // transform: ;
        width: 280px;
        height: 260px;
        // border-radius: 50%;
        // border: 10px solid red;
        // background-color: #000;
    }
    .yuanxingtouming {
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        background: url("http://s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3fd11569809b817b4988f12bc7=");
        background-size: 100% 100%;
        width: 280px;
        height: 260px;
    }
    .chang {
        position: absolute;
        top: 4%;
        left: 50%;
        transform: rotate(-25deg);
        width: 100px;
        height: 165px;
        // background-color: #000;
        background: url("http://s3.music.126.net/mobile-new/img/needle-ab.png");
        background-size: 100% 100%;
        transform-origin: 0% 0%;
    }

    .zhongjianyuan {
        position: absolute;
        top: 28%;
        left: 50%;
        transform: translateX(-50%);
        width: 180px;
        height: 180px;
        background-color: red;
        z-index: -100;
        border-radius: 50%;
    }
}
</style>

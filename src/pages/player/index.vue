<template>
    <div>
        <section class="player">
            <div
                class="background"
                :style="{
                    backgroundImage: `url(${
                        songItem.al.picUrl +
                        '?imageView&thumbnail=50y50&quality=15&tostatic=0'
                    })`,
                }"
            ></div>
            <div class="shade"></div>
            <div class="wrap">
                <div class="disc">
                    <div class="pitch" ref="pitch"></div>
                    <div class="turn" ref="turn">
                        <div class="rollWrap">
                            <div class="cover">
                                <img
                                    :src="
                                        songItem.al.picUrl +
                                        '?imageView&thumbnail=360y360&quality=75&tostatic=0'
                                    "
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="reflection">
                            <div class="light"></div>
                        </div>
                    </div>
                    <span v-if="!playing" class="playButton"></span>
                    <div class="clickArea" @click="doPlay"></div>
                </div>
            </div>
            <div class="info">
                <h2>
                    <span class="name">{{ songItem.name }}</span>
                    <span class="gap">-</span>
                    <b class="author">{{ songItem.ar[0].name }}</b>
                    <b
                        v-for="(artist, index) in songItem.ar.slice(1)"
                        class="author"
                        :key="artist.id"
                        :id="index"
                        >/{{ artist.name }}</b
                    >
                </h2>
            </div>
            <audio
                loop
                :src="`https://music.163.com/song/media/outer/url?id=${songId}`"
                ref="audio"
            ></audio>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            songId: "",
            songItem: { name: "", ar: [{ name: "" }], al: { picUrl: "" } },
            playing: false,
        };
    },
    methods: {
        async reqSongDetail() {
            this.songId = this.$route.query.id;
            let res = await this.$api.getSongDetail(this.songId);
            this.songItem = res.data.songs[0];
            // console.log(this.songItem);
        },
        doPlay() {
            this.playing
                ? ((this.playing = false),
                  this.$refs.audio.pause(),
                  (this.$refs.turn.style.cssText =
                      "animation-play-state: paused;"),
                  (this.$refs.pitch.style.cssText =
                      "transform: rotate(-40deg);"))
                : ((this.playing = true),
                  this.$refs.audio.play(),
                  (this.$refs.turn.style.cssText =
                      "animation-play-state: running;"),
                  (this.$refs.pitch.style.cssText =
                      "transform: rotate(-7deg);"));
        },
    },
    mounted() {
        this.reqSongDetail();
    },
};
</script>

<style lang="less" scoped>
@keyframes discSpin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
.player {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    .background {
        height: 100%;
        position: fixed;
        left: 0;
        // top: 0;
        right: 0;
        overflow: hidden;
        // z-index: 1;
        background-color: #161824;
        opacity: 1;
        transform: scale(1.5);
        transform-origin: center center;
        filter: blur(30px);
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        &::before {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
        }
    }
    .shade {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 2;
        width: 100%;
        height: 50%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
    }
    .wrap {
        position: relative;
        padding-top: 115px;
        .disc {
            width: 247px;
            height: 247px;
            position: relative;
            margin: 0 auto;
            .pitch {
                content: " ";
                position: absolute;
                width: 73px;
                height: 118px;
                top: -50px;
                left: 112px;
                transform: rotate(-40deg);
                transform-origin: 8px 8px;
                transition: all 0.5s;
                background: url(https://s3.music.126.net/mobile-new/img/needle-ab.png)
                    no-repeat;
                background-size: contain;
                z-index: 5;
            }
            .turn {
                width: 100%;
                height: 100%;
                animation: discSpin 20s linear infinite;
                animation-play-state: paused;
                &::before {
                    content: " ";
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background: url(//s3.music.126.net/mobile-new/img/disc.png)
                        no-repeat;
                    background-size: contain;
                    z-index: 2;
                }
                .rollWrap {
                    width: 184px;
                    height: 184px;
                    margin: -92px 0 0 -92px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    z-index: 1;
                    .cover {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        overflow: hidden;
                        background: url(//s3.music.126.net/mobile-new/img/disc_default.png)
                            no-repeat;
                        background-size: contain;
                        img {
                            width: 100%;
                            vertical-align: middle;
                            border: 0;
                        }
                    }
                }
                .reflection {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    z-index: 3;
                    .light {
                        background: url(//s3.music.126.net/mobile-new/img/disc_light.png)
                            no-repeat;
                        background-size: contain;
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        z-index: 3;
                    }
                }
            }
            .playButton {
                width: 56px;
                height: 56px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==)
                    no-repeat;
                background-size: contain;
                &::after {
                    content: " ";
                    display: block;
                    position: absolute;
                }
            }
        }
        .clickArea {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 10;
            margin-bottom: env(safe-area-inset-bottom);
        }
    }
    .info {
        margin-top: 25px;
        padding: 0 35px;
        position: relative;
        z-index: 20;
        h2 {
            font-size: 18px;
            font-weight: 400;
            text-align: center;
            line-height: 1.1;
            color: #fefefe;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .gap {
                margin: 0 4px;
            }
            .author {
                font-size: 14px;
                font-weight: 400;
                color: hsla(0, 0%, 100%, 0.4);
                font-family: PingFangSC-Medium;
            }
        }
    }
}
</style>

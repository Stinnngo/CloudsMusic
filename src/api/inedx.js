import axios from "axios";
let url = "http://localhost:3000";

// 精品歌单标签
export const reqmusictags = () => {
    return axios({
        url: `${url}/playlist/highquality/tags`,
        method: "get",
    });
};

// 精品歌单
export const reqmusicdata = (tag) => {
    return axios({
        url: `${url}/top/playlist/highquality?limit=6&cat=${tag}`,
        method: "post",
    });
};

// 推荐新音乐
export const getNewSong = () => {
    return axios({
        url: `${url}/personalized/newsong`,
    });
};

// 轮播图
export const getSwipeData = () => {
    return axios({
        url: `${url}/banner?type=android`,
        method: "post",
    });
};

// 获取歌单详情
export const getPlayList = (id) => {
    return axios({
        url: `${url}/playlist/detail?id=${id}`,
        method: "post",
    });
};

// 搜索音乐
export const getSearchData = (kw) => {
    return axios({
        url: `${url}/search?keywords=${kw}`,
    });
};

// 获取歌曲详情
export const getSongDetail = (ids) => {
    return axios({
        url: `${url}/song/detail?ids=${ids}`,
        method: "post",
    });
};

// 歌手榜单
export const getpenson = () => {
    return axios({
        url: `${url}/toplist/artist`,
        method: "get",
    });
};

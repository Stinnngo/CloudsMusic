export default [
    {
        path: "/",
        redirect: "/recommends",
    },
    {
        path: "/recommends",
        name: "recommends",
        component: () => import("@/pages/recommends"),
        meta: { flag: true },
    },
    {
        path: "/hot",
        name: "hot",
        component: () => import("@/pages/hot"),
        meta: { flag: false },
    },
    {
        path: "/singers",
        name: "singers",
        component: () => import("@/pages/singers"),
        meta: { flag: false },
    },
    {
        path: "/search",
        name: "search",
        component: () => import("@/pages/search"),
    },
    {
        path: "/playlist",
        name: "playlist",
        component: () => import("@/pages/playlist"),
    },
    {
        path: "/player",
        name: "player",
        component: () => import("@/pages/player"),
    },
    // {
    //     path: "/playerold",
    //     name: "playerold",
    //     component: () => import("@/pages/playerold"),
    // },
];

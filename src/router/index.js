import vuerouter from "vue-router";
import vue from "vue";
import routes from "./routes";
vue.use(vuerouter);

function push() {
    vue.use(vuerouter);
    // 先把vuerouter身上的push方法保存
    let readpush = vuerouter.prototype.push;
    // 先把vuerouter身上的replace方法保存
    let readreplace = vuerouter.prototype.replace;

    // 重写push方法
    vuerouter.prototype.push = function (options, res, rej) {
        if (res && rej) {
            readpush.call(this, options, res, rej);
        } else {
            readpush.call(
                this,
                options,
                () => {},
                () => {}
            );
        }
    };

    // 重写replace方法
    vuerouter.prototype.replace = function (options, res, rej) {
        if (res && rej) {
            readreplace.call(this, options, res, rej);
        } else {
            readreplace.call(
                this,
                options,
                () => {},
                () => {}
            );
        }
    };
}
push();

export default new vuerouter({
    mode: "hash",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    },
});

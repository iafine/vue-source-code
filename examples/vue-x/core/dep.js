export default class Dep {
    constructor() {
        this.subs = []  // 订阅者队列
    }

    /**
     * 添加订阅者
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    /**
     * 通知所有的订阅者，触发订阅者的相应逻辑
     */
    notify() {
        this.subs.forEach(sub => sub.update())
    }
}
let uid = 0
export default class Dep {
    constructor() {
        this.uid = uid++
        this.subs = []  // 订阅者队列
    }

    /**
     * 添加订阅者
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        const index = this.subs.indexOf(sub)
        if (index !== -1) {
            this.subs.splice(index, 1)
        }
    }

    depend() {
        Dep.target.addDep(this)
    }

    /**
     * 通知所有的订阅者，触发订阅者的相应逻辑
     */
    notify() {
        this.subs.forEach(sub => sub.update())
    }
}

Dep.target = null
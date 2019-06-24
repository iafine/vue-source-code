import Dep from './dep'

export default class Watcher {

    constructor(vm, expOrFn, cb) {
        this.vm = vm    // 当前的vue实例
        this.cb = cb    // 当数据更新时，需要执行的回调函数
        this.expOrFn = expOrFn  // 被监听的数据
        this.val = this.getValue()   // 更新之前的数据
    }

    // 更新函数，由订阅者dep调用
    update() {
        this.vm._renderDOM()    // 更新DOM
        this.run()
    }

    run() {
        const val = this.getValue()
        if (val !== this.val) {
            this.val = val
            this.cb.call(this.vm)
        }
    }

    getValue() {
        Dep.target = this
        const val = this.vm._data[this.expOrFn]
        // 将target置空，用于下次Watcher使用
        Dep.target = null
        return val
    }
}
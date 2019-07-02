import Dep from './dep'

export default class Watcher {

    constructor(vm, expOrFn, cb) {
        this.vm = vm    // 当前的vue实例
        this.cb = cb    // 当数据更新时，需要执行的回调函数
        this.expOrFn = expOrFn  // 被监听的数据
        this.depIds = {}

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = this.parseGetter(expOrFn.trim())
        }

        this.value = this.get()
    }

    update() {
        this.run()
    }

    run() {
        const value = this.get()
        const oldValue = this.value
        if (value !== oldValue) {
            this.value = value
            this.cb.call(this.vm, value, oldValue)
        }
    }
    
    addDep(dep) {
        dep.addSub(this)
        this.depIds[dep.id] = dep
        // if (!this.depIds.hasOwnProperty(dep.id)) {
        // }
    }

    get() {
        Dep.target = this
        const value = this.getter.call(this.vm, this.vm)
        Dep.target = null
        return value
    }

    parseGetter(exp) {
        if (/[^\w.$]/.test(exp)) {
            return
        }
        const exps = exp.split('.')
        
        return obj => {
            for (let i = 0, len = exps.length; i < len; i++) {
                if (!obj) {
                    return
                }
                obj = obj[exps[i]]
            }
            return obj
        }
    }
}
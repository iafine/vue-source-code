import { observe } from './observer'
import Watcher from './watcher'
import Compile from './compile';

export default class Vue {

    constructor(options) {

        this.$options = options || {} // Vue实例参数

        const data = this._data = this.$options.data

        // 数据代理 vm.xxx -> vm._data.xxx
        Object.keys(data).forEach(key => {
            this._proxy(key)
        })

        // 初始化计算属性
        this._computed()

        observe(data, this)

        this.$compile = new Compile(options.el || document.body, this)
    }

    $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb)
    }

    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true, // 该属性可以被修改，也可以被删除
            enumerable: true,   // 该属性可以出现在对象的枚举属性中
            get: () => this._data[key],
            set: newVal => {
                this._data[key] = newVal
            }
        })
    }

    _computed() {
        const computed = this.$options.computed
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(key => {
                Object.defineProperty(this, key, {
                    configurable: true, // 该属性可以被修改，也可以被删除
                    enumerable: true,   // 该属性可以出现在对象的枚举属性中
                    get: () => computed[key] === 'function' ? computed[key] : computed[key].get,
                    set: () => {}
                })
            })
        }
    }
}
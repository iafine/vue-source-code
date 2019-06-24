import {observe} from './observer'
import Watcher from './watcher'

export default class Vue {

    constructor(options = {}) {
        this.$options = options // Vue实例参数
        this.$el = document.querySelector(options.el) // 获取DOM节点
        
        let data = (this._data = this.$options.data)
        Object.keys(data).forEach(key => this._proxy(key))  // 将data所有的属性绑定到Vue实例上

        // 监听数据
        observe(data)

        // 渲染DOM
        this._renderDOM()
    }

    $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb)
    }

    _renderDOM() {
        console.log('Updated DOM')
        if (this.$el && this.$options && this.$options.template) {
            this.$el.innerHTML = this.$options.template(this._data)
        }
    }

    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true, // 该属性可以被修改，也可以被删除
            enumerable: true,   // 该属性可以出现在对象的枚举属性中
            get: () => this._data[key],
            set: val => {
                this._data[key] = val
            }
        })
    }
}
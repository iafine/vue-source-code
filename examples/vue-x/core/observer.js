import Dep from './dep'

export default class Observer {
    constructor(value) {
        this.value = value
        this.walk(value)
    }

    walk(value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]))
    }

    convert(key, val) {
        // 添加setter和getter
        defineReactive(this.value, key, val)
    }
}

export function observe(value) {
    if (!value || typeof value !== 'object') {
        return
    }
    return new Observer(value)
}

export function defineReactive(obj, key, val) {
    const dep = new Dep()
    var childObserver = observe(val)

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            console.log('get value')
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set: newVal => {
            console.log('set a new value')
            if (val === newVal) {
                return
            }
            val = newVal
            childObserver = observe(newVal)
            dep.notify()
        }
    })
}
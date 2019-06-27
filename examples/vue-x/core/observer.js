import Dep from './dep'

export default class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }

    walk(data) {
        Object.keys(data).forEach(key => this.convert(key, data[key]))
    }

    convert(key, val) {
        // 添加setter和getter
        this.defineReactive(this.data, key, val)
    }

    defineReactive(data, key, val) {
        const dep = new Dep()
        let childObserver = observe(val)
    
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                console.log('get value')
                if (Dep.target) {
                    dep.depend()
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
}

export function observe(value) {
    if (!value || typeof value !== 'object') {
        return
    }
    return new Observer(value)
}
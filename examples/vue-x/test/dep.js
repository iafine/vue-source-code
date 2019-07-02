
// 模拟基础数据源
const data = {
    message: 'Hello World',
    person: {
        name: 'Iafine'
    }
}
observe(data)   // 监听属性
data.person.name = 'Iafine3'    // 更改数据

function observe(data) {
    if (!data || typeof data !== 'object') {
        return
    }

    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, value) {
    // 子属性的监听
    observe(value)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            return value;
        },
        set: (newValue) => {
            console.log('changed:' + value + ' ==> ' + newValue) // 数据发生变动，打印日志
            value = newValue
        }
    })
}

/**
 * 订阅者数组
 */
function Dep() {
    this.subs = []
}

Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify() {
        // 通知订阅者调用update
        this.subs.forEach(sub => sub.update())
    }
}
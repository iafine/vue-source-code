
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
        console.log('Dep收到属性改变通知，请求Watcher转发')
        this.subs.forEach(sub => sub.update())
    }
}

/**
 * 用于收到每个订阅者发出的通知，进行转发
 */

function Watcher(data, key) {
    this.data = data
    this.key = key

    // 指定target，并且获取当前value
    Dep.target = this
    this.value = this.data[this.key]
    Dep.target = null
}

Watcher.prototype = {
    update() {
        console.log('Watcher接收到Dep的改变通知，请求UI层更新, 新数据是: ', this.data[this.key])
    }
}

/**
 * 观察者
 */
function observe(data) {
    if (!data || typeof data !== 'object') {
        return
    }

    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, value) {
    const dep = new Dep()
    // 子属性的监听
    observe(value)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            Dep.target && dep.addSub(Dep.target)
            return value
        },
        set: (newValue) => {
            if (value === newValue) {
                return
            }
            console.log('changed:' + value + ' ==> ' + newValue) // 数据发生变动，打印日志
            value = newValue
            dep.notify()
        }
    })
}

/************** Main *******************/

// 模拟基础数据源
const data = {
    message: 'Hello World',
    person: {
        name: 'Iafine'
    }
}

observe(data)   // 观察属性
new Watcher(data, 'message')    // 监听属性
data.message = 'Hello World Updated'    // 更改数据




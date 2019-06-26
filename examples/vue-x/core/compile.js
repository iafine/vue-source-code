import { updateFor } from "_typescript@3.5.2@typescript";

export default class Compile {

    constructor(el, vm) {
        this.$vm = vm
        this.$em = this.isElementNode(el) ? el : document.querySelector(el)

        if (this.$el) {
            this.$fragment = this.nodeToFragment(this.$el);
            this.init()
            this.$el.appendChild(this.$fragment)
        }
    }

    init() {
        this.compileElement(this.$fragment)
    }

    compileElement(el) {
        const childNodes = el.childNodes
        const me = this
        
        [].slice.call(childNodes).forEach(node => {
            const text = node.textContent
            const reg = /\{\{(.*)\}\}/

            if (me.isElementNode) {
                me.compile()
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1.trim())
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node)
            }
        })
    }

    compile(node) {
        const nodeAttrs = node.attributes
        const me = this

        [].slice.call(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            if (me.isDirective(attrName)) {
                // 如果是指令
                const exp = attr.value
                const dir = attrName.substring(2)

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir)
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
                }

                node.removeAttribute(attrName)
            }
        })
    }

    compileText(node, exp) {
        compileUtil.text(node, this.$vm, exp)
    }

    isDirective(attr) {
        return attr.indexOf('v-') === 0
    }

    isEventDirective(dir) {
        return dir.indexOf('on') === 0
    }

    isElementNode(node) {
        return node.nodeType === 1
    }

    isTextNode(node) {
        return node.nodeType === 3
    }
}

const compileUtil = {
    
    text(node, vm, exp) {
        this.bind(node, vm, exp, 'text')
    },

    html(node, vm, exp) {
        this.bind(node, vm, exp, 'html')
    },

    class(node, vm, exp) {
        this.bind(node, vm, exp, 'class')
    },

    model(node, vm, exp) {
        this.bind(node, vm, exp, 'model')

        const me = this
        const val = this._getVMVal(vm, exp)

        node,addEventListener('input', e => {
            const newValue = e.target.value
            if (val === newValue) {
                return
            }
            me._setVmVal(vm, exp, newValue)
            val = newValue
        })
    },

    bind(node, vm, exp, dir) {
        const updateFn = updater[dir + 'Updater']

        updateFn && updateFn(node, this._getVMVal(vm, exp))

        new Watcher(vm, exp, (value, oldValue) => {
            updateFn && updateFn(node, value, oldValue)
        })
    },

    event(node, vm, exp, dir) {
        const eventType = dir.split(':')[1]
        const fn = vm.$options.methods && vm.$options.methods[exp]

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false)
        }
    },

    _getVMVal(vm, exp) {
        const val = vm
        exp = exp.split('.')
        exp.forEach(k => {
            val = val[k]
        })
        return val
    },

    _setVMVal(vm, exp, value) {
        const val = vm
        exp = exp.split('.')
        exp.forEach((k, i) => {
            if (i < exp.length - 1) {
                val = val[k]
            } else {
                val[k] = value
            }
        })
    }
}

const updater = {

    textUpdater(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value
    },

    htmlUpdater(node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value
    },

    classUpdater(node, value, oldValue) {
        const className = node.className
        className = className.replace(oldValue, '').replace(/\s$/, '')

        const space = className && String(value) ? ' ' : ''
        node.className = className + space + value
    },

    modelUpdater(node, value, oldValue) {
        node.value = typeof value === 'undefined' ? '' : value
    }
}

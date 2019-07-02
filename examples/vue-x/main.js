import Vue from './core'

const vue = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue-X',
        person: {
            name: 'LiYang'
        },
        html: '<span style="color: orange;">orange text</span>'
    },
    computed: {
        sayHello() {
            return 'Hello ' + this.person.name + '!'
        }
    },
    methods: {
        handleClicked() {
            this.person.name = 'LiYang HaaaaH'
        }
    }
})
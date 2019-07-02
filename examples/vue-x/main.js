import Vue from './core'

/**
 * 1. nodeType是什么意思，分别有哪几种
 */
const vue = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue-X',
        // className: 'btn',
        // htmlStr: '<span style="color: #f00;">red</span>',
        // child: {
        //     someStr: 'World !'
        // }
    },
    // computed: {
    //     getHelloWord() {
    //         return this.someStr + this.child.someStr;
    //     }
    // },
    // methods: {
    //     clickBtn() {
    //         var randomStrArr = ['childOne', 'childTwo', 'childThree'];
    //         this.child.someStr = randomStrArr[parseInt(Math.random() * 3)];
    //     }
    // }
})

// vue.$watch('child.someStr', () => {
//     console.log(arguments);
// });
import Vue from './core'

const vue = new Vue({
    el: '#app',
    template(data) {
        return `
        <h1>${data.title}</h1>
        <h2>作者：<strong>${data.author.name}</strong></h2>
        <p>${data.info}</p>
        <p>${data.date}</p>`;
    },
    data: {
        title: 'Hello Vue-X',
        info: '从零实现Vue数据绑定',
        author: {
            name: 'LiYang'
        },
        date: new Date()
    }
})

vue.$watch('date', () => console.log('date is changed'))

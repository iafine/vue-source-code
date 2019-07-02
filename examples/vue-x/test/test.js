function Person() {

}

Person.prototype = {
    getName() {
        return 'Iafine'
    }
}

const per = new Person()
console.log(per.getName())
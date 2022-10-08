import numFormatMoney from './numFormat/numFormatMoney.js'
let list = [
    numFormatMoney
]
function installFilter (Vue) {
    list.forEach((item) => {
        Object.keys(item).forEach((key)=> {
            Vue.filter(key, item[key])
        })
    })
}

export default installFilter
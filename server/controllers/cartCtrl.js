const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        let {user} = req.session
        const {id} = req.params
        const index = user.cart.findIndex(item => item.id == id)

        if(index === -1){
            const selectedSwag = swag.find(swag => swag.id == id)
            user.cart.push(selectedSwag)
            user.total += selectedSwag.price
        }

        res.send(user)
    },

    delete: (req, res) => {
        let {user} = req.session
        const {id} = req.params
        const index = user.cart.findIndex(item => item.id == id)
        const selectedSwag = swag.find(item => item.id == id)

        if(index !== -1){
            user.cart.splice(index, 1)
            user.total -= selectedSwag.price
        }

        res.send(user)
    },

    checkout: (req, res) => {
        const {user} = req.session
        user.cart = []
        user.total = 0
        
        res.send(user)
    }
}
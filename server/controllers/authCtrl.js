const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res) => {
        const {session} = req
        const {username, password} = req.body
        const user = users.find(user => user.username === username && user.password === password)

        if(user){
            session.user.username = user.username
            res.send(session.user)
        }else{
            res.status(401).send('Unauthorized')
        }
    },
    
    register: (req, res) => {
        const {session} = req
        const {username, password} = req.body
        let user = {username, password, id: id++}
        users.push(user)

        session.user.username = username

        res.send(session.user)
    },

    signout: (req, res) => {
        req.session.destroy()
        res.send(req.session)
    },

    getUser: (req, res) => {
        res.send(req.session.user)
    },

    //temp
    test: (req, res) => {
        res.send(users)
    }
}
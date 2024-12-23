const userRoute = require('express').Router()
const { readAll, readSingle, addUser, updateUser, deleteUser } = require('./user_controller')

// add user
userRoute.post(`/add`, addUser)

// read all user
userRoute.get(`/all`, readAll)

// read single
userRoute.get(`/single/:id`, readSingle)

// update 
userRoute.patch(`/update/:id`, updateUser)

// delete 
userRoute.delete(`/delete/:id`, deleteUser)

module.exports = userRoute
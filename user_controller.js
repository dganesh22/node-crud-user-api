// controller 
const User = require('./user_model')
const { StatusCodes } = require("http-status-codes")

// add new user  - post
const addUser = async (req,res) => {
    try {
        // req.body -to receive data 
        let { name, email, age } = req.body 

        // validation
        let extEmail = await User.findOne({ email })
            if(extEmail)
                return res.status(StatusCodes.CONFLICT).json({ msg: `${req.body.email} already exists`})

        let newUser = await User({
            name,
            email,
            age
        })

        newUser.save() 

        res.status(StatusCodes.OK).json({ msg: "successfully added", newUser })
        
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}

// read all user - get
const readAll = async (req,res) => {
    try {
        let users = await User.find()

        return res.status(StatusCodes.OK).json({ length: users.length, users })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}


// read single user - get
const readSingle = async (req,res) => {
    try {
        // to read router parameters
        let params = req.params

        // read data from db
        let data = await User.findById({ _id: params.id })
            if(!data)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "requested user data not found"})

        res.json({ params, user: data })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}


// update user - put/patch
const updateUser = async (req,res) => {
    try {
        let params = req.params
        
        // read data from db
          let data = await User.findById({ _id: params.id })
          if(!data)
              return res.status(StatusCodes.NOT_FOUND).json({ msg: "requested user data not found"})

        // update the data
        await User.findByIdAndUpdate({_id: params.id}, req.body)

        res.status(StatusCodes.ACCEPTED).json({ params,  msg: "Successfully Updated"})

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}


// delete user - delete
const deleteUser = async (req,res) => {
    try {
        let params = req.params
        
        // read data from db
          let data = await User.findById({ _id: params.id })
          if(!data)
              return res.status(StatusCodes.NOT_FOUND).json({ msg: "requested user data not found"})

        await User.findByIdAndDelete({ _id: params.id })

        res.status(StatusCodes.OK).json({ params, msg: "Successfully deleted"})

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}

module.exports = { addUser, readAll, readSingle, updateUser, deleteUser }

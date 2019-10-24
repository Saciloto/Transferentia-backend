const UserModel = require('../models/UserModel');

module.exports = {
    async index(req,res){
        
        const users = await UserModel.find({});
        try{
            res.send(users);
        }catch(err){
            res.send(err)
        }
    },
}
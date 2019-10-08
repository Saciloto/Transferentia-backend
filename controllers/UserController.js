const axios = require('axios');
const UserModel = require('../models/UserModel');

//Por se tratar de um objeto pode ser exportado diretamente
module.exports = {
    async index(req,res){
        const {user_id} = req.headers;
        console.log(user_id)
        const user = await UserModel.find({_id:user_id});
        if(user){
            console.log(user);
            return res.json({'user': user});
        }
    },

    async store(req,res){
        const {userName,name, email,senha} = req.body;
        const {filename:userImagem} = req.file;
        const [imageName]= userImagem.split('.');
        const filename = `${imageName}.jpg`;
        const userExists = await UserModel.findOne({name:userName}|| {email:email} );

        if(userExists){
            console.log("Nome de usuário já existe")
            return res.json({message:'Nome de Usuário e/ou email já cadastrado, por favor insira novos dados'}) // Se encontrar um usuário que já existe ele retorna o mesmo
        }else{
            const usuario = await UserModel.create({
                userName,
                name,
                email,
                senha,
                userImagem:filename
           })
    
            return res.json(usuario)
        }
    },

    async delete(req,res){
        try {
            const usuario = await UserModel.findByIdAndDelete(req.params.id)

            if (!usuario) res.status(404).send("No Item Found")
            res.status(200).send()

        } catch (err) {
            res.status(500).send(err)
        }
    },

    async update(req,res){
        try {
            await UserModel.findByIdAndUpdate(req.params.id, req.body)
            await UserModel.save()
            res.send(usuario)
        } catch (err) {
            
            res.status(500).send(err)
        }
    }
};
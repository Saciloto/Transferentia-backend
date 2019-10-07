const UserModel = require('../models/UserModel');

module.exports = {
    async store(req,res){
        const {email,senha} = req.body;
        console.log(email, senha)
        const userExists = await UserModel.findOne({email:email, senha:senha});
        
        if(userExists){
            console.log("Login realizado")
            return res.json(userExists);
        }else{
            console.log("Dados incorretos")
            return res.json({message:'E-mail ou senha incorretos, insira novos dados, ou crie sua conta gratuita.'}) 
        }
    },
    async index(req,res){ //Função para buscar todos os usuários - só pra DEV
        const users = await UserModel.find({});
        try{
            res.send(users);
        }catch(err){
            res.status(500).send(err)
        }
    }
}
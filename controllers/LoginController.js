const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt')

module.exports = {
    async store(req,res){
        const {email,senha} = req.body;
        console.log(email, senha)
        const loginSenha = senha;
        const userExists = await UserModel.findOne({email:email});
        
        if(userExists){
            const {senha} = userExists;
            console.log("email existe, validando senha!")
            
            if(bcrypt.compareSync(loginSenha,senha)){ // Faz a descriptografia da senha, para poder validar com a fornecida na View
                console.log('Login e senha batem')      //se a senha bater, retorna o usuário
                return res.json(userExists);
            }else{
                console.log('Senhas não conferem')
                return res.json({message:'E-mail ou senha incorretos, insira novos dados, ou crie sua conta gratuita.'}) 
            }
            
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
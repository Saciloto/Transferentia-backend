const UserModel = require('../models/UserModel');

module.exports = {
    async store(req,res){
        const {email,senha} = req.body;
        console.log(email, senha)
        const emailExists = await UserModel.findOne({email:email});

        if(emailExists){
            console.log("email existe, validando senha")
            const senhaExists = await UserModel.findOne({senha:senha})
            if(senhaExists){
                console.log("Login realizado!")
                return res.json(emailExists);
            } else {
                console.log("Senha incorreta")
                return res.json({message:'E-mail ou senha incorretos, insira novos dados, ou crie sua conta gratuita.'}) 
            }
        }else {
            return res.json({message:'E-mail ou senha incorretos, insira novos dados, ou crie sua conta gratuita.'}) 
        }
    }
}
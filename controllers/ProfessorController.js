const AulaModel = require('../models/AulaModel');
const UserModel = require('../models/UserModel');
module.exports={

    async index(req,res){
    //Retorna o número de aulas que um instrutor já criou, ou retorna uma mensagem caso não tenha
    const {user_id} = req.headers;
        console.log(user_id)
        const aula = await AulaModel.find({aluno:user_id});
        
        if(aula.length > 0){
            console.log(aula);
            return res.json({'aula': aula});
        }else{
            return res.json({message:'Você não está em nenhuma aula!'})
        }
    }
}
const AulaModel = require('../models/AulaModel');
const UserModel = require('../models/UserModel');
module.exports={

    async index(req,res){
    //Retorna o número de aulas que o usuaário está inscrito
    const {user_id} = req.headers;
        //console.log(user_id)
        const aula = await AulaModel.find({alunos:user_id});
        
        if(aula.length > 0){
            console.log(aula);
            return res.json({'aula': aula});
        }else{
            console.log('sem aula')
            return res.json({message:'Você não está em nenhuma aula, inscreva-se agora mesmo!'})
        }
    }
}
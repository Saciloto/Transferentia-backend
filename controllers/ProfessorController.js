const AulaModel = require('../models/AulaModel');
module.exports={

    async index(req,res){
        //Retorna o número de aulas que um instrutor já criou, ou retorna uma mensagem caso não tenha
        const {user_id} = req.headers;
        const aula = await AulaModel.find({professor:user_id});
        
        if(aula.length > 0){
            return res.json({'aula': aula});
        }else{
            return res.json({message:'Você não criou nenhuma aula, vire uns intrutor agora mesmo!'})
        }
    }
}
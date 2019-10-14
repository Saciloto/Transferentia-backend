const AulaModel = require('../models/AulaModel');
const UserModel = require('../models/UserModel');
module.exports={


    async index(req,res){
    //Retorna o número de aulas que um instrutor já criou, ou retorna uma mensagem caso não tenha
     const {user_id} = req.headers;
     console.log(user_id)
     const aula = await AulaModel.findById({professor:user_id});
     const {professor} = aula;

     if(aula.length > 0){
         console.log(aula);
         return res.json({'aula': aula});
     }else{
         return res.json({message:'Você não criou nenhuma aula, vire uns intrutor agora mesmo!'})
        }
    }
}
const AulaModel = require('../models/AulaModel');
//const UserModel = require('../models/UserModel');
//const axios = require('axios');
module.exports={

    async index(req,res){
        //Retorna o número de aulas que um instrutor já criou, ou retorna uma mensagem caso não tenha
        const {user_id} = req.headers;
        const aula = await AulaModel.find({professor:user_id});
        //const users = await UserModel.find({})
        //console.log(users);
        
        //const {name}
        
        // aula.forEach(element => {
        //     element.alunos.forEach(async element2 =>{
        //         const temp = await UserModel.findById(element2)
        //         element.alunos.push(temp)
        //         console.log(element.alunos)
        //     })
        //     // console.log(element.alunos);
        // });
        
        if(aula.length > 0){
            return res.json({'aula': aula});
        }else{
            return res.json({message:'Você não criou nenhuma aula, vire uns intrutor agora mesmo!'})
        }
    }
}
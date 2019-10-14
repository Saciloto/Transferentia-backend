const AulaModel = require('../models/AulaModel');
const UserModel = require('../models/UserModel');

module.exports = {
    async store(req,res){
        const {titulo,descricao,data,preco,professor} = req.body;
        const {filename:aulaImagem} = req.file;
        const [imageName]= aulaImagem.split('.');
        const filename = `${imageName}.jpg`;
        /*const jaExiste = await AulaModel.find({professor_id})

        if (jaExiste){
            console.log('Já existe essa aula magrão', professor_id)
            return res.json(jaExiste)
        }*/

        const aula = await AulaModel.create({
            professor,
            aulaImagem:filename,
            titulo,
            descricao,
            data,
            preco,
        })
        console.log(aula)
        return res.json(aula);
    },

    async index(req,res){
       //Retorna o número de aulas que um instrutor já criou, ou retorna uma mensagem caso não tenha
        const {user_id} = req.headers;
        console.log(user_id)
        const aula = await AulaModel.find({professor:user_id});
        if(aula.length > 0){
            console.log(aula);
            return res.json({'aula': aula});
        }else{
            return res.json({message:'Você não criou nenhuma aula, vire uns intrutor agora mesmo!'})
        }
    }
}
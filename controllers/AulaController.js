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
        
        const aulas = await AulaModel.find({});
        try{
            res.send(aulas);
        }catch(err){
            res.send(err)
        }
    }
}
const AulaModel = require('../models/AulaModel');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')


module.exports = {
    async store(req,res){
        const {titulo,descricao,materiais,data,preco,professor} = req.body;
        const {filename:aulaImagem} = req.file;
        const [imageName]= aulaImagem.split('.');
        const filename = `${imageName}.jpg`;
        
        await sharp(req.file.path)
                .resize(500)
                //.jpeg({quality:70})
                .toFile(
                    path.resolve(req.file.destination,'..',filename)
                )
        fs.unlinkSync(req.file.path);

        const aula = await AulaModel.create({
            professor,
            aulaImagem:filename,
            titulo,
            descricao,
            materiais,
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
    },

    async update(req,res){
        const {user_id,aula_id} = req.body;
        console.log(user_id,aula_id)
        const aula = await AulaModel.findById({_id:aula_id});
        
        const {professor} = aula;

        console.log({user_id,professor})
        if (user_id != professor){
            aula.alunos.push(user_id)
            console.log("Cadastrado")
            await aula.save();
            return res.json({message:'Agora só aguardar o instrutor entrar em contato, e aprender!'})
        }else{
            console.log('Você não pode se inscrever na sua aula!')
            return res.json({badMessage:'Você não pode se inscrever em sua própria aula!'})
        }
    },

    async delete(req,res){
        const aula = await AulaModel.findByIdAndDelete(req.params.id)
        console.log('Aula para excluir',req.params.id)
        if (!aula){
            res.status(404).send("No Item Found")
        }else{
            res.json({message:'Intrução excluída com sucesso!'})
        }
    }
}

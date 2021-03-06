const mongoose = require('mongoose');

const AulaSchema = new mongoose.Schema({
    aulaImagem: String,
    titulo:String,
    descricao:String,
    materiais:String,
    data:String,
    preco:Number,
    professor:{
        type:mongoose.Schema.Types.ObjectId,  //grava a refencia do usuário que criou a aula
        ref:'User'
    },
    alunos:[
        {type: mongoose.Schema.Types.ObjectId, // Grava a referencia do aluno que se inscreveu na aula
        ref:'User'},
    ]
},{
    timestamps:true
});

module.exports = mongoose.model('Aula',AulaSchema);
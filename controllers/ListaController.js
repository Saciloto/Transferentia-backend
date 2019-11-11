const UserModel = require('../models/UserModel');
const AulaModel = require('../models/AulaModel');

module.exports = {
    async index(req,res){
        const nomes_temp = [];
        let nomes = [];
        const {aula_id} = req.headers
       //console.log('id da aula',aula_id)
        const {alunos} = await AulaModel.findById(aula_id)
        //console.log('array de entrada',alunos)

        for( var i = 0; i < alunos.length; i++){
            const {name,celular,email} = await UserModel.findById(alunos[i])
            nomes_temp.push({'id':alunos[i],'nome':name,'celular':celular,'email':email});
            //console.log('array de nomes',nomes_temp)
            nomes = nomes_temp.filter((este,i) => nomes_temp.indexOf(este) === i)
            console.log('nomes final:',nomes)
        }
        
        try {
            res.json({'nomes':nomes})
        } catch (error) {
            res.json({message:'Desculpe estamos enfrentando problemas!'})
        }
    },
}
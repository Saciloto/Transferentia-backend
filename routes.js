const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const AulaController = require('./controllers/AulaController');
const LoginController = require('./controllers/LoginController');
const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const ListaController = require('./controllers/ListaController');


const routes = express.Router();
const upload = multer(uploadConfig);

{/* Rotas para User  PRONTO */ }
routes.get('/user',UserController.index);
routes.post('/user',upload.single('userImagem'), UserController.store);
routes.delete('/user/:id',UserController.delete)
routes.patch('/user/:id',UserController.update)

{/* Rotas de Login */}

routes.post('/login',LoginController.store);
routes.get('/login',LoginController.index);//Rota pra DEV

{/* Rotas para Aula */}
routes.post('/aula',upload.single('aulaImagem'), AulaController.store);
routes.get('/aula', AulaController.index);
routes.patch('/aula', AulaController.update);


{/* Rotas para Aluno */}
routes.get('/aluno', AlunoController.index);
routes.get('/professor',ProfessorController.index);
routes.get('/lista',ListaController.index);


module.exports = routes;
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const AulaController = require('./controllers/AulaController');
const LoginController = require('./controllers/LoginController');


const routes = express.Router();
const upload = multer(uploadConfig);

{/* Rotas para User  PRONTO */ }
routes.get('/user',UserController.index);
routes.post('/user',upload.single('userImagem'), UserController.store);
routes.delete('/user/:id',UserController.delete)
routes.patch('/user/:id',UserController.update)

{/* Rotas de Login */}

routes.post('/login',LoginController.store);

{/* Rotas para Aula */}
routes.post('/aula',upload.single('userImagem'), AulaController.store);
routes.get('/aula', AulaController.index);

module.exports = routes;
//express é uma função que quando chamada cria um novo servidor/ porta de entrada de onde pode receber requisições e retornar respostas
// GET= Buscar, POST= Inseriri, PUT=Editar, DELETE=Excluir
const express = require('express');
const mongoose = require('mongoose');//ODM ferramenta que trabalha com banco de dados usando apenas javascript
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://admin:admin@cluster0-1y2pg.mongodb.net/transferentia?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
})

const connectedUsers = {};

io.on('connection',socket =>{
    console.log('Nova Conexão', socket.id);
    console.log(socket.handshake.query); 

    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req,res,next) =>{  // Disponibiliza para todas as rotas da aplicação acesso aos dados do io atráves do req.io
    req.io = io;   
    req.connectedUsers = connectedUsers;
    return next();
})

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname,'uploads')));
app.use(express.json({limit:'50mb'}));
app.use(routes)
var porta = (process.env.PORT || 3333)
server.listen(porta)
//server.listen(3333)
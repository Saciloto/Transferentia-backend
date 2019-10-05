const multer = require('multer');
const path = require('path');
 //ASSIM FUNCIOA NO INSOMINIA MAS NÃO NO CELULAR
module.exports = {
    storage: multer.diskStorage({
        destination:path.resolve(__dirname,'..','uploads'),
        filename:(req,file,cb) =>{
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        }
    })
}

/*
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images')
    },
    filename:function(req,file,cb){
        cb(null, file.fieldname + '_' + Date.now())
    }
});

module.exports=  multer({
    storage: storage, fileFilter:function(_req,file,callback){
        const ext = path.extname(file.originalname);

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'){
            return callback(new error('apenas imagens são perimitirdas'))
        }
        callback(null,true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
});
*/
const multer = require('multer');
const path = require('path');
 //ASSIM FUNCIOA NO INSOMINIA MAS NÃO NO CELULAR
module.exports = {
    storage: multer.diskStorage({
        destination:path.resolve(__dirname,'..','uploads/resized'),
        filename:(req,file,cb) =>{
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        }
    })
}
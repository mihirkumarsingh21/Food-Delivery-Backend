import multer from "multer";
import {extname} from "path"

 const uploadFile = () => {
    let file;
    
   const storage = multer.diskStorage({

            destination: (req, file, cb) => {
                cb(null, "./public")
            },

            filename: (req, file, cb) => {
                const newFileName = Date.now() + extname(file.originalname);
                cb(null, newFileName);
            }
        })

    const limits = {
            fileSize: 1024 * 1024 * 5 // 1 kb = 1024 bytes, 1kb * 1024 = 1mb, 1mb * 5 = 5mb
        }

         return file = multer({
            limits,
            storage
        })

}

export const upload = uploadFile();



 
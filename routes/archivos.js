const express = require('express')
const fs = require('fs')


const ArchivosService = require('../services/archivos')



function archivosApi(app){
    const router = express.Router();
    app.use('/api/archivos', router);

    const archivosService = new ArchivosService();
    
    router.get('/', async function(req, res, next){
        const {tags} = req.query;
        try{
            const archivos = await archivosService.getArchivos({tags});
            res.status(200).json({
                message: 'Las tareas se listaron correctamente',
                data: archivos
            })
        }catch{
            next(err)
        }        
    })

    router.get('/:archivoId', async function(req, res, next){
        const {archivoId} = req.params
        try{
            const getArchivo = await archivosService.getArchivo({archivoId});
            const uploadPath = __dirname + '/../uploads/' + getArchivo._id;
            res.download(uploadPath, getArchivo.name);
        }catch(err){
            next(err)
        }        
    })

    router.post('/', async function(req, res, next){
        let sampleFile;
        let uploadPath;

        if(!fs.existsSync(__dirname + '/../uploads')){
            fs.mkdirSync(__dirname + '/../uploads');
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }

        console.log('req.files >>>', req.files); // eslint-disable-line

        sampleFile = req.files.sampleFile;

        try{        
            const archivo = {
                name: req.files.sampleFile.name,
                mimetype: req.files.sampleFile.mimetype,
                size: req.files.sampleFile.size,
            };
            const createArchivo = await archivosService.createArchivo({archivo});
            uploadPath = __dirname + '/../uploads/' + createArchivo.insertedId;
            sampleFile.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).json({
                    message: 'La tarea se creó correctamente',
                    data: createArchivo
                })
            });  
        }catch(err){
            next(err)
        }
    })

    router.delete('/:archivoId', async function(req, res, next){
        const {archivoId} = req.params
        try{
            const deleteArchivo = await archivosService.deleteArchivo({archivoId});
            const uploadPath = __dirname + '/../uploads/' + archivoId;
            if(fs.existsSync(uploadPath)){
                fs.unlinkSync(uploadPath);
            }
            res.status(200).json({
                message: 'La tarea se eliminó correctamente',
                data: deleteArchivo
            })
        }catch(err){
            next(err)
        }        
    })
}

module.exports = archivosApi;
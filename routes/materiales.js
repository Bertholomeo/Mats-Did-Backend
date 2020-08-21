const express = require('express')
const MaterialesService = require('../services/materiales')

function materialesApi(app){
    const router = express.Router();
    app.use('/api/materiales', router);

    const materialesService = new MaterialesService();
    
    router.get('/', async function(req, res, next){
        const {tags} = req.query;
        try{
            const materiales = await materialesService.getMateriales({tags});
            res.status(200).json({
                message: 'Las tareas se listaron correctamente',
                data: materiales
            })
        }catch{
            next(err)
        }        
    })

    router.get('/:materialId', async function(req, res, next){
        const {materialId} = req.params
        try{
            const getMaterial = await materialesService.getMaterial({materialId});
            res.status(200).json({
                message: 'La tarea se listó correctamente',
                data: getMaterial
            })
        }catch{
            next(err)
        }        
    })

    router.post('/', async function(req, res, next){
        const {body: material} = req
        try{
            const createMaterial = await materialesService.createMaterial({material});
            res.status(201).json({
                message: 'La tarea se creó correctamente',
                data: createMaterial
            })
        }catch{
            next(err)
        }        
    })

    router.put('/:materialId', async function(req, res, next){
        const {materialId} = req.params
        const {body: material} = req
        try{
            const updateMaterial = await materialesService.updateMaterial({materialId, material});
            res.status(200).json({
                message: 'La tarea se actualizó correctamente',
                data: updateMaterial
            })
        }catch{
            next(err)
        }        
    })

    router.delete('/:materialId', async function(req, res, next){
        const {materialId} = req.params
        try{
            const deleteMaterial = await materialesService.deleteMaterial({materialId});
            res.status(200).json({
                message: 'La tarea se eliminó correctamente',
                data: deleteMaterial
            })
        }catch{
            next(err)
        }        
    })
}

module.exports = materialesApi;
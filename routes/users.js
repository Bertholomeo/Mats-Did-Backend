const express = require('express')
const UsersService = require('../services/users')

function usersApi(app){
    const router = express.Router();
    app.use('/api/users', router);

    const usersService = new UsersService();
    
    router.get('/', async function(req, res, next){
        const {tags} = req.query;
        try{
            const users = await usersService.getUsers({tags});
            res.status(200).json({
                message: 'Los usuarios se listaron correctamente',
                data: users
            })
        }catch{
            next(err)
        }        
    })

    router.get('/:userId', async function(req, res, next){
        const {userId} = req.params
        try{
            const getUser = await usersService.getUser({userId});
            res.status(200).json({
                message: 'EL usuario se listó correctamente',
                data: getUser
            })
        }catch{
            next(err)
        }        
    })

    router.post('/', async function(req, res, next){
        const {body: user} = req
        try{
            const createUser = await usersService.createUser({user});
            res.status(201).json({
                message: 'EL usuario se creó correctamente',
                data: createUser
            })
        }catch{
            next(err)
        }        
    })

    router.put('/:userId', async function(req, res, next){
        const {userId} = req.params
        const {body: user} = req
        try{
            const updateUser = await usersService.updateUser({userId, user});
            res.status(200).json({
                message: 'El usuario se actualizó correctamente',
                data: updateUser
            })
        }catch{
            next(err)
        }        
    })

    router.delete('/:userId', async function(req, res, next){
        const {userId} = req.params
        try{
            const deleteUser = await usersService.deleteUser({userId});
            res.status(200).json({
                message: 'El usuario se eliminó correctamente',
                data: deleteUser
            })
        }catch{
            next(err)
        }        
    })

    router.get('/:login', async function(req, res, next){
        const {body:username} = req;
        const {body:password} = req;
        try{
            const autenticarUser = await usersService.autenticarUser({username, password});
            res.status(200).json({
                message: 'El usuario cargó correctamente',
                data: autenticarUser
            })
        }catch{
            next(err)
        }        
    })
}

module.exports = usersApi;
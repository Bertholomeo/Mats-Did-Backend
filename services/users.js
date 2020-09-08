const {usersMock} = require('../mocks/users');
const MongoLib = require('../lib/mongo');

class UsersService{    
    constructor(){
        this.collection = 'users';
        this.mongoDb = new MongoLib();
    }
    async getUsers({tags}){
        const query = tags && {tags: {$in: tags}}
        const users = await this.mongoDb.getAll(this.collection, query);
        return users || [];
    }

    async getUser({userId}){
        const getUser = await this.mongoDb.get(this.collection, userId);
        return getUser || {};
    }

    async createUser({user}){
        const createUser = await this.mongoDb.create(this.collection, user);
        return createUser;
    }

    async updateUser({userId, user}){
        const updateUser = await this.mongoDb.update(this.collection,userId, user);
        return updateUser;
    }

    async deleteUser({userId}){
        const deleteUser = await this.mongoDb.delete(this.collection,userId);
        return deleteUser;
    }

    async autenticaUser({user, username, userPassword}) {
        const autenticarUser = await this.mongoDb.get(this.collection, username, userPassword);
        if (userPassword === user.password) {
            return userId
        } else {
            console.log ('El usuario no existe')
        }     return autenticarUser;   
    } 
        
}

module.exports = UsersService;
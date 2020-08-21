const {materialesMock} = require('../mocks/materiales');
const MongoLib = require('../lib/mongo');

class MaterialesService{    
    constructor(){
        this.collection = 'materiales';
        this.mongoDb = new MongoLib();
    }
    async getMateriales({tags}){
        const query = tags && {tags: {$in: tags}}
        const materiales = await this.mongoDb.getAll(this.collection, query);
        return materiales || [];
    }

    async getMaterial({materialId}){
        const getMaterial = await this.mongoDb.get(this.collection, materialId);
        return getMaterial || {};
    }

    async createMaterial({material}){
        const createMaterial = await this.mongoDb.create(this.collection, material);
        return createMaterial;
    }

    async updateMaterial({materialId, material}){
        const updateMaterial = await this.mongoDb.update(this.collection,materialId, material);
        return updateMaterial;
    }

    async deleteMaterial({materialId}){
        const deleteMaterial = await this.mongoDb.delete(this.collection,materialId);
        return deleteMaterial;
    }
}

module.exports = MaterialesService;
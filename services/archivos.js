const MongoLib = require('../lib/mongo');

class ArchivosService{    
    constructor(){
        this.collection = 'archivos';
        this.mongoDb = new MongoLib();
    }
    async getArchivos({tags}){
        const query = tags && {tags: {$in: tags}}
        const archivos = await this.mongoDb.getAll(this.collection, query);
        return archivos || [];
    }

    async getArchivo({archivoId}){
        const getArchivo = await this.mongoDb.get(this.collection, archivoId);
        return getArchivo || {};
    }

    async createArchivo({archivo}){
        const createArchivo = await this.mongoDb.create(this.collection, archivo);
        return createArchivo;
    }

    async updateArchivo({archivoId, archivo}){
        const updateArchivo = await this.mongoDb.update(this.collection,archivoId, archivo);
        return updateArchivo;
    }

    async deleteArchivo({archivoId}){
        const deleteArchivo = await this.mongoDb.delete(this.collection,archivoId);
        return deleteArchivo;
    }
}

module.exports = ArchivosService;
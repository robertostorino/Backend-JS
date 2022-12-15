//  Container
import knex from 'knex';

export class ClienteSQL {

    // El constructor recibe las options y la tabla
    constructor(options, table) {
        // al instanciar esta clase, el constructor utiliza la conexión con options
        this.knex = knex(options);
        this.table = table;
    }

    // Recibe nombre de tabla (messages o products). Si existe hace drop y luego la crea.
    createTable() {
        // Si la tabla existe, entonces la elimina
        return this.knex.schema.dropTableIfExists(this.table)
            .finally( () => {
                //  Crea la tabla con sus columnas y tipos
                return this.knex.schema.createTable(this.table, table => {
                    switch (this.table) {
                        case 'messages':
                            table.increments('id').primary();
                            table.string('author').notNullable();
                            table.string('date').notNullable();
                            table.string('text').notNullable();
                            break;
                        case 'products':
                            table.increments('id').primary();
                            table.string('title').notNullable();
                            table.integer('price').notNullable();
                            table.string('thumbnail').notNullable();
                            break;
                        default:
                            break;
                    }
                })
            })
    }

    async close (){
        return await this.sql.destroy();
    }

    //  Returns an array of items.
    async getAll() {
        try{
            return this.knex.select('*').from(this.table)
        } catch (error){
            console.log(error);
        } finally{
            await this.close();
        }
    }

    // Returns an item by id
    async getById(id) {
        try {
            return this.knex.select("*").from(this.table).where("id", "=", id);
        } catch (error) {
            console.log(error);
        } finally {
            await this.close();
        }
    }

    //  Save item
    async save(object) {
        try {
            return this.knex(this.table).insert(object)
        } catch (error) {
            console.log(error);
        } finally {
            await this.close();
        }
    }

    // Update an item by id with the given object
    async update(id, newObject){
        try {
            return await this.knex.from(this.table).where("id", "=", id).update(newObject);
        } catch (error) {
            console.log(error);
        } finally {
            await this.close();
        }
    }

    // Remove an item by id
    async deleteById(id){
        try {
            return await this.knex.from(this.table).where("id", "=", id).del();
        } catch (error) {
            console.log(error);
        } finally {
            await this.close();
        }
    }

    // Removes all items from table
    async deleteAll() {
        try {
            return await this.knex.from(this.table).truncate();
        } catch (error) {
            console.log(error);
        } finally {
            await this.close();
        }
    }
}
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

    //  Returns an array of items.
    getAll() {
        return this.knex.select('*').from(this.table)
    }

    //  Save item
    save(object) {
        try {
            return this.knex(this.table).insert(object)
        } catch (error) {
            return false;
        }
    }
}
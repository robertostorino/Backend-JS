import { config, selectedDatabase } from "../constants/config.js";
import { createMongoConnection } from "./createMongoConnection.js";
import { createFirebaseConnection } from "./createFirebaseConnection.js";

function createDatabase() {

    switch (selectedDatabase) {
        // FILE SYSTEM
        default:
        case 1:
            return createFilesConnection(config.productsCollection, config.cartCollection)
        
        //MONGO ATLAS
        case 2:
            return createMongoConnection(config.mongooseURL);
        
        //FIREBASE
        case 3:
            return createFirebaseConnection(config.productsCollection, config.cartCollection);

    }
}

export { createDatabase }

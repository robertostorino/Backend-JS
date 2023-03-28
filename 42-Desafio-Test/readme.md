# Inicializo package.json
npm init -y

# Dependencias Locales
npm i @faker-js/faker axios bcrypt connect-mongo dotenv express express-handlebars express-session express-validatorminimist moment mongoose normalizr passport passport-local socket.io compression winston autocannon chai ip mocha supertest

# Dependencia Global
npm i -g pm2 forever artillery 0x


# REQUESTS/RESPONSES

## GET /api/randoms

     GET http://localhost:8080/api/randoms?cant=7

###   Ejemplo respuesta
    
    {
        "306": 1,
        "453": 1,
        "627": 1,
        "665": 1,
        "788": 1,
        "815": 1,
        "988": 1
    }
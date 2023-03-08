# Inicializo package.json
npm init -y

# Dependencias Locales
npm i bcrypt connect-mongo dotenv express express-handlebars express-session express-fileupload minimist mongoose passport passport-local compression winston autocannon twilio nodemailer

# Dependencia Global
npm i -g pm2 forever artillery 0x



## REQUESTS/RESPONSE

# GET /api/productos

 GET http://localhost:8080/api/productos
 
 Ejemplo respuesta
 
	[
		{
			"_id": "6407f0c6093c673cf7da4487",
			"timestamp": "2023-03-08T02:19:50.401Z",
			"nombre": "monitor 24 ips",
			"descripcion": "monitor 24 ips",
			"codigo": 123123,
			"foto": "https://cdn4.iconfinder.com/data/icons/hardware-and-devices/64/Hardware_devices_monitor-64.png",
			"precio": 55000,
			"stock": 12,
			"tipo": "hardware",
			"__v": 0
		},
		{
			"_id": "6407f281093c673cf7da448a",
			"timestamp": "2023-03-08T02:27:13.547Z",
			"nombre": "CPU Gamer Intel",
			"descripcion": "CPU Gamer Intel",
			"codigo": 129929,
			"foto": "https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/desktop-pc-64.png",
			"precio": 200000,
			"stock": 12,
			"tipo": "hardware",
			"__v": 0
		}
	]
	
# GET /api/productos/:id
	GET http://localhost:8080/api/productos/6407f0c6093c673cf7da4487
	
	Ejemplo respuesta
	
	{
		"_id": "6407f0c6093c673cf7da4487",
		"timestamp": "2023-03-08T02:19:50.401Z",
		"nombre": "monitor 24 ips",
		"descripcion": "monitor 24 ips",
		"codigo": 123123,
		"foto": "https://cdn4.iconfinder.com/data/icons/hardware-and-devices/64/Hardware_devices_monitor-64.png",
		"precio": 55000,
		"stock": 12,
		"tipo": "hardware",
		"__v": 0
	}
	
# POST /api/productos/
	POST http://localhost:8080/api/productos/
	
	Ejemplo solicitud
	
	{
        "nombre": "CPU Gamer Intel",
        "descripcion": "CPU Gamer Intel",
        "codigo": "129929",
		"foto": "https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/desktop-pc-64.png",
        "precio": "200000",
        "stock": "12",
        "tipo": "hardware"
	}
	
	Ejemplo respuesta
	
	"Product has been correctly added."
	
# PUT /api/productos/:id
	PUT http://localhost:8080/api/productos/6407f281093c673cf7da448a
	
	Ejemplo solicitud
	
	{
        "nombre": "CPU Gamer Intel i7",
        "descripcion": "CPU Gamer Intel i7",
        "codigo": "129929",
		"foto": "https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/desktop-pc-64.png",
        "precio": "200000",
        "stock": "12",
        "tipo": "hardware"
	}
	
	Ejemplo respuesta
	
	"Product has been correctly updated."
	
# DELETE /api/carrito/:id
	DELETE http://localhost:8080/api/productos/6408040516b3a67ecaeb5c67
	
	Ejemplo respuesta
	
	"Product deleted"
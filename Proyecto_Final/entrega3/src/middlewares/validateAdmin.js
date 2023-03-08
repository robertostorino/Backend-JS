const isAuthorized = (req, res, next) => {
	const admin = true;
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};

export { isAuthorized };
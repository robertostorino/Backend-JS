const requireAuthentication = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/login");
};

export default requireAuthentication;
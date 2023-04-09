const requireAuthentication = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        await next()
    } else {
        ctx.redirect("/login")
    }
    // return req.isAuthenticated() ? next() : res.redirect("/login");
};

export default requireAuthentication;
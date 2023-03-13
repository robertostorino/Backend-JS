

async function login (req, res) {
    if (req.isAuthenticated()){
        res.render('/')
    } else {
        res.render('login')
    }
};

async function faillogin (req, res) {
    res.render('faillogin')
}

export default { login, faillogin }
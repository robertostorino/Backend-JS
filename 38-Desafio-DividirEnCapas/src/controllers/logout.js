async function logout (req, res) {
    const username = req.session.username;
    req.session.destroy( err => {
        if (!err) {
            res.render('./logout', { username })
        } else {
            res.send({ status: 'logout error', body: err })
        }
    })
};

export default { logout }
import { sysInfo } from "../process/sysInfo.js"

async function info (req, res) {
    res.render('info', {info: sysInfo()})
}


export default {
    info
}
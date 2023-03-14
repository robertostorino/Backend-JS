import { sysInfo } from "../process/sysInfo.js"

async function compress (req, res) {
    res.render('info', {info: sysInfo()})
}

export default { compress }
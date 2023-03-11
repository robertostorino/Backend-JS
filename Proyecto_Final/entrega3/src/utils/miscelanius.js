import * as dotenv from 'dotenv'
dotenv.config();

function getHostName(req) {
    return `${process.env.PREFIX}://${req.rawHeaders[1]}`
}

function getImageFileName(req) {
    let ext = req.files.avatar.mimetype.split('/')[1];
    return `${req.body.username}.${ext}`;
}

export { getHostName, getImageFileName }
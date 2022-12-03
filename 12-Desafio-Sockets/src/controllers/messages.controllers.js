const Message = require('../Model/messagesContainer');
const bd = new Message('messages');

function toSocketMessages(){
    let response =  bd.getAll();
    return response;
}

async function insertMessage(message){   
    await bd.save(message);
}


module.exports = {
    toSocketMessages,
    insertMessage
};
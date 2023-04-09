class ChatDTO {
    constructor({ author, date, text, id }) {
        this.author = author,
        this.date = date,
        this.text = text,
        this.id = id
    }
};

export function transformToDto(chat) {
    if (Array.isArray(chat)) {
        return chat.map(c => new ChatDTO(c))
    } else {
        return new ChatDTO(chat)
    }
};

export default { ChatDTO };
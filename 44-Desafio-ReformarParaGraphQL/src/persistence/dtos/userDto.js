class UserDTO {
    constructor({ username, password }) {
        this.username = username,
        this.password = password
    }
};

export function transformToDto(users) {
    if (Array.isArray(users)) {
        return users.map(u => new UserDTO(u))
    } else {
        return new UserDTO(users)
    }
};

export default { UserDTO };
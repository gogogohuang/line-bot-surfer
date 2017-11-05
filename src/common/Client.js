export class Client{
    constructor(userId, status) {
        this.user = userId,
            this.status = status
    }
    getUser = () => this.user;
    getStatus = () => this.status;
    setStatus = (status) => {this.status = status;}
}
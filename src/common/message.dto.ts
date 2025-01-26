export class MessageDTO{
    message: string[] = [];

    constructor(message: string){
        this.message[0] = message;
    }
}
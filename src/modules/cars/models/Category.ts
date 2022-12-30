import { v4 as uuid } from 'uuid';

class Category {

    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) { // se o id estiver vazio cria um novo
            this.id = uuid();
        }
    }

}

export { Category };
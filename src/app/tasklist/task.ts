export class Task {
    title: string|null;
    status: string;
    id: string;
    tipo: string;

    constructor() {
        this.title = "";
        this.status = "";
        this.id = "";
        this.tipo  = "";
    }
}
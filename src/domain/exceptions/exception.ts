export class ApiException {
    private _code?: number 
    private _message?: string
    private _description?: string

    get code(): number {
        return this._code
    }

    set code(code: number) {
        this._code = code
    }

    get message(): string {
        return this._message
    }

    set message(message: string) {
        this._message = message
    }

    get description(): string {
        return this._description
    }

    set description(description: string) {
        this._description = description
    }

    public fromJSON(json: any) {
        if (json === undefined){ 
            json = {}
        }    
        
        if (json.code !== undefined) this._code = json.code
        if (json.message !== undefined) this._message = json.message
        if (json.description !== undefined) this._description = json.description

        return this
    }

}

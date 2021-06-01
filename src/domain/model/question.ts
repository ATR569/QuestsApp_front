import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface';
import { Answer } from './answer'
import { User } from './user'

export class Question extends Entity implements IJSONTransformable<Question> {
    private _description?: string
    private _creator?: User
    private _answers?: Array<Answer>

    get description() : string | undefined{
        return this._description
    }

    set description(description: string | undefined) {
        this._description = description
    }

    get creator() : User | undefined{
        return this._creator
    }

    set creator(creator: User | undefined) {
        this._creator = creator
    }

    get answers() : Array<Answer> | undefined{
        return this._answers
    }

    set answers(answers: Array<Answer> | undefined) {
        this._answers = answers
    }
    
    public toJSON(): object {
        return {
            id: this.id,
            description: this.description,
            creator: this.creator,
            answers: this.answers
        }
    }

    public fromJSON(json: any): Question {
        if (json === undefined) {
            json = {}
        }

        if (json.id !== undefined) this.id = json.id
        if (json.description !== undefined) this.description = json.description
        if (json.creator !== undefined) this.creator = new User().fromJSON(json.creator)
        if (json.answers !== undefined && json.answers instanceof Array) {
            this.answers = json.answers.map((answer: any) => new Answer().fromJSON(answer))
        }

        return this
    }

    public getAnswerCount(): number {
        return this.answers ? this.answers.length : 0
    }

}
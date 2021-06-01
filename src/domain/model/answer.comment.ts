import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'
import { User } from './user'

export class AnswerComment extends Entity implements IJSONTransformable<AnswerComment> {
    private _comment?: string
    private _score?: number
    private _author?: User

    set comment(comment: string) {
        this._comment = comment
    }

    set score(score: number) {
        this._score = score
    }

    get comment(): string {
        return this._comment
    }

    get score(): number {
        return this._score
    }

    get author(): User | undefined{
        return this._author
    }

    set author(author: User | undefined) {
        this._author = author
    }

    public toJSON(): object {
        const json = {
            id: this.id,
            comment: this.comment,
            score: this.score,
            author: this.author,
        }

        return json
    }
    
    public fromJSON(json: any): AnswerComment {
        if (json === undefined) {
            json = {}
        }

        if (json.id !== undefined) this.id = json.id
        if (json.comment !== undefined) this.comment = json.comment
        if (json.score !== undefined) this.score = json.score
        if (json.author !== undefined) this.author = new User().fromJSON(json.author)

        return this
    }
}
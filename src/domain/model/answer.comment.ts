import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'

export class AnswerComment extends Entity implements IJSONTransformable<AnswerComment> {
    private _comment?: string
    private _score?: number

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

    public toJSON(): object {
        const json = {
            id: this.id,
            comment: this.comment,
            score: this.score
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

        return this
    }
}
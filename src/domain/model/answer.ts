import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'
import { AnswerComment } from './answer.comment'
import { User } from './user'

export class Answer extends Entity implements IJSONTransformable<Answer> {
    private _description?: string
    private _score?: number
    private _answerComments?: Array<AnswerComment>
    private _author?: User

    set description(description: string) {
        this._description = description
    }

    set score(score: number) {
        this._score = score
    }

    set answerComments(comments: Array<AnswerComment>) {
        this._answerComments = comments
    }

    set author(author: User) {
        this._author = author
    }

    get description(): string {
        return this._description
    }

    get score(): number {
        return this._score
    }

    get answerComments(): Array<AnswerComment> {
        return this._answerComments
    }

    get author(): User {
        return this._author
    }

    public toJSON(): object {
        const json = {
            id: this.id,
            description: this.description,
            score: this.score,
            answerComments: this.answerComments,
            author: this.author,
        }

        return json
    }

    public fromJSON(json: any): Answer {
        if (json === undefined) {
            json = {}
        }

        if (json.id !== undefined) this.id = json.id
        if (json.description !== undefined) this.description = json.description
        if (json.score !== undefined) this.score = json.score
        if (json.comments !== undefined && json.comments instanceof Array) {
            this.answerComments = json.comments.map((comment: any) => new AnswerComment().fromJSON(comment))
        }
        if (json.author !== undefined) this.author = new User().fromJSON(json.author)

        return this
    }
}
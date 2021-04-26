import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'
import { Question } from './question'

export class Questionnaire extends Entity implements IJSONTransformable<Questionnaire> {
    private _discipline?: string
    private _questions?: Array<Question>

    public get discipline(): string | undefined {
        return this._discipline
    }

    public set discipline(discipline: string | undefined) {
        this._discipline = discipline
    }

    public get questions(): Array<Question> | undefined {
        return this._questions
    }

    public set questions(questions: Array<Question> | undefined) {
        this._questions = questions
    }

    public toJSON(): object {
        return {
            id: this.id,
            discipline: this.discipline,
            questions: this.questions
        }
    }

    public fromJSON(json: any): Questionnaire {
        if (json === undefined) {
            json = {}
        }
        if (json.id !== undefined) this.id = json.id
        if (json.discipline !== undefined) this.discipline = json.discipline
        if (json.questions !== undefined && json.questions instanceof Array) {
            this.questions = json.questions.map((question: any) => new Question().fromJSON(question))
        }

        return this
    }

    public getQuestionsCount(): number {
        return this.questions ? this.questions.length : 0
    }
}
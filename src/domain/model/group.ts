import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'
import { Questionnaire } from './questionnaire'
import { User } from './user'

export class Group extends Entity implements IJSONTransformable<Group> {
    private _name?: string
    private _administrator?: User
    private _membersCount?: number
    private _questionnairesCount?: number

    get name(): string | undefined {
        return this._name
    }

    set name(name: string | undefined) {
        this._name = name
    }

    get administrator(): User | undefined {
        return this._administrator
    }

    set administrator(administrator: User | undefined) {
        this._administrator = administrator
    }

    get membersCount(): number | undefined {
        return this._membersCount
    }

    set membersCount(membersCount: number | undefined) {
        this._membersCount = membersCount
    }

    get questionnairesCount(): number | undefined {
        return this._questionnairesCount
    }

    set questionnairesCount(questionnairesCount: number | undefined) {
        this._questionnairesCount = questionnairesCount
    }

    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            administrator: this.administrator,
            members: this.membersCount,
            questionnaires: this.questionnairesCount
        }
    }

    public fromJSON(json: any): Group {
        if (json === undefined) {
            json = {}
        }

        if (json.id !== undefined) this.id = json.id
        if (json.name !== undefined) this.name = json.name
        if (json.administrator !== undefined) this.administrator = new User().fromJSON(json.administrator)
        if (json.membersCount !== undefined) this.membersCount = json.membersCount
        if (json.questionnairesCount !== undefined) this.questionnairesCount = json.questionnairesCount
        return this
    }
}
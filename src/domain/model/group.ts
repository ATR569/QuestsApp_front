import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'
import { Questionnaire } from './questionnaire'
import { User } from './user'

export class Group extends Entity implements IJSONTransformable<Group> {
    private _name?: string
    private _administrator?: User 
    private _members?: Array<User> 
    private _questionnaires?: Array<Questionnaire> 

    get name() : string | undefined{
        return this._name
    }

    set name(name: string | undefined) {
        this._name = name
    }

    get administrator() : User | undefined{
        return this._administrator
    }

    set administrator(administrator: User | undefined) {
        this._administrator = administrator
    }

    get members() : Array<User> | undefined{
        return this._members
    }

    set members(members: Array<User> | undefined) {
        this._members = members
    }

    get questionnaires() : Array<Questionnaire> | undefined{
        return this._questionnaires
    }

    set questionnaires(questionnaires: Array<Questionnaire> | undefined) {
        this._questionnaires = questionnaires
    }
    
    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            administrator: this.administrator,
            members: this.members,
            questionnaires: this.questionnaires
        }
    }

    public fromJSON(json: any): Group {
        if (json.id !== undefined) this.id = json.id
        if (json.name !== undefined) this.name = json.name
        if (json.administrator !== undefined) this.administrator = json.administrator
        if (json.members !== undefined) this.members = json.members
        if (json.questionnaires !== undefined) this.questionnaires = json.questionnaires

        return this
    }

    public getMembersCount(): number {
        return this._members.length
    }

    public getQuestionnairesCount(): number {
        return this._questionnaires.length
    }

    public getQuestionsFromQuestionnairesCount(): number {
        return Math.floor(Math.random() * (100 - 1) + 1)
    }
}
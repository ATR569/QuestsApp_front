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
        if (json === undefined) {
            json = {}
        }
        
        if (json.id !== undefined) this.id = json.id
        if (json.name !== undefined) this.name = json.name
        if (json.administrator !== undefined) this.administrator = new User().fromJSON(json.administrator)
        if (json.members !== undefined && json.members instanceof Array) {
            this.members = json.members.map((member: any) => new User().fromJSON(member))
        }
        if (json.questionnaires !== undefined && json.questionnaires instanceof Array) {
            this.questionnaires = json.questionnaires.map((questionnaire: any) => new User().fromJSON(questionnaire))
        }

        return this
    }

    public getMembersCount(): number {
        return this.members ? this.members.length : 0
    }

    public getQuestionnairesCount(): number {
        return this.questionnaires ? this.questionnaires.length : 0
    }

    public getQuestionsFromQuestionnairesCount(): number {
        if (!this.questionnaires) return 0

        return this.questionnaires.reduce((acc, quest) => acc += quest.getQuestionsCount(), 0)
    }
}
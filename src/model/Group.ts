export default class Group {
    private _id: string
    private _descricao: string
    private _members: Array<Number>
    private _questionnaires: Array<Number>

    public get id(): string {
        return this._id
    }

    public get descricao(): string {
        return this._descricao
    }

    public get members(): Array<Number> {
        return this._members
    }

    public get questionnaires(): Array<Number> {
        return this._questionnaires
    }

    public set id(id: string) {
        this._id = id;
    }

    public set descricao(descricao: string) {
        this._descricao = descricao;
    }

    public set members(members: Array<Number>) {
        this._members = members;
    }

    public set questionnaires(questionnaires: Array<Number>) {
        this._questionnaires = questionnaires;
    }

    public getMembersCount(): Number {
        return this._members.length
    }

    public getQuestionnairesCount(): Number {
        return this._questionnaires.length
    }

    public getQuestionsFromQuestionnairesCount(): Number {
        return Math.floor(Math.random() * (100 - 1) + 1)
    }
}
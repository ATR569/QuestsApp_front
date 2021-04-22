export default class Group {
    private _descricao: string
    private _members: Array<Number>
    private _questionnaires: Array<Number>

    public get descricao(): string {
        return this._descricao
    }

    public get members(): Array<Number> {
        return this._members
    }

    public get questionnaires(): Array<Number> {
        return this._questionnaires
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
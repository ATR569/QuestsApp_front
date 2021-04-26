import { Entity } from './entity'
import { IJSONTransformable } from './json.transformer.interface'

export class Answer extends Entity implements IJSONTransformable<Answer> {
    public toJSON(): object {
        const json = {
            id: this.id
        }

        return json
    }
    
    public fromJSON(json: any): Answer {
        if (json.id !== undefined) this.id = json.id

        return this
    }
}
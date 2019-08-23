import {Image} from "../Image";

export class SuperHero {
    private readonly _id: number;
    private readonly _name: string;
    private _portrait: Image;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set portrait(image: Image) {
        this._portrait = image;
    }

    get portrait(): Image {
        return this._portrait;
    }
}
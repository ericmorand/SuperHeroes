import {SuperHero} from "../../Entity/SuperHero";

type SuperHeroRepr = {
    response: string,
    error: string,
    id: string,
    name: string,
    image: {
        url: string
    }
};

export class SuperHeroService {
    private _token: string;

    constructor(token?: string) {
        this._token = token;
    }

    authenticate(accessToken: string): Promise<string> {
        return fetch(`https://www.superheroapi.com/api.php/${accessToken}`)
            .then((response) => {
                return response.json();
            })
            .then(function(data: {response: any, error: string}) {
                if (data.response === 'error' && data.error === 'access denied') {
                    return null;
                }

                return accessToken;
            });
    }

    get(id: number): Promise<SuperHero> {
        return fetch(`https://www.superheroapi.com/api.php/${this._token}/${id}`)
            .then((response) => {
                return response.json();
            })
            .then(function(data: SuperHeroRepr) {
                let sh = new SuperHero(Number.parseInt(data.id), data.name);

                sh.portrait = {
                    url: data.image.url,
                    title: data.name,
                    alt: `${data.name}'s portrait`
                };

                return sh;
            });
    }
}
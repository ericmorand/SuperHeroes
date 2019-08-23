import * as React from "react";
import "./index.scss";
import {SuperHeroService} from "../../model/Service/SuperHero";
import {SuperHero as SuperHeroEntity} from "../../model/Entity/SuperHero";
import {load} from "../../store";
import {Image} from "../Image";

interface SuperHeroProps {
    superHero: SuperHeroEntity
}

export class SuperHero<P, S> extends React.Component<SuperHeroProps, S> {
    constructor(props: Readonly<SuperHeroProps>) {
        super(props);
    }

    componentDidMount() {

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div className={"super-hero"}>
            {this.props.superHero.portrait ? <Image image={this.props.superHero.portrait}/> : null}
        </div>
    }
}

interface SuperHeroListState {
    superHeroes: Map<number, SuperHeroEntity>
}

export class SuperHeroList<P, S> extends React.Component<P, SuperHeroListState> {
    constructor(props: Readonly<P>) {
        super(props);

        this.state = {
            superHeroes: new Map()
        };
    }

    componentDidMount() {
        let service = new SuperHeroService(load('access_token'));

        let map = new Map();
        let count: number = 20; //731;

        for (let i = 1; i <= count; i++) {
            map.set(i, new SuperHeroEntity(i, `${i}`));
        }

        this.setState({
            superHeroes: map
        });

        console.warn(map);

        for (let i = 1; i <= count; i++) {
            service.get(i)
                .then((superHero: SuperHeroEntity) => {
                    map.set(i, superHero);

                    this.setState({
                        superHeroes: map
                    });
                });
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let cells: any = [];

        for (let [id, sh] of this.state.superHeroes) {
            cells.push(<div className={"cell"}><SuperHero superHero={sh} key={id}/></div>);
        }

        return <div className={"super-hero-list"}>
            {cells}
        </div>;
    }
}
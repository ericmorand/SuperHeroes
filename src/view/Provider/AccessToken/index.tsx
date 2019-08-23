import * as React from "react";
import {load, save, observe} from "../../../store";
import {SuperHeroService} from "../../../model/Service/SuperHero";

interface AccessTokenProviderState {
    authenticating: boolean,
    authenticated: boolean
}

export class AccessTokenProvider<P, S> extends React.Component<P, AccessTokenProviderState> {
    private _value: string;

    constructor(props: Readonly<P>) {
        super(props);

        this.state = {
            authenticating: false,
            authenticated: false
        };

        observe('access_token', (value: string) => {
            if (!value) {
                this.setState({
                    authenticated: false
                });
            }
        });
    }

    protected handleChange(event: React.FormEvent<HTMLInputElement>) {
        this._value = event.currentTarget.value;
    }

    protected handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.authenticate(this._value);
    }

    protected authenticate(token: string): Promise<void> {
        this.setState({
            authenticating: true
        });

        let service = new SuperHeroService();

        return service.authenticate(token)
            .then((token: string) => {
                save('access_token', token);

                this.setState({
                    authenticating: false,
                    authenticated: token !== null
                });
            });
    }

    componentDidMount(): void {
        let token = load('access_token');

        if (token) {
            this.authenticate(token);
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return this.state.authenticating ? 'LOADING' : this.state.authenticated ? this.props.children : <div className={"access-token-provider"}>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type={"text"} onChange={this.handleChange.bind(this)} disabled={this.state.authenticating}/>
                <button type={"submit"} disabled={this.state.authenticating}>Submit</button>
            </form>
        </div>;
    }
}
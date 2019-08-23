import * as React from "react";
import "./index.scss";
import {AccessTokenProvider} from "../Provider/AccessToken";
import {save} from "../../store";
import {SuperHeroList} from "../SuperHero";

export class App<P, S> extends React.Component<P, S> {
    constructor(props: Readonly<P>) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div>
            <AccessTokenProvider>
                <div className={"toolbar"}>
                    <button type={"button"} onClick={() => {
                        save('access_token', null);
                    }}>Log out
                    </button>
                </div>
                <SuperHeroList></SuperHeroList>
            </AccessTokenProvider>
        </div>;
    }
}
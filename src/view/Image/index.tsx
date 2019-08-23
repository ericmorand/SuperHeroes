import * as React from "react";
import {Image as ImageType} from "../../model/Entity/Image";
import "./index.scss";

interface ImageProps {
    image: ImageType
}

export class Image<P, S> extends React.Component<ImageProps, S> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <img title={this.props.image.title} src={this.props.image.url} alt={this.props.image.alt}/>;
    }
}
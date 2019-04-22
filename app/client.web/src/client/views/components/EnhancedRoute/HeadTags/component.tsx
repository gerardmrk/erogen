import * as React from "react";
import { Helmet } from "react-helmet";
import { LocalProps } from ".";

export type Props = LocalProps;

export type State = {};

export class HeadTags extends React.PureComponent<Props, State> {
  private titleTemplate?: string;
  private appName: string;
  private url: string;
  private title: string;
  private description: string;
  private keywords: string;
  private metaType: string;
  private metaImageUrl: string;
  private metaImageAlt: string;
  private metaTwitterCardType:
    | "summary"
    | "summary_large_image"
    | "app"
    | "player";

  public constructor(props: Props) {
    super(props);
    const { config } = props;

    this.titleTemplate = props.title ? `${config.appName} | %s` : "%s";
    this.appName = config.appName;
    this.url = props.path ? `${config.appUrl}${props.path}` : config.appUrl;
    this.title = props.title || config.appName;
    this.description = props.description || config.appDescription;
    this.keywords = props.keywords || config.appKeywords || config.appName;
    this.metaType = props.metaType || "website";
    this.metaImageUrl = props.metaImgPath ? `${this.url}${props.metaImgPath}` : `${this.url}${config.appImagePath}`; // prettier-ignore
    this.metaImageAlt = props.metaImgAlt || config.appName;
    this.metaTwitterCardType = props.metaTwitterCardType || config.appTwitterCardType || "summary_large_image"; // prettier-ignore
  }

  public render() {
    const { config } = this.props;
    return (
      <Helmet titleTemplate={this.titleTemplate}>
        {/* HTML5 */}
        <link href={this.url} rel="canonical" />
        <title>{this.title}</title>
        <meta name="description" content={this.description} />
        <meta name="keywords" content={this.keywords} />

        {/* Schema.org */}
        <meta itemProp="url" content={this.url} />
        <meta itemProp="name" content={this.title} />
        <meta itemProp="description" content={this.description} />
        <meta itemProp="image" content={this.metaImageUrl} />

        {/* Open Graph */}
        <meta name="og:url" content={this.url} />
        <meta name="og:site_name" content={this.appName} />
        <meta name="og:title" content={this.title} />
        <meta name="og:description" content={this.description} />
        <meta name="og:type" content={this.metaType} />
        <meta name="og:image" content={this.metaImageUrl} />
        <meta name="og:image:alt" content={this.metaImageAlt} />

        {/* Twitter */}
        <meta name="twitter:domain" content={config.appUrl} />
        <meta name="twitter:site" content={config.appTwitterHandle} />
        <meta name="twitter:creator" content={config.appTwitterHandle} />
        <meta name="twitter:url" content={this.url} />
        <meta name="twitter:title" content={this.title} />
        <meta name="twitter:description" content={this.description} />
        <meta name="twitter:image" content={this.metaImageUrl} />
        <meta name="twitter:image:alt" content={this.metaImageAlt} />
        <meta name="twitter:card" content={this.metaTwitterCardType} />
      </Helmet>
    );
  }
}

export default HeadTags;

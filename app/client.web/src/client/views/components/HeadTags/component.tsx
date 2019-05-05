import * as React from "react";
import { Helmet } from "react-helmet-async";
import { LocalProps } from ".";

export type Props = LocalProps;

export type State = {};

export class HeadTags extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);
  }

  // prettier-ignore
  public render() {
    const { config } = this.props;
    const titleTemplate = this.props.title ? `${config.appName} | %s` : "%s";
    const appName = config.appName;
    const url = !this.props.path || this.props.path === "/" ? config.appUrl : `${config.appUrl}${this.props.path}`;
    const title = this.props.title || config.appName;
    const description = this.props.description || config.appDescription;
    const keywords = this.props.keywords || config.appKeywords || config.appName;
    const metaType = this.props.metaType || "website";
    const metaImageUrl = this.props.metaImgPath ? `${url}${this.props.metaImgPath}` : `${url}${config.appImagePath}`;
    const metaImageAlt = this.props.metaImgAlt || config.appName;
    const metaTwitterCardType = this.props.metaTwitterCardType || config.appTwitterCardType || "summary_large_image";

    return (
      <Helmet titleTemplate={titleTemplate}>
        {/* HTML5 */}
        <link href={url} rel="canonical" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* **NON-SEO** */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Schema.org */}
        <meta itemProp="url" content={url} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={metaImageUrl} />

        {/* Open Graph */}
        <meta name="og:url" content={url} />
        <meta name="og:site_name" content={appName} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content={metaType} />
        <meta name="og:image" content={metaImageUrl} />
        <meta name="og:image:alt" content={metaImageAlt} />

        {/* Twitter */}
        <meta name="twitter:domain" content={config.appUrl} />
        <meta name="twitter:site" content={config.appTwitterHandle} />
        <meta name="twitter:creator" content={config.appTwitterHandle} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImageUrl} />
        <meta name="twitter:image:alt" content={metaImageAlt} />
        <meta name="twitter:card" content={metaTwitterCardType} />
      </Helmet>
    );
  }
}

export default HeadTags;

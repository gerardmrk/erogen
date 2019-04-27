import { jsonRenderer } from "..";
import { routeConfs, RouteConf } from "@client/views/conf.routes";

// -------------------------------------------------------------------------------------------------
// Prerender
// -------------------------------------------------------------------------------------------------
export const prerenderRoutes = () => {
  const prerenderables: RouteConf[] = [];
  extractPrerenderableRoutes(prerenderables, routeConfs);

  const renderJSON = jsonRenderer();

  return async () => {
    return await Promise.all(
      prerenderables.map(r => {
        return renderJSON({ lang: "en", url: r.path });
      }),
    );
  };
};

function extractPrerenderableRoutes(
  whitelist: RouteConf[],
  routes: RouteConf[],
) {
  routes.forEach(r => {
    if (r.prerender) whitelist.push(r);
    if (r.routes && r.routes.length > 0) {
      return extractPrerenderableRoutes(whitelist, routes);
    }
  });
}

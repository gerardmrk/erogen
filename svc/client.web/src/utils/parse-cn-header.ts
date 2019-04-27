/**
 * Generic parser for content-negotiation (accept-*) headers.
 * E.G. 'en-US,en;q=0.5' = ['en-US', 'en']
 * @param header the HTTP header value
 */
export function parseCNHeader(header): ParsedCNHeaderValues {
  // this func heavily mutates for performance reasons;
  // rather than creating a temporary array to store intermediate values, just
  // reassign to the existing one.

  let tokens = header.replace(/\s/g, "").split(",");
  for (let i = 0, l = tokens.length; i < l; i++) {
    // @ts-ignore
    // split by value and q-factor
    tokens[i] = tokens[i].split(";q=");
    // @ts-ignore
    // 2nd value is the weighting (0-1), 1 if empty
    tokens[i][1] = +tokens[i][1] || 1;
  }
  // @ts-ignore
  // sort the tokens by weighting
  tokens.sort((a, b) => b[1] - a[1]);
  return {
    sorted: tokens.map(t => t[0]),
    qfactors: new Map(tokens),
  };
}

type ParsedCNHeaderValues = {
  sorted: string[];
  qfactors: Map<string, number>;
};

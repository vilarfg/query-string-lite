// Copyright (c) 2020 Fernando G. Vilar
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type Query = Record<string, boolean | Array<string>>;

/**
 * Decodes a query string into a `Query`.
 * @param querystring the query string to be decoded.
 */
export function decode(querystring: string): Query {
  const query: Query = {};

  if (querystring) {
    const parts = querystring.substring(1).split("&");

    for (let i = parts.length; i--; ) {
      const part = parts[i];

      if (part) {
        const indexOfEqualSign = part.indexOf("=");

        if (indexOfEqualSign < 0) {
          query[decodeURIComponent(part)] = true;
        } else {
          const key = decodeURIComponent(part.substring(0, indexOfEqualSign));
          const value = decodeURIComponent(
            part.substring(indexOfEqualSign + 1),
          );
          const values = query[key] as Array<string>;
          if (values) {
            values.unshift(value);
          } else {
            query[key] = [value];
          }
        }
      }
    }
  }
  return query;
}

/**
 * Encodes a `Query` into a query string.
 * @param query the query to be encoded.
 */
export function encode(query: Query): string {
  const parts = [];

  for (const k in query) {
    const values = query[k];
    if (values) {
      if (values === true) parts.push(k);
      else if (values.length) {
        let qsValue = "";
        for (let i = 0; i < values.length; i++)
          qsValue += (i ? "&" : "") + k + "=" + values[i].replace(/\&/g, "%26");
        parts.push(qsValue);
      }
    }
  }

  return parts.length ? `?${parts.sort().join("&")}` : "";
}

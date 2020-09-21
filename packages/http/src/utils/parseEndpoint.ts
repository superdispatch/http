import { parseURITemplate, URITemplateParams } from './parseURITemplate';

const DEFAULT_METHOD = 'GET';
const METHOD_PATTERN = /^([\w]+) (.+)/;

function parseEndpointTemplate<T extends URITemplateParams>(
  url: string,
  params?: T,
): [method: string, url: string] {
  let method = DEFAULT_METHOD;
  const matches = METHOD_PATTERN.exec(url);

  if (matches) {
    url = matches[2];
    method = matches[1].toUpperCase();
  }

  if (params != null) {
    url = parseURITemplate(url, params);
  }

  return [method.toUpperCase(), url];
}

export interface Endpoint {
  url: string;
  method: string;
  body: undefined | BodyInit;
  headers: Record<string, string>;
}

export interface ParseEndpointOptions {
  json?: unknown;
  body?: BodyInit;
  baseURL?: string;
  headers?: Record<string, string>;
}

export function parseEndpoint<T extends URITemplateParams>(
  template: string,
  options?: T & ParseEndpointOptions,
): Endpoint {
  const endpoint: Endpoint = {
    headers: {},
    url: template,
    body: undefined,
    method: DEFAULT_METHOD,
  };

  if (options == null) {
    [endpoint.method, endpoint.url] = parseEndpointTemplate(template);
  } else {
    const { json, body, baseURL, headers, ...params } = options;

    [endpoint.method, endpoint.url] = parseEndpointTemplate(template, params);

    if (baseURL) {
      endpoint.url = baseURL + endpoint.url;
    }

    if (body != null) {
      endpoint.body = body;
    }

    if (headers != null) {
      endpoint.headers = { ...headers };
    }

    if (json != null) {
      endpoint.body = JSON.stringify(json);
      endpoint.headers['content-type'] = 'application/json';
    }
  }

  return endpoint;
}

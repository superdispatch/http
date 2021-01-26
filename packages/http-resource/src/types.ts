import { HTTPEndpointParams } from '@superdispatch/http';
import { URITemplateParams } from '@superdispatch/uri';

export type HTTPResourceKeyOption = bigint | boolean | null | number | string;

export type HTTPResourceFetcherOptions<
  TParams extends URITemplateParams = URITemplateParams
> = HTTPEndpointParams<{ key?: HTTPResourceKeyOption } & TParams>;

export type HTTPResourceFetcher<
  TData,
  TParams extends URITemplateParams = URITemplateParams
> = (
  template: string,
  options?: HTTPResourceFetcherOptions<TParams>,
) => Promise<TData>;

export type HTTPResourceFetcherArgs<
  TParams extends URITemplateParams = URITemplateParams
> = readonly [template: string, options?: HTTPResourceFetcherOptions<TParams>];

export type HTTPResourceInput<
  TParams extends URITemplateParams = URITemplateParams
> = string | HTTPResourceFetcherArgs<TParams>;

export type HTTPResourceKey = [
  method: string,
  url: string,
  body?: string,
  key?: HTTPResourceKeyOption,
];

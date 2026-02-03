/// <reference types="@typescript-to-lua/language-extensions" />

/** @noSelf @customName string */
declare namespace LuaString {
  /** @customName gsub */
  function replaceAll(
    source: string,
    pattern: string,
    replacement: string
  ): LuaMultiReturn<[string, number]>;
}

/** @noResolution */
declare module "kong.plugins.jwt.jwt_parser" {
  type DecodedJwt = {
    claims: LuaTable<string, string>;
  };
  /** @customName new */
  function parse(input: string): LuaMultiReturn<[DecodedJwt, any]>;
}

/** @noResolution */
declare module "kong.common.utils" {
  /** @customName split_string */
  function split(
    this: void,
    separator: string,
    source: string
  ): LuaMultiReturn<[string[], any]>;
}

/** @noResolution */
declare module "cjson.safe" {
  /** @customName decode */
  function parse(this: void, input: string): LuaMultiReturn<[AnyTable, any]>;
}

/** @noResolution */
declare module "resty.http" {
  type RestyHttpResponse = { status: number; body: string; headers: AnyTable };
  type RestyHttpOptions = {
    method?: string;
    body?: string;
    headers?: AnyTable;
    ssl_verify?: boolean;
  };
  interface RestyHttpClient {
    /** @customName request_uri */
    fetch(
      url: string,
      body: RestyHttpOptions
    ): LuaMultiReturn<[RestyHttpResponse, AnyTable]>;
  }
  /** @noSelf */
  namespace http {
    /** @customName new */
    function client(): RestyHttpClient;
  }
  export = http;
}

/** @noSelf */
declare namespace kong {
  namespace ctx {
    var shared: LuaTable<string, string>;
    var plugin: LuaTable<string, string>;
  }
  /** @noSelf */
  namespace request {
    /** @customName get_header */
    function getHeader(header: string): string;
    /** @customName get_path */
    function getPath(): string;
    /** @customName get_query */
    function getQuery(): LuaTable<string, string>;
    /** @customName get_body */
    function getBody(): LuaMultiReturn<[LuaTable<string>, any, string]>;
  }
  /** @noSelf */
  namespace response {
    /** @noSelf */
    function exit(
      status: number,
      body: AnyTable,
      headers?: LuaTable<string>
    ): void;
  }
  /** @noSelf */
  namespace log {
    function crit(message: string): void;
    function debug(message: string): void;
    function err(message: string): void;
    function info(message: string): void;
    function notice(message: string): void;
    function warn(message: string): void;
  }
  /** @noSelf */
  namespace service {
    /** @customName set_target */
    function setTarget(host: string, port: number): void;
    /** @noSelf */
    namespace request {
      /** @customName clear_header */
      function clearHeader(header: string): void;
      /** @customName set_body */
      function setBody(body: LuaTable<string>): LuaMultiReturn<[boolean, any]>;
      /** @customName set_header */
      function setHeader(name: string, value: string): void;
      /** @customName set_path */
      function setPath(path: string): void;
      /** @customName set_query */
      function setQuery(this: void, query: LuaTable<string, string>): void;
    }
  }
}

declare const process: any;

declare module "express" {
  export interface Request {
    [key: string]: any;
  }
  export interface Response {
    [key: string]: any;
  }
  export type NextFunction = (...args: any[]) => any;
  export function Router(): any;
  const express: any;
  export default express;
}

declare module "fs" {
  const fs: any;
  export = fs;
}

declare module "path" {
  const path: any;
  export = path;
}

declare module "mysql2/promise" {
  const mysql: any;
  export default mysql;
}

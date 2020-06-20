declare namespace Express {
  export interface Request {
    user: any;
  }
}

declare module '*.vue' {
  // @ts-ignore
  import Vue from 'vue'
  export default Vue
}



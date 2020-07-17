declare namespace Express {
  export interface Request {
    user: any;
    nsSessionId: string;
    nsRequestId: string;
  }
}

declare module '*.vue' {
  // @ts-ignore
  import Vue from 'vue'
  export default Vue
}

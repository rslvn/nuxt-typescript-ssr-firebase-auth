// tslint:disable-next-line:no-namespace
declare namespace Express {
  export interface Request {
    user: any;
    nsSessionId: string;
    nsRequestId: string;
  }
}



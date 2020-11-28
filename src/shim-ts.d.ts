declare namespace Express {
  export interface Request {
    user: any;
    nsSessionId: string;
    nsRequestId: string;
  }
}

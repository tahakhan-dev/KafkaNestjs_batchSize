import { StatusCodes } from "./status-codes";

export class ResponseWrapper<T> {
    constructor() {}
    StatusCode: StatusCodes;
    Result: T;
    ErrorInternal: string;
    Message: string;
}
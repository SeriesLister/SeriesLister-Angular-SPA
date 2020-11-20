import { BasicResponse } from '../basic-response';

export interface TokensResponse extends BasicResponse {

    token: string;
    refreshToken: string;

}
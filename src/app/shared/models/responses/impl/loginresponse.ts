import { BasicResponse } from "../basicresponse";

export interface LoginResponse extends BasicResponse {

    token: string;
    refreshToken: string;

    email: string;
    username: string;

    

}
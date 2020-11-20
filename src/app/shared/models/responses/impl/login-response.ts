import { BasicResponse } from "../basic-response";

export interface LoginResponse extends BasicResponse {
    token: string;
    refreshToken: string;

    email: string;
    username: string;
}
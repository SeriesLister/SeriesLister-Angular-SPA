import { BasicResponse } from "../basic-response";

export interface RegistrationResponse extends BasicResponse {

    displayNameError: string;
    passwordError: string;

}
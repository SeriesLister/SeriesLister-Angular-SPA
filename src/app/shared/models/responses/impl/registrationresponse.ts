import { BasicResponse } from "../basicresponse";

export interface RegistrationResponse extends BasicResponse {

    displayNameError: string;
    passwordError: string;

}
import { ServerConfigurations } from './serverconfigurations';

export class EndPointsConfigurations {

    //Controller prefixes
    private static readonly AUTHURL: string = ServerConfigurations.PUBLICLINK + 'auth';

    //Auth Endpoints
    public static readonly REGISTERURL: string = EndPointsConfigurations.AUTHURL + '/Register';
    public static readonly CHECKUSERNAME: string = EndPointsConfigurations.AUTHURL + '/CheckUsername?name=';
    public static readonly CHECKEMAIL: string = EndPointsConfigurations.AUTHURL + '/CheckEmail?email=';
    public static readonly LOGINURL: string = EndPointsConfigurations.AUTHURL + '/Login';
    public static readonly REFRESHTOKENURL: string = EndPointsConfigurations.AUTHURL + '/Refresh';

}
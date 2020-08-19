import { ServerConfigurations } from './serverconfigurations';

export class EndPointsConfigurations {

    //Controller prefixes
    private static readonly AUTHURL: string = ServerConfigurations.PUBLICLINK + 'auth';
    private static readonly ADMINANIMEURL: string = ServerConfigurations.PUBLICLINK + 'adminanime';

    //Auth Endpoints
    public static readonly REGISTERURL: string = EndPointsConfigurations.AUTHURL + '/Register';
    public static readonly CHECKUSERNAME: string = EndPointsConfigurations.AUTHURL + '/CheckUsername?name=';
    public static readonly CHECKEMAIL: string = EndPointsConfigurations.AUTHURL + '/CheckEmail?email=';
    public static readonly LOGINURL: string = EndPointsConfigurations.AUTHURL + '/Login';
    public static readonly REFRESHTOKENURL: string = EndPointsConfigurations.AUTHURL + '/Refresh';

    //ADMIN ENDPOINTS
    public static readonly ANIMELISTEDURL: string = EndPointsConfigurations.ADMINANIMEURL + '/';
    public static readonly ANIMEDETAILSURL: string = EndPointsConfigurations.ADMINANIMEURL + '/details';
    public static readonly ANIMEDELETEURL: string = EndPointsConfigurations.ADMINANIMEURL + '/delete';
}
import { ServerConfigurations } from './serverconfigurations';

export class EndPointsConfigurations {

    //Controller prefixes
    private static readonly AUTHURL: string = ServerConfigurations.PUBLICLINK + 'auth';

    //Auth Endpoints
    public static readonly REGISTERURL: string = EndPointsConfigurations.AUTHURL + '/register';

}
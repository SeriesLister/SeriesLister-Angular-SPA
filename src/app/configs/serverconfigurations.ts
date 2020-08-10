export class ServerConfigurations {

    public static readonly PRODUCTION: boolean = false;

    public static readonly PREFIX: string = 'api/';

    public static readonly PUBLICLINK: string = ServerConfigurations.PRODUCTION ? 
        'https://animelistings.com/' + ServerConfigurations.PREFIX : 
        'https://localhost:5001/' + ServerConfigurations.PREFIX;
        
}
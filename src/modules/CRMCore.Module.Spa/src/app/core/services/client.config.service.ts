import { Injectable,Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OidcSecurityService,OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { ConfigService } from './config.service';

@Injectable()
export class ClientConfigService {       
    private oidcSecurityService: OidcSecurityService;  
    constructor(private injector: Injector,private http: HttpClient,private configService: ConfigService) { }    
    public loadClientConfig() {                 
         if (this.oidcSecurityService === undefined) {
            this.oidcSecurityService = this.injector.get(OidcSecurityService);
        }     
        this.configClient().subscribe((config: any) => {        
        let openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();   
        openIDImplicitFlowConfiguration = config;    
        this.configService.api_url = config.apiServer;
        this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);     
        });    
}  
    configClient() {
        console.log('window.location', window.location);
        console.log('window.location.href', window.location.href);
        console.log('window.location.origin', window.location.origin);
        console.log(`${window.location.origin}/api/ClientAppSettings`);
        return this.http.get(`${window.location.origin}/api/ClientAppSettings`);
     }
}

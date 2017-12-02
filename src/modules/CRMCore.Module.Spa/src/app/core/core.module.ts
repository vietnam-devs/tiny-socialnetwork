import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration
} from 'angular-auth-oidc-client';

import { ConfigService } from './services/config.service';

@NgModule({
  imports: [CommonModule]
})

export class CoreModule {
  clientConfiguration: any;

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private http: HttpClient,
    configService: ConfigService
  ) {
    this.configClient().subscribe((config: any) => {
      this.clientConfiguration = config;

      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();

      openIDImplicitFlowConfiguration.stsServer = this.clientConfiguration.stsServer;
      openIDImplicitFlowConfiguration.redirect_url = this.clientConfiguration.redirect_url;
      openIDImplicitFlowConfiguration.client_id = this.clientConfiguration.client_id;
      openIDImplicitFlowConfiguration.response_type = this.clientConfiguration.response_type;
      openIDImplicitFlowConfiguration.scope = this.clientConfiguration.scope;
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = this.clientConfiguration.post_logout_redirect_uri;
      openIDImplicitFlowConfiguration.start_checksession = this.clientConfiguration.start_checksession;
      openIDImplicitFlowConfiguration.silent_renew = this.clientConfiguration.silent_renew;
      openIDImplicitFlowConfiguration.post_login_route = this.clientConfiguration.startup_route;
      // HTTP 403
      openIDImplicitFlowConfiguration.forbidden_route = this.clientConfiguration.forbidden_route;
      // HTTP 401
      openIDImplicitFlowConfiguration.unauthorized_route = this.clientConfiguration.unauthorized_route;
      openIDImplicitFlowConfiguration.log_console_warning_active = this.clientConfiguration.log_console_warning_active;
      openIDImplicitFlowConfiguration.log_console_debug_active = this.clientConfiguration.log_console_debug_active;
      // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
      // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = this.clientConfiguration.max_id_token_iat_offset_allowed_in_seconds;

      configService.api_url = this.clientConfiguration.apiServer;

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

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ConfigService]
    };
  }
}

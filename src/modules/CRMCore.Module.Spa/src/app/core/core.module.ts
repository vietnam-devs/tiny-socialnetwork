import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AuthInterceptor } from '../core/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientConfigService } from '../core/services/client.config.service';
import { ConfigService } from './services/config.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { reducers, metaReducers } from '../reducers';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';


import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

function init(config: ClientConfigService) {  
  return () => config.loadClientConfig();
}
@NgModule({
    declarations: [
      ...APP_COMPONENTS,
      ...APP_DIRECTIVES
    ]  ,
    imports: [
      CommonModule,
      RouterModule,
      StoreModule.forRoot(reducers, { metaReducers }),    
      EffectsModule.forRoot([]),  
      HttpClientModule,
      !environment.production? StoreDevtoolsModule.instrument({
        maxAge: 25 //  Retains last 25 states
      })
    : [],
    ],
   providers: [   
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },        
    ConfigService,  
    ClientConfigService, { provide: APP_INITIALIZER, useFactory: init, deps: [ClientConfigService], multi: true }
    ],
    exports:[
      AppHeaderComponent,
      AppSidebarComponent,
      AppBreadcrumbsComponent,
      AppFooterComponent,
      AppFooterComponent,
      AppAsideComponent
    ]

})
export class CoreModule {}

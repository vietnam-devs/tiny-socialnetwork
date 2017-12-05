import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule} from 'angular-auth-oidc-client';
import { AppRoutingModule } from './app.routing';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { UnauthorizedComponent, AutoLoginComponent } from './containers';

const components = [AppComponent,UnauthorizedComponent, AutoLoginComponent];

@NgModule({
  declarations: [
    AppComponent,
    components
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,        
    CoreModule,    
    AuthModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

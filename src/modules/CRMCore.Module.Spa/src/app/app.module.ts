import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { UnauthorizedComponent, AutoLoginComponent } from './containers';

const components = [AppComponent, UnauthorizedComponent, AutoLoginComponent];

@NgModule({
  declarations: [AppComponent, components],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    CoreModule,
    AuthModule.forRoot(),
  
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

import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Http} from "@angular/http";
import {Injector, NgModule} from "@angular/core";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate/ng2-translate";

import {AppComponent} from "./app.component";

import {CoreModule} from "./core/core.module";
import {LayoutModule} from "./layout/layout.module";
import {SharedModule} from "./shared/shared.module";
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {LoginModule} from "./login/login.module";
import {MenuService} from "./core/menu/menu.service";
import {ServiceLocator} from "./core/service-locator";
import {menu} from "./menu";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {environment} from "../environments/environment";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AuthGuardService} from "./api/guards/auth-guard.service";

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true}),
    SlimLoadingBarModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    LoginModule
  ],
  providers: [
    AuthGuardService,
    SlimLoadingBarModule,
    { provide: 'API_URL', useValue: environment.API },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private menuService: MenuService, private injector: Injector) {
    menuService.addMenu(menu);
    ServiceLocator.injector = this.injector;
  }
}
